import { css } from '@emotion/react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.css';

export default function Carousel({ images }: { images: string[] }) {
  return (
    <Swiper css={containerStyles} spaceBetween={8}>
      {images.map((imageUrl, index) => (
        <SwiperSlide key={imageUrl}>
          <img
            src={imageUrl}
            alt={`${index + 1}번째 호텔의 이미지`}
            css={imageStyles}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const imageStyles = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const containerStyles = css`
  padding: 0 24px;
  height: 300px;
`;
