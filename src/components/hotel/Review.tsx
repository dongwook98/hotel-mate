import { useCallback } from 'react';
import { format } from 'date-fns';

import Text from '../shared/Text';
import useReview from './hooks/useReview';
import Flex from '../shared/Flex';
import Spacing from '../shared/Spacing';
import ListRow from '../shared/ListRow';
import useUser from '@/hooks/auth/useUser';
import Button from '../shared/Button';
import TextField from '../shared/TextField';
import { useAlertContext } from '@/context/AlertContext';
import { useNavigate } from 'react-router-dom';

export default function Review({ hotelId }: { hotelId: string }) {
  const { data: reviews, isLoading } = useReview({ hotelId });
  const user = useUser();
  const { open } = useAlertContext();
  const navigate = useNavigate();

  const reviewRows = useCallback(() => {
    if (reviews?.length === 0) {
      return (
        <Flex direction='column' align='center' style={{ margin: '40px 0' }}>
          <img
            src='https://cdn2.iconfinder.com/data/icons/essential-web-3/50/edit-document-note-writing-review-64.png'
            alt=''
          />
          <Spacing size={10} />
          <Text typography='t6'>
            아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
          </Text>
        </Flex>
      );
    }

    return (
      <ul>
        {reviews?.map((review) => {
          return (
            <ListRow
              left={
                review.user.photoURL != null ? (
                  <img
                    src={review.user.photoURL}
                    alt=''
                    width={40}
                    height={40}
                  />
                ) : null
              }
              contents={
                <ListRow.Texts
                  title={review.text}
                  subTitle={format(review.createdAt, 'yyyy-MM-dd')}
                />
              }
              right={review.userId === user?.uid ? <Button>삭제</Button> : null}
            />
          );
        })}
      </ul>
    );
  }, [reviews, user?.uid]);

  if (isLoading === true) {
    return null;
  }

  return (
    <div style={{ margin: '40px 0' }}>
      <Text bold={true} typography='t4' style={{ padding: '0 24px' }}>
        리뷰
      </Text>
      <Spacing size={16} />
      {reviewRows()}
      <div style={{ padding: '0 24px' }}>
        <TextField
          onFocus={() => {
            if (user == null) {
              open({
                title: '로그인한 유저만 리뷰를 작성 할 수 있습니다.',
                buttonLabel: '로그인하러 가기',
                onButtonClick: () => {
                  navigate('/signin');
                },
              });
            }
          }}
        />
        <Spacing size={6} />
        <Flex justify='flex-end'>
          <Button>작성</Button>
        </Flex>
      </div>
    </div>
  );
}
