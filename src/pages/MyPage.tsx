import Button from '@/components/shared/Button';
import Flex from '@/components/shared/Flex';
import Spacing from '@/components/shared/Spacing';
import Text from '@/components/shared/Text';
import useUser from '@/hooks/auth/useUser';
import { auth } from '@/remote/firebase';
import { signOut } from 'firebase/auth';
import { useCallback } from 'react';

export default function MyPage() {
  const user = useUser();

  const handleLogout = useCallback(() => {
    signOut(auth);
  }, []);

  return (
    <Flex direction='column' align='center' justify='center'>
      <Spacing size={40} />
      <Spacing size={20} />
      <Text>{user?.email}</Text>
      <Text>{user?.displayName}</Text>
      <Spacing size={20} />
      <Button onClick={handleLogout}>로그아웃</Button>
    </Flex>
  );
}
