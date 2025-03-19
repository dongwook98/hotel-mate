import { css } from '@emotion/react';

import { Hotel } from '@models/hotel';
import ListRow from '@shared/ListRow';
import Flex from '@shared/Flex';
import Spacing from '@shared/Spacing';
import Text from '@shared/Text';
import addDelimiter from '@utils/addDelimiter';
import Tag from '../shared/Tag';
import { MouseEvent, useEffect, useState } from 'react';
import { differenceInMilliseconds, parseISO } from 'date-fns';
import formatTime from '@/utils/formatTime';
import { Link } from 'react-router-dom';

export default function HotelItem({
  hotel,
  isLike,
  onLike,
}: {
  hotel: Hotel;
  isLike: boolean;
  onLike: ({
    hotel,
  }: {
    hotel: Pick<Hotel, 'name' | 'id' | 'mainImageUrl'>;
  }) => void;
}) {
  const [remainedTime, setRemainedTime] = useState(0);

  useEffect(() => {
    if (hotel.events == null || hotel.events.promoEndTime == null) {
      return;
    }

    const promoEndTime = hotel.events.promoEndTime;

    const timer = setInterval(() => {
      const 남은초 = differenceInMilliseconds(
        parseISO(promoEndTime),
        new Date()
      );

      if (남은초 < 0) {
        clearInterval(timer);
        return;
      }

      setRemainedTime(남은초);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [hotel.events]);

  const tagComponent = () => {
    if (hotel.events == null) {
      return null;
    }

    const { name, tagThemeStyle } = hotel.events;

    const promotionText =
      remainedTime > 0 ? ` - ${formatTime(remainedTime)} 남음` : '';

    return (
      <div>
        <Tag
          color={tagThemeStyle.fontColor}
          backgroundColor={tagThemeStyle.backgroundColor}
        >
          {name.concat(promotionText)}
        </Tag>
        <Spacing size={8} />
      </div>
    );
  };

  const handleLike = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    onLike({
      hotel: {
        id: hotel.id,
        mainImageUrl: hotel.mainImageUrl,
        name: hotel.name,
      },
    });
  };

  return (
    <Link to={`/hotel/${hotel.id}`}>
      <ListRow
        as='li'
        contents={
          <Flex direction='column'>
            {tagComponent()}
            <ListRow.Texts title={hotel.name} subTitle={hotel.comment} />
            <Spacing size={4} />
            <Text typography='t7' color='gray600'>
              {hotel.starRating}성급
            </Text>
          </Flex>
        }
        right={
          <Flex
            direction='column'
            align='flex-end'
            style={{ position: 'relative' }}
          >
            <img
              src={
                isLike
                  ? 'https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-64.png'
                  : 'https://cdn4.iconfinder.com/data/icons/basic-ui-2-line/32/heart-love-like-likes-loved-favorite-512.png'
              }
              alt='찜 아이콘'
              css={iconHeartStyles}
              onClick={handleLike}
            />
            <img src={hotel.mainImageUrl} alt='' css={imageStyles} />
            <Spacing size={8} />
            <Text bold={true}>{addDelimiter(hotel.price)}원</Text>
          </Flex>
        }
        style={containerStyles}
      />
    </Link>
  );
}

const containerStyles = css`
  align-items: flex-start;
`;

const imageStyles = css`
  width: 90px;
  height: 110px;
  border-radius: 8px;
  object-fit: cover;
  margin-left: 16px;
`;

const iconHeartStyles = css`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 30px;
  height: 30px;
`;
