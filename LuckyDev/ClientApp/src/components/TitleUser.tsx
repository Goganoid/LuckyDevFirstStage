import type { FunctionComponent } from 'react';
import styled from 'styled-components';
import userTag from '../assets/images/user_tag.png';

const Wrapper = styled.div`
  display: flex;
  margin: 120px auto 40px;
  align-items: center;
  gap: 5vw;
`;

const ImgWrapper = styled.img`

`;

const TitleWrapper = styled.div`
  width: 60vw;
`;

const TitleUser: FunctionComponent = () => (
  <Wrapper>
    <ImgWrapper src={userTag} alt="user tag" />
    <TitleWrapper>
      <h2 className='mb-4'>Username</h2>
      <hr />
    </TitleWrapper>
  </Wrapper>
);

export default TitleUser;