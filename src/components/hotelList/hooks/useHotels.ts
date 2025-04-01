import { useInfiniteQuery } from '@tanstack/react-query';

import { getHotels } from '@remote/hotel';
import { useCallback } from 'react';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Hotel } from '@/models/hotel';

function useHotels() {
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['hotels'],
    queryFn: ({
      pageParam,
    }: {
      pageParam: QueryDocumentSnapshot<Hotel | DocumentData> | undefined;
    }) => getHotels(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (snapShot) => {
      return snapShot.lastVisible;
    },
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }

    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const hotels = data?.pages.map(({ items }) => items).flat();

  return { loadMore, data: hotels, isFetching, hasNextPage };
}

export default useHotels;
