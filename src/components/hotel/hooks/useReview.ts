import { useQuery } from '@tanstack/react-query';

import { getReviews } from '@/remote/review';

function useReview({ hotelId }: { hotelId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['reviews', hotelId],
    queryFn: () => getReviews({ hotelId }),
  });

  return { data, isLoading };
}

export default useReview;
