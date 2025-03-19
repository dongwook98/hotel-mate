import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getLikes, toggleLike } from '@/remote/like';
import useUser from '../auth/useUser';
import { useAlertContext } from '@/context/AlertContext';
import { Hotel } from '@/models/hotel';

function useLike() {
  const navigate = useNavigate();
  const user = useUser();
  const { open } = useAlertContext();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['likes'],
    queryFn: () => getLikes({ userId: user?.uid as string }),
    enabled: user != null,
  });

  const { mutate } = useMutation({
    mutationFn: ({
      hotel,
    }: {
      hotel: Pick<Hotel, 'name' | 'id' | 'mainImageUrl'>;
    }) => {
      if (user == null) {
        throw new Error('로그인필요');
      }

      return toggleLike({ hotel, userId: user.uid });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes'] });
    },
    onError: (e: Error) => {
      if (e.message === '로그인필요') {
        open({
          title: '로그인이 필요한 기능입니다.',
          onButtonClick: () => {
            navigate('/signin');
          },
        });
        return;
      }

      open({
        title: '알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
        onButtonClick: () => {},
      });
    },
  });

  return { data, mutate };
}

export default useLike;
