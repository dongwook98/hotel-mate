import { parse } from 'qs';
import { useEffect } from 'react';

import useReservation from '@/components/reservation/hooks/useReservation';
import Summary from '@/components/reservation/Summary';
import Spacing from '@/components/shared/Spacing';
import Form from '@/components/reservation/Form';
import addDelimiter from '@/utils/addDelimiter';
import useUser from '@/hooks/auth/useUser';
import { useAlertContext } from '@/context/AlertContext';

export default function ReservationPage() {
  const { open } = useAlertContext();
  const user = useUser();

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

  // 객실 매진 상황
  useEffect(() => {
    if (data?.room.avaliableCount === 0) {
      open({
        title: '객신이 매진되었습니다.',
        onButtonClick: () => {
          window.history.back();
        },
      });
    }
  }, [data?.room.avaliableCount, open]);

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
