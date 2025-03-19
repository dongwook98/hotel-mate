import { css } from '@emotion/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import useShare from '@/hooks/useShare';
import Flex from '../shared/Flex';
import Spacing from '../shared/Spacing';
import Text from '../shared/Text';
import { Hotel } from '@/models/hotel';
import { useAlertContext } from '@/context/AlertContext';
import useLike from '@/hooks/like/useLike';

export default function ActionButtons({ hotel }: { hotel: Hotel }) {
  const share = useShare();
  const { open } = useAlertContext();
  const { data: likes, mutate: likeMutate } = useLike();

  const { name, comment, mainImageUrl } = hotel;

  const isLike = Boolean(likes?.find((like) => like.hotelId === hotel.id));

  return (
    <Flex css={containerStyles}>
      <Button
        label='찜하기'
        iconUrl={
          isLike
            ? 'https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-64.png'
            : 'https://cdn4.iconfinder.com/data/icons/basic-ui-2-line/32/heart-love-like-likes-loved-favorite-512.png'
        }
        onClick={() => {
          likeMutate({
            hotel: {
              id: hotel.id,
              mainImageUrl: hotel.mainImageUrl,
              name: hotel.name,
            },
          });
        }}
      />
      <Button
        label='공유하기'
        iconUrl='https://cdn1.iconfinder.com/data/icons/rounded-social-media/512/kakao-512.png'
        onClick={() => {
          share({
            title: name,
            description: comment,
            imageUrl: mainImageUrl,
            buttonLabel: 'Hotel Mate에서 보기',
          });
        }}
      />
      <CopyToClipboard
        text={window.location.href}
        onCopy={() => {
          open({
            title: '링크 복사 완료!',
            onButtonClick: () => {},
          });
        }}
      >
        <Button
          label='링크 복사'
          iconUrl='https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-36-64.png'
        />
      </CopyToClipboard>
    </Flex>
  );
}

function Button({
  label,
  iconUrl,
  onClick,
}: {
  label: string;
  iconUrl: string;
  onClick?: () => void;
}) {
  return (
    <Flex direction='column' align='center' onClick={onClick}>
      <img src={iconUrl} alt='' width={30} height={30} />
      <Spacing size={6} />
      <Text typography='t7'>{label}</Text>
    </Flex>
  );
}

const containerStyles = css`
  padding: 24px;
  cursor: pointer;

  & * {
    flex: 1;
  }
`;
