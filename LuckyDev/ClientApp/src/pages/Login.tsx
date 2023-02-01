import { Footer, Header, Loginmain } from '../components';
import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';

const Login: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <Header />
    <Loginmain />
    <Footer />
  </Fragment>
);

export default Login;