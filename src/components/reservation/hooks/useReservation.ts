import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useAlertContext } from '@/context/AlertContext';
import { Reservation } from '@/models/reservation';
import { getHotelWithRoom } from '@/remote/hotel';
import { makeReservation } from '@/remote/reservation';

function useReservation({
  hotelId,
  roomId,
}: {
  hotelId: string;
  roomId: string;
}) {
  const navigate = useNavigate();
  const { open } = useAlertContext();
  const { data, isLoading } = useQuery({
    queryKey: ['hotelWithRoom', hotelId, roomId],
    queryFn: () => getHotelWithRoom({ hotelId, roomId }),
  });

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
    onSuccess: () => {
      navigate(`/reservation/done?hotelId=${hotelId}`);
    },
  });

  return { data, isLoading, makeReservationMutate };
}

export default useReservation;
