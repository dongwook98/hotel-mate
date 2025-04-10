import {
  QueryDocumentSnapshot,
  collection,
  limit,
  query,
  getDocs,
  startAfter,
  DocumentData,
  getDoc,
  doc,
  where,
  documentId,
} from 'firebase/firestore';

import { COLLECTIONS } from '@/constants';
import { store } from './firebase';
import { Hotel } from '@/models/hotel';
import { Room } from '@/models/room';

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

  const lastVisible = hotelsSnapshot.docs[hotelsSnapshot.docs.length - 1];

  return {
    items,
    lastVisible,
  };
}

export async function getHotel(id: string) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.HOTEL, id));

  return {
    id,
    ...snapshot.data(),
  } as Hotel;
}

export async function getRecommendHotels(hotelIds: string[]) {
  const recommendQuery = query(
    collection(store, COLLECTIONS.HOTEL),
    where(documentId(), 'in', hotelIds)
  );

  const snapshot = await getDocs(recommendQuery);

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Hotel)
  );
}

export async function getHotelWithRoom({
  hotelId,
  roomId,
}: {
  hotelId: string;
  roomId: string;
}) {
  const hotelSnapshot = await getDoc(doc(store, COLLECTIONS.HOTEL, hotelId));
  const roomSnapshot = await getDoc(
    doc(hotelSnapshot.ref, COLLECTIONS.ROOM, roomId)
  );

  return {
    hotel: hotelSnapshot.data() as Hotel,
    room: roomSnapshot.data() as Room,
  };
}
