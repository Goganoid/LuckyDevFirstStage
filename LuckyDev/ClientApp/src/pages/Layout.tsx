import { Footer, Header, Cards } from '../components';
import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <Fragment>
    <Header />
    {children}
    <Cards />
    <Footer />
  </Fragment>
);

export default Layout;