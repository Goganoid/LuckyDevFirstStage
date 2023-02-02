import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import Navbar from 'react-bootstrap/esm/Navbar';
import { Outlet, Link} from "react-router-dom";
import { BrandContent, LogoImg, LogoWrapper } from 'src/components/Header';
import headerLogo from '../assets/images/header_logo.png';

const AuthWrapper: FunctionComponent<PropsWithChildren> = () => (
    <Fragment>
        <Navbar>
            <Link to="/">
                <Navbar.Brand>
                    <BrandContent>
                        <LogoWrapper>
                            <LogoImg src={headerLogo} alt="logo" />
                        </LogoWrapper>
                    </BrandContent>
                </Navbar.Brand>
            </Link>
        </Navbar>
        <Outlet />
    </Fragment>
);

export default AuthWrapper;