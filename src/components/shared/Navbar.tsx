import { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';

import Flex from './Flex';
import Button from './Button';
import { colors } from '@/styles/colorPalette';

export default function Navbar() {
  const location = useLocation();
  const showSignButton =
    ['/signup', '/singin'].includes(location.pathname) === false;

  // TODO
  const user = null;

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Link to='/my'>
          {/* TODO */}
          <img src='' alt='' />
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
      <Link to='/'>홈</Link>
      {renderButton()}
    </Flex>
  );
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.gray};
`;
