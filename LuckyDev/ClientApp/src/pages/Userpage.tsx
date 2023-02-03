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

const Userpage: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
      <Header />
    <Profile>
        <Outlet />
    </Profile>
    <Footer />
  </Fragment>
);

export default Userpage;