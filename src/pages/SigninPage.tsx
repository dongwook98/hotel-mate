import Flex from '@/components/shared/Flex';
import Spacing from '@/components/shared/Spacing';
import Button from '@/components/shared/Button';
import useGoogleSignin from '@/hooks/useGoogleSignin';

export default function SigninPage() {
  const { signin } = useGoogleSignin();

  return (
    <Flex direction='column' align='center' style={{ padding: 24 }}>
      <Spacing size={100} />
      <img
        src='https://cdn2.iconfinder.com/data/icons/line-drawn-social-media/30/send-64.png'
        alt=''
        width={120}
        height={120}
      />
      <Spacing size={60} />
      <Button size='medium' onClick={signin}>
        <Flex>
          <img
            src='https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Google-64.png'
            alt=''
            width={20}
            height={20}
          />
          <Spacing direction='horizontal' size={4} />
          Google 로그인
        </Flex>
      </Button>
    </Flex>
  );
}
