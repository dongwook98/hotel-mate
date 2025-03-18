import { useQuery } from '@tanstack/react-query';

import { getHotel } from '@/remote/hotel';

function useHotel({ id }: { id: string }) {
  return useQuery({
    queryKey: ['hotel', id],
    queryFn: () => getHotel(id),
  });
}

export default useHotel;
