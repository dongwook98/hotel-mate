import { doc, collection, writeBatch } from 'firebase/firestore';

import { store } from '@remote/firebase';

import Button from '@shared/Button';

import { HOTEL_NAMES, IMAGES, HOTEL, EVENTS, ROOMS } from '@/mock/data';
import { COLLECTIONS } from '@/constants';

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function HotelListAddButton() {
  const batch = writeBatch(store);

  // mock 데이터 추가
  const handleButtonClick = () => {
    const hotels = HOTEL_NAMES.map((hotelName, index) => {
      return {
        name: hotelName,
        mainImageUrl: IMAGES[Math.floor(Math.random() * IMAGES.length)],
        images: IMAGES,
        price: random(130000, 200000),
        starRating: random(1, 5),
        ...HOTEL,
        ...(EVENTS[index] != null && { events: EVENTS[index] }),
      };
    });

    hotels.forEach((hotel) => {
      const hotelDocRef = doc(collection(store, COLLECTIONS.HOTEL));

      // HOTEL 콜렉션에 데이터 등록
      batch.set(hotelDocRef, hotel);

      ROOMS.forEach((room) => {
        // HOTEL 컬렉션안에 ROOM 컬렉션 계층 구조 생성
        const subDocRef = doc(collection(hotelDocRef, COLLECTIONS.ROOM));
        batch.set(subDocRef, room);
      });
    });
    batch.commit();
  };

  return <Button onClick={handleButtonClick}>호텔 리스트 추가</Button>;
}
