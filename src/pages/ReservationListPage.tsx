import useReservations from '@/components/reservation-list/hooks/useReservations';
import Flex from '@/components/shared/Flex';
import ListRow from '@/components/shared/ListRow';
import Text from '@/components/shared/Text';
import addDelimiter from '@/utils/addDelimiter';

export default function ReservationListPage() {
  const { data, isLoading } = useReservations();

  if (data == null || isLoading === true) {
    return null;
  }

  return (
    <div>
      {data.map(({ hotel, reservation, room }) => (
        <ListRow
          key={reservation.id}
          left={
            <img
              src={hotel.mainImageUrl}
              alt={`${hotel.name} 이미지`}
              width={80}
              height={80}
            />
          }
          contents={
            <ListRow.Texts
              title={hotel.name}
              subTitle={`예약 날짜 | ${reservation.startDate} ~ ${reservation.endDate}`}
            />
          }
          right={
            <Flex align='center' css={{ gap: '8px', minWidth: '300px' }}>
              <Flex direction='column'>
                <Text typography='t6' bold>
                  객실정보
                </Text>
                <img
                  src={room.imageUrl}
                  alt={`${room.roomName} 이미지`}
                  width={80}
                  height={80}
                />
              </Flex>
              <Flex direction='column' justify='space-between'>
                <Text typography='t6'>객실이름 | {room.roomName}</Text>

                <Text typography='t6'>가격 | {addDelimiter(room.price)}원</Text>

                <Text typography='t6'>침대 | {room.basicInfo.bed}</Text>

                <Text typography='t6'>
                  흡연여부 | {room.basicInfo.smoke ?? '흡연 가능'}
                </Text>
              </Flex>
            </Flex>
          }
        />
      ))}
    </div>
  );
}
