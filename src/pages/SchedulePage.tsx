import FixedBottomButton from '@/components/shared/FixedBottomButton';
import RangePicker from '@/components/shared/RangePicker';
import qs from 'qs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SchedulePage() {
  const { roomId = '', hotelId = '' } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    roomId: string;
    hotelId: string;
  };
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<{
    startDate?: string;
    endDate?: string;
    nights: number;
  }>({
    startDate: undefined,
    endDate: undefined,
    nights: 0,
  });

  // 쿼리파라미터 손실 대응
  useEffect(() => {
    if (hotelId === '' || roomId === '') {
      window.history.back();
    }
  }, [roomId, hotelId]);

  const moveToReservationPage = () => {
    const params = qs.stringify(
      {
        hotelId,
        roomId,
        ...selectedDate,
      },
      { addQueryPrefix: true }
    );

    navigate(`/reservation/${params}`);
  };

  const 제출가능한가 =
    selectedDate.startDate != null && selectedDate.endDate != null;

  const buttonLabel = 제출가능한가
    ? `${selectedDate.startDate} ~ ${selectedDate.endDate} (${selectedDate.nights}박)`
    : '에약 날짜를 선택해주세요';

  return (
    <div>
      <RangePicker
        startDate={selectedDate.startDate}
        endDate={selectedDate.endDate}
        onChange={(dateRange) => {
          console.log('사용처', dateRange);
          setSelectedDate({
            startDate: dateRange.from,
            endDate: dateRange.to,
            nights: dateRange.nights,
          });
        }}
      />
      <FixedBottomButton
        label={buttonLabel}
        disabled={제출가능한가 === false}
        onClick={moveToReservationPage}
      />
    </div>
  );
}
