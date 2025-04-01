import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Flex from '@/components/shared/Flex';
import Text from '@/components/shared/Text';
import Spacing from '@/components/shared/Spacing';
import Button from '@/components/shared/Button';

export default function ReservationDonePage() {
  const { hotelName } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    hotelName: string;
  };
  const navigate = useNavigate();

  return (
    <div>
      <Flex direction='column' align='center'>
        <Spacing size={80} />
        <img
          src='https://cdn1.iconfinder.com/data/icons/travel-line-good-life/512/plane-64.png'
          alt='비행기 아이콘'
          width={120}
          height={120}
        />
        <Spacing size={30} />
        <Text typography='t4' bold>
          {hotelName}
        </Text>
        <Spacing size={8} />
        <Text>예약이 완료되었습니다.</Text>
      </Flex>
      <Spacing size={40} />
      <div style={{ padding: 24 }}>
        <Button.Group>
          <Button onClick={() => navigate('/')}>홈으로</Button>
          <Button onClick={() => navigate('/reservation/list')}>
            예약 리스트로
          </Button>
        </Button.Group>
      </div>
    </div>
  );
}
