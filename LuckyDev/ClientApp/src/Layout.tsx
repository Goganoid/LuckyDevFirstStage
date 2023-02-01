import { Footer, Header, Navbar } from './components';
import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <Fragment>
    <Header />
    <Navbar />
    {children}
    <Footer />
  </Fragment>
);

export default Layout;