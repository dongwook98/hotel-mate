import { useQuery, useQueryClient } from '@tanstack/react-query';
import { onSnapshot, collection, doc } from 'firebase/firestore';
import { getRooms } from '@/remote/room';
import { useEffect } from 'react';
import { store } from '@/remote/firebase';
import { COLLECTIONS } from '@/constants';
import { Room } from '@/models/room';

function useRooms({ hotelId }: { hotelId: string }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    // 객실정보를 onSnapshot으로 실시간 데이터 처리
    const unsubscribe = onSnapshot(
      collection(doc(store, COLLECTIONS.HOTEL, hotelId), COLLECTIONS.ROOM),
      (snapshot) => {
        const newRooms = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Room),
        }));

        queryClient.setQueryData(['rooms', hotelId], newRooms);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [hotelId, queryClient]);

  return useQuery({
    queryKey: ['rooms', hotelId],
    queryFn: () => getRooms(hotelId),
  });
}

export default useRooms;
