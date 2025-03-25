import { useAlertContext } from '@/context/AlertContext';
import { Reservation } from '@/models/reservation';
import { getHotelWithRoom } from '@/remote/hotel';
import { makeReservation } from '@/remote/reservation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

function useReservation({
  hotelId,
  roomId,
}: {
  hotelId: string;
  roomId: string;
}) {
  const { open } = useAlertContext();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['hotelWithRoom', hotelId, roomId],
    queryFn: () => getHotelWithRoom({ hotelId, roomId }),
  });

  useEffect(() => {
    if (isSuccess) {
      if (data.room.avaliableCount === 0) {
        open({
          title: '객실이 매진되었습니다.',
          onButtonClick: () => {
            window.history.back();
          },
        });
      }
    }
  }, [data?.room.avaliableCount, isSuccess, open]);

  const { mutateAsync: makeReservationMutate } = useMutation({
    mutationFn: (newReservation: Reservation) => {
      return makeReservation(newReservation);
    },
    onError: () => {
      open({
        title: '알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
        onButtonClick: () => {
          window.history.back();
        },
      });
    },
  });

  return { data, isLoading, makeReservationMutate };
}

export default useReservation;
