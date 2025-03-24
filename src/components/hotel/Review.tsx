import { ChangeEvent, useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Text from '../shared/Text';
import useReview from './hooks/useReview';
import Flex from '../shared/Flex';
import Spacing from '../shared/Spacing';
import useUser from '@/hooks/auth/useUser';
import Button from '../shared/Button';
import TextField from '../shared/TextField';
import { useAlertContext } from '@/context/AlertContext';
import ReviewListItem from './ReviewListItem';

export default function Review({ hotelId }: { hotelId: string }) {
  const { data: reviews, isLoading, writeMutate } = useReview({ hotelId });
  const user = useUser();
  const { open: openAlert } = useAlertContext();
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const reviewListRender = useCallback(() => {
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
          return <ReviewListItem review={review} />;
        })}
      </ul>
    );
  }, [reviews]);

  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const handleTextFieldFocus = () => {
    if (user == null) {
      openAlert({
        title: '로그인한 유저만 리뷰를 작성 할 수 있습니다.',
        buttonLabel: '로그인하러 가기',
        onButtonClick: () => {
          navigate('/signin');
        },
      });
    }
  };

  const handleWriteReviewClick = async () => {
    const isSuccess = await writeMutate(text);

    if (isSuccess === true) {
      setText('');
    }
  };

  if (isLoading === true) {
    return null;
  }

  return (
    <div style={{ margin: '40px 0' }}>
      <Text bold={true} typography='t4' style={{ padding: '0 24px' }}>
        리뷰
      </Text>
      <Spacing size={16} />
      {reviewListRender()}
      <div style={{ padding: '0 24px' }}>
        <TextField
          value={text}
          onChange={handleTextChange}
          onFocus={handleTextFieldFocus}
        />
        <Spacing size={6} />
        <Flex justify='flex-end'>
          <Button disabled={text === ''} onClick={handleWriteReviewClick}>
            작성
          </Button>
        </Flex>
      </div>
    </div>
  );
}
