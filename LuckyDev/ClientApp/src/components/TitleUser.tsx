import { useContext, type FunctionComponent } from 'react';
import { UserContext } from 'src/pages/Userpage';
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

const TitleUser: FunctionComponent = () => {

  const userContext = useContext(UserContext);
  if (userContext == null) return <></>;
  return (
    <Wrapper>
      <ImgWrapper src={userTag} alt="user tag" />
      <TitleWrapper>
        <h2 className='mb-4'>{`${userContext.info.firstName} ${userContext.info.lastName}`}</h2>
        <hr />
      </TitleWrapper>
    </Wrapper>
  )
};

export default TitleUser;