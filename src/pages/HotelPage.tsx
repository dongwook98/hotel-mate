import Carousel from '@/components/hotel/Carousel';
import useHotel from '@/components/hotel/hooks/useHotel';
import Top from '@/components/shared/Top';
import { useParams } from 'react-router-dom';

export default function HotelPage() {
  const { id } = useParams() as { id: string };

  const { isLoading, data } = useHotel({ id });
  console.log('🚀 ~ HotelPage ~ isLoading:', isLoading);
  console.log('🚀 ~ HotelPage ~ data:', data);

  if (data == null || isLoading) {
    return <div>Loading...</div>;
  }

  const { name, comment, images } = data;

  return (
    <div>
      <Top title={name} subTitle={comment} />
      <Carousel images={images} />
    </div>
  );
}
