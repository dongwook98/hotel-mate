import { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';

import Flex from './Flex';
import Button from './Button';
import { colors } from '@/styles/colorPalette';
import useUser from '@/hooks/auth/useUser';

export default function Navbar() {
  const location = useLocation();
  const showSignButton =
    ['/signup', '/singin'].includes(location.pathname) === false;

  const user = useUser();

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Link to='/my'>
          <img
            src={
              user.photoURL ??
              'https://cdn0.iconfinder.com/data/icons/phosphor-light-vol-4/256/user-circle-light-64.png'
            }
            alt='유저의 이미지'
            width={40}
            height={40}
            style={{ borderRadius: '100%' }}
          />
        </Link>
      );
    }

    if (showSignButton) {
      return (
        <Link to='/signin'>
          <Button>로그인/회원가입</Button>
        </Link>
      );
    }

    return null;
  }, [user, showSignButton]);

  return (
    <Flex justify='space-between' align='center' css={navbarContainerStyles}>
      <Link to='/'>
        {/* <img src='/hotel-mate-logo.jpeg' alt='로고 이미지' /> */}
        <h1>Hotel Mate</h1>
      </Link>
      {renderButton()}
    </Flex>
  );
}

const navbarContainerStyles = css`
  padding: 16px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.gray};

  h1 {
    font-size: 24px;
    font-weight: 700;
  }
`;
