import { Footer, Header } from '../components';
import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Outlet } from "react-router-dom";
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
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
  min-width: calc(70% - 200px);
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

const Userpage: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
      <Header />
    <Profile>
        {/* <Outlet /> */}
        <UserInfo>
          <ProfileImageBlock><img alt='' className='profile-image'></img></ProfileImageBlock>
          <UserNameSpace>
            <UserName>Userpage</UserName>
            <BottomLine></BottomLine>
          </UserNameSpace>
        </UserInfo>
    </Profile>
    <Footer />
  </Fragment>
);

export default Userpage;