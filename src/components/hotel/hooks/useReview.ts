import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  getReviews,
  removeReview,
  updateReview,
  writeReview,
} from '@/remote/review';
import useUser from '@/hooks/auth/useUser';
import { Review } from '@/models/review';

function useReview({ hotelId }: { hotelId: string }) {
  const user = useUser();
  const queryClient = useQueryClient();

  // 리뷰 조회
  const { data, isLoading } = useQuery({
    queryKey: ['reviews', hotelId],
    queryFn: () => getReviews({ hotelId }),
  });

  // 리뷰 작성
  const { mutateAsync: writeMutate } = useMutation({
    mutationFn: async (text: string) => {
      const newReview = {
        createdAt: new Date(),
        hotelId,
        userId: user?.uid as string,
        text,
      };

      await writeReview(newReview);

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reviews', hotelId],
      });
    },
  });

  // 리뷰 삭제
  const { mutate: removeMutate } = useMutation({
    mutationFn: ({
      reviewId,
      hotelId,
    }: {
      reviewId: string;
      hotelId: string;
    }) => {
      return removeReview({ reviewId, hotelId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reviews', hotelId],
      });
    },
  });

  // 리뷰 수정
  const { mutate: updateMutate } = useMutation({
    mutationFn: ({
      review,
      updateText,
    }: {
      review: Review;
      updateText: string;
    }) => {
      const updatedReview = {
        ...review,
        updatedAt: new Date(),
        text: updateText,
      };

      return updateReview(updatedReview);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reviews', hotelId],
      });
    },
  });

  return { data, isLoading, writeMutate, removeMutate, updateMutate };
}

export default useReview;
