import { type FunctionComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 120px;
`;
const UserInfo = styled.div`
  margin: 100px 5% 20px;
  display: flex;
  gap: 5%;
  vertical-align: middle;
`;
const ProfileImageBlock = styled.div`
  display: flex;
  justify-content: center;
  max-width: 200px;
  width: 20%;
  height: fit-content;
  max-height: 200px;
`;
const UserNameSpace = styled.div`
  padding: fit-content 0;
  min-width: calc(100% - 200px);
`;
const UserName = styled.span`
  font-size: 40px;
  font-weight: bold;
  margin: 0 10%;
`;
const BottomLine = styled.hr`
  width: 80%;
  min-width: 180px;
  height: 3px;
  background-color: black;
  margin: 20px 5% 0 5%;
`;

const TitleUser: FunctionComponent = () => (
  <Wrapper>
    <UserInfo>
          <ProfileImageBlock><img alt='' className='profile-image'></img></ProfileImageBlock>
          <UserNameSpace>
            <UserName>Userpage</UserName>
            <BottomLine></BottomLine>
          </UserNameSpace>
        </UserInfo>

        <div>
          <h1>My ingredients:</h1>
          <div><span>Sort by:</span>{/*<Button></Button>*/}</div>
        </div>
  </Wrapper>
);

export default TitleUser;