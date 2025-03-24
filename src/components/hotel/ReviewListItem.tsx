import { useState } from 'react';
import { format } from 'date-fns';

import { Review } from '@/models/review';
import { User } from '@/models/user';
import ListRow from '../shared/ListRow';
import TextField from '../shared/TextField';
import Button from '../shared/Button';
import Spacing from '../shared/Spacing';
import useReview from './hooks/useReview';
import useUser from '@/hooks/auth/useUser';

export default function ReviewListItem({
  review,
}: {
  review: Review & {
    user: User;
  };
}) {
  const user = useUser();
  const { updateMutate, removeMutate } = useReview({ hotelId: review.hotelId });
  const [isEditReview, setIsEditReview] = useState(false);
  const [editReviewText, setEditReviewText] = useState(review.text);

  return (
    <ListRow
      key={review.id}
      left={
        review.user.photoURL != null ? (
          <img
            src={review.user.photoURL}
            alt={`${review.user.displayName}님의 프로필 이미지`}
            width={40}
            height={40}
            style={{ borderRadius: '100%' }}
          />
        ) : null
      }
      contents={
        isEditReview ? (
          <TextField
            value={editReviewText}
            onChange={(e) => setEditReviewText(e.target.value)}
          />
        ) : (
          <ListRow.Texts
            title={review.text}
            subTitle={format(review.createdAt, 'yyyy-MM-dd')}
          />
        )
      }
      right={
        review.userId === user?.uid ? (
          <>
            {isEditReview ? (
              <Button
                weak={true}
                onClick={() => {
                  updateMutate({ review, updateText: editReviewText });
                  setIsEditReview(false);
                }}
              >
                저장
              </Button>
            ) : (
              <Button weak={true} onClick={() => setIsEditReview(true)}>
                수정
              </Button>
            )}

            <Spacing size={8} direction='horizontal' />
            {isEditReview ? (
              <Button onClick={() => setIsEditReview(false)}>취소</Button>
            ) : (
              <Button
                onClick={() => {
                  removeMutate({
                    reviewId: review.id,
                    hotelId: review.hotelId,
                  });
                }}
              >
                삭제
              </Button>
            )}
          </>
        ) : null
      }
    />
  );
}
