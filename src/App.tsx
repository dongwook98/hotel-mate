import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Button from '@shared/Button';

export default function App() {
  return (
    <Container css={containerStyle}>
      <Button>버튼</Button>
    </Container>
  );
}

const containerStyle = css`
  color: red;
`;

const Container = styled.div`
  width: 100px;
  height: 100px;
  background-color: blue;
`;
