import { parse } from 'qs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useReservation from '@/components/reservation/hooks/useReservation';
import Summary from '@/components/reservation/Summary';
import Spacing from '@/components/shared/Spacing';
import Form from '@/components/reservation/Form';
import addDelimiter from '@/utils/addDelimiter';
import useUser from '@/hooks/auth/useUser';

export default function ReservationPage() {
  const user = useUser();
  const navigate = useNavigate();
  const { startDate, endDate, nights, roomId, hotelId } = parse(
    window.location.search,
    { ignoreQueryPrefix: true }
  ) as {
    startDate: string;
    endDate: string;
    nights: string;
    roomId: string;
    hotelId: string;
  };

  // 쿼리파라미터 유실 대응
  useEffect(() => {
    if (
      [user, startDate, endDate, nights, roomId, hotelId].some((param) => {
        return param == null;
      })
    ) {
      window.history.back();
    }
  }, [endDate, hotelId, nights, roomId, startDate, user]);

  const { data, isLoading, makeReservationMutate } = useReservation({
    hotelId,
    roomId,
  });

  if (data == null || isLoading === true) {
    return null;
  }

  const { hotel, room } = data;

  const handleSubmit = async (formValues: { [key: string]: string }) => {
    const newReservation = {
      userId: user?.uid as string,
      hotelId,
      roomId,
      startDate,
      endDate,
      price: room.price * Number(nights),
      formValues,
    };

    await makeReservationMutate(newReservation);

    navigate(`/reservation/done?hotelName=${hotel.name}`);
  };

  const buttonLabel = `${nights}박 ${addDelimiter(
    room.price * Number(nights)
  )}원 예약하기`;

  return (
    <div>
      <Summary
        hotelName={hotel.name}
        room={room}
        startDate={startDate}
        endDate={endDate}
        nights={nights}
      />

      <Spacing size={8} backgroundColor='gray100' />

      <Form
        onSubmit={handleSubmit}
        forms={hotel.forms}
        buttonLabel={buttonLabel}
      />
    </div>
  );
}
