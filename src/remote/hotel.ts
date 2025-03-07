import {
  QueryDocumentSnapshot,
  collection,
  limit,
  query,
  getDocs,
  startAfter,
  DocumentData,
} from 'firebase/firestore';

import { COLLECTIONS } from '@/constants';
import { store } from './firebase';
import { Hotel } from '@/models/hotel';

/**
 *
 * @param pageParams 커서
 * @returns items: hotels 데이터, lastVisible: 커서
 */
export async function getHotels(
  pageParams?: QueryDocumentSnapshot<Hotel | DocumentData>
) {
  const hotelsQuery =
    pageParams == null
      ? query(collection(store, COLLECTIONS.HOTEL), limit(10))
      : query(
          collection(store, COLLECTIONS.HOTEL),
          startAfter(pageParams),
          limit(10)
        );

  const hotelsSnapshot = await getDocs(hotelsQuery);

  const items = hotelsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Hotel)
  );
  console.log('🚀 ~ items:', items);

  const lastVisible = hotelsSnapshot.docs[hotelsSnapshot.docs.length - 1];
  console.log('🚀 ~ lastVisible:', lastVisible);

  return {
    items,
    lastVisible,
  };
}
