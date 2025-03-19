import { Fragment } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useHotels } from '@/components/hotelList/hooks/useHotels';
import HotelItem from '@/components/hotelList/HotelItem';
import Spacing from '@shared/Spacing';
import Top from '@shared/Top';
import useLike from '@/hooks/like/useLike';

export default function HotelListPage() {
  // 커스텀훅을 활용해 컴포넌트에 렌더링에 집중하는 환경 조성
  const { data: hotels, hasNextPage, loadMore } = useHotels();
  const { data: likes, mutate: likeMutate } = useLike();

  return (
    <div>
      <Top title='인기 호텔' subTitle='호텔부터 펜션까지 최저가' />

      <InfiniteScroll
        dataLength={hotels?.length ?? 0}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold='100px'
      >
        <ul>
          {hotels?.map((hotel, index) => (
            <Fragment key={hotel.id}>
              <HotelItem
                hotel={hotel}
                isLike={Boolean(
                  likes?.find((like) => like.hotelId === hotel.id)
                )}
                onLike={likeMutate}
              />
              {/* 마지막 목록은 스페이싱 렌더링 X */}
              {hotels.length - 1 === index ? null : (
                <Spacing
                  size={8}
                  backgroundColor='gray100'
                  style={{ margin: '20px 0' }}
                />
              )}
            </Fragment>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}
