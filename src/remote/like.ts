import {
  collection,
  orderBy,
  query,
  where,
  getDocs,
  limit,
  setDoc,
  doc,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore';
import { store } from './firebase';
import { COLLECTIONS } from '@/constants';
import { Like } from '@/models/like';
import { Hotel } from '@/models/hotel';

export async function getLikes({ userId }: { userId: string }) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      where('userId', '==', userId),
      orderBy('order', 'asc')
    )
  );

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Like)
  );
}

export async function toggleLike({
  hotel,
  userId,
}: {
  hotel: Pick<Hotel, 'name' | 'mainImageUrl' | 'id'>;
  userId: string;
}) {
  const findSnapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      where('userId', '==', userId),
      where('hotelId', '==', hotel.id)
    )
  );

  if (findSnapshot.docs.length > 0) {
    // 찜 취소 로직
    const removeTarget = findSnapshot.docs[0];
    const removeTargetOrder = removeTarget.data().order;

    // 찜 취소할 대상보다 오더가 큰 문서들이 있는지 확인
    const updateTargetSnapshot = await getDocs(
      query(
        collection(store, COLLECTIONS.LIKE),
        where('userId', '==', userId),
        where('order', '>', removeTargetOrder)
      )
    );

    if (updateTargetSnapshot.empty) {
      // 찜 취소한 대상보다 오더가 큰 문서가 없다면 바로 찜 취소 대상을 삭제
      return deleteDoc(removeTarget.ref);
    } else {
      // 찜 취소한 대상보다 오더가 큰 문서가 있다면 큰 문서들의 오더를 변경하고 찜 취소 대상 삭제
      const batch = writeBatch(store);

      updateTargetSnapshot.forEach((doc) => {
        batch.update(doc.ref, { order: doc.data().order - 1 });
      });

      await batch.commit();

      return deleteDoc(removeTarget.ref);
    }
  } else {
    // 찜하기 로직

    // 마지막 찜 문서
    const lastLikeSnapshot = await getDocs(
      query(
        collection(store, COLLECTIONS.LIKE),
        where('userId', '==', userId),
        orderBy('order', 'desc'),
        limit(1)
      )
    );

    // 마지막 찜 타겟이 있다면 그 타겟의 오더를 사용, 없다면 오더를 0으로 초기화
    const lastOrder = lastLikeSnapshot.empty
      ? 0
      : lastLikeSnapshot.docs[0].data().order;

    // 찜 생성 데이터
    const newLike = {
      order: lastOrder + 1,
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelMainImageUrl: hotel.mainImageUrl,
      userId,
    };

    return setDoc(doc(collection(store, COLLECTIONS.LIKE)), newLike);
  }
}
