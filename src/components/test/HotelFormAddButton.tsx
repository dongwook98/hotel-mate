import { collection, writeBatch, getDocs } from 'firebase/firestore';

import Button from '../shared/Button';
import { COLLECTIONS } from '@/constants';
import { store } from '@/remote/firebase';
import { FORMS } from '@/mock/data';

export default function HotelFormAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store);

    const snapShot = await getDocs(collection(store, COLLECTIONS.HOTEL));

    snapShot.docs.forEach((hotel) => {
      batch.update(hotel.ref, {
        forms: FORMS,
      });
    });

    await batch.commit();

    alert('폼 데이터 추가 완료');
  };

  return <Button onClick={handleButtonClick}>폼 데이터추가</Button>;
}
