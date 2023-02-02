import { Footer, Header } from '../components';
import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Outlet } from "react-router-dom";
const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
`;

const Layout: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <Main>
      <Header />
        <Outlet />
      <Footer />
    </Main>
  </Fragment>
);

export default Layout;