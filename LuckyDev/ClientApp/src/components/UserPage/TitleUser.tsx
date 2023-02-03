import type { FunctionComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 120px;
`;

const TitleUser: FunctionComponent = () => (
  <Wrapper>
    <h2>Username</h2>
  </Wrapper>
);

export default TitleUser;