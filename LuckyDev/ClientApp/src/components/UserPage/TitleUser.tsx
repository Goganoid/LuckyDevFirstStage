import { useContext, type FunctionComponent } from 'react';
import { UserContext } from 'src/pages/Userpage';
import styled from 'styled-components';
import userTag from '../../assets/images/user_tag.png';

const Wrapper = styled.div`
  display: flex;
  margin: 120px auto 40px;
  align-items: center;
  gap: 5vw;
`;

const ImgWrapper = styled.img`
  width: 300px;
  @media screen and (max-width:800px) {   
    & {
      width:200px
    }
  }
  @media screen and (max-width:525px) {   
    & {
      width:150px
    }
  }
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