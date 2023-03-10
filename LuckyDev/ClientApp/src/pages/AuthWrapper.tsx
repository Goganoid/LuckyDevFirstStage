import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import Navbar from 'react-bootstrap/esm/Navbar';
import { Outlet, Link} from "react-router-dom";

import headerLogo from '../assets/images/header_logo.png';

const AuthWrapper: FunctionComponent<PropsWithChildren> = () => (
    <Fragment>
        <Navbar>
            <Link to="/">
                <Navbar.Brand>
                    <div className='BrandContent'>
                        <div className='LogoWrapper'>
                            <img className='LogoImg' src={headerLogo} alt="logo" />
                        </div>
                    </div>
                </Navbar.Brand>
            </Link>
        </Navbar>
        <Outlet />
    </Fragment>
);

export default AuthWrapper;