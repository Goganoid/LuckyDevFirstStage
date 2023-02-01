import { Footer, Header, Registermain } from '../components';
import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';

const Register: FunctionComponent<PropsWithChildren> = () => (
  <Fragment>
    <Header />
    <Registermain />
    <Footer />
  </Fragment>
);

export default Register;