import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import headerLogo from '../assets/images/header_logo.png';
import { LinkContainer } from 'react-router-bootstrap';
import { NUGET_URL_CONFIG } from 'src/config/constants';
import { isLoggedIn } from 'src/utils/storage';

// false - menu is always collapsed
// 'sm', 'md', 'lg', 'xl', 'xxl' - determines collapse point
const expand = 'lg';

interface Props {
  className?: string;
}

const Header: React.FC<Props> = ({ className }) => {
  const [scrollClass, setScrollClass] = useState<string>(className || '');

  useEffect(() => {
    window.onscroll = function () { handleScroll(); };

    let scrollPosition = 0;
    async function handleScroll() {
      if (document.documentElement.scrollTop < scrollPosition || document.documentElement.scrollTop <= 30) {
          setScrollClass('StyledHeader');
      } else {
          setScrollClass('StyledHeader header-scrolling');
      }
      scrollPosition = document.documentElement.scrollTop;
    }

    return () => {
      setScrollClass('StyledHeader');
      window.onscroll = null;
    };
  }, []);

  return (
    <Navbar expand={expand} variant="dark" className={scrollClass}>
      <Container fluid>
        <Navbar.Brand href="/">
          <div className='BrandContent'>
            <div className='LogoWrapper'>
              <img className='LogoImg' src={headerLogo} alt="logo" />
              <h1>RecipeWiki</h1>
            </div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
          style={{ backgroundColor: "#343A40", color: "white" }}
        >
          <Offcanvas.Header closeButton closeVariant='white'>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {
                !isLoggedIn() ?
                  <>
                    <LinkContainer to='/auth/login'><Nav.Link>Login</Nav.Link></LinkContainer>
                    <LinkContainer to='/auth/register'><Nav.Link>Register</Nav.Link></LinkContainer>
                  </>
                  :
                  <>
                  <LinkContainer to='/user'><Nav.Link>Profile</Nav.Link></LinkContainer>
                  <LinkContainer to='/auth/logout'><Nav.Link>Logout</Nav.Link></LinkContainer>
                  </>
              }


              <Nav.Link href={NUGET_URL_CONFIG.SwaggerDocs}>API</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
};

export default Header;