import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { store } from './firebase';
import { COLLECTIONS } from '@/constants';
import { Review } from '@/models/review';
import { User } from '@/models/user';

export async function getReviews({ hotelId }: { hotelId: string }) {
  const hotelRef = doc(store, COLLECTIONS.HOTEL, hotelId);
  const reviewQuery = query(
    collection(hotelRef, COLLECTIONS.REVIEW),
    orderBy('createdAt', 'desc')
  );

  const reviewSnapshot = await getDocs(reviewQuery);

  const reviews = reviewSnapshot.docs.map((doc) => {
    const review = doc.data();

    return {
      id: doc.id,
      ...review,
      createdAt: review.createdAt.toDate() as Date,
    } as Review;
  });

  // 리뷰 데이터를 가져왔을때 같은 사용자 데이터를 가져오지않게 유저 데이터를 캐시하는 용도
  const userMap: {
    [key: string]: User;
  } = {};
  // 리뷰 데이터와 유저 데이터를 합치기 위한 변수
  const results: Array<Review & { user: User }> = [];

  for (const review of reviews) {
    const 캐시된유저 = userMap[review.userId];

    if (캐시된유저 == null) {
      // 유저 데이터 가져오기
      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTIONS.USER), review.userId)
      );
      const user = userSnapshot.data() as User;

      // 데이터 캐싱
      userMap[review.userId] = user;
      results.push({
        ...review,
        user,
      });
    } else {
      // 캐싱 데이터 사용
      results.push({
        ...review,
        user: 캐시된유저,
      });
    }
  }

  return results;
}
