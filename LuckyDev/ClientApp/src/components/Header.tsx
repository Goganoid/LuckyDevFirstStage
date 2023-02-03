import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styled from 'styled-components';
import headerLogo from '../assets/images/header_logo.png';
import { LinkContainer } from 'react-router-bootstrap';

export const BrandContent = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Inter;
  word-spacing: 0.05rem;
`;

export let StyledHeader = styled(Navbar)`
  transition: 0.2s;
  position:fixed;
  z-index: 10;

  color: #fff;
  width: 100%;
  display: block;
  font-size: 1rem;
  background-color: #343A40;
  margin-bottom: 1rem;
  @media all and (max-width: 769px) {
    font-size: 1.5rem;
  }
`;


export const LogoImg = styled.img`
  width: 80px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;
// false - menu is always collapsed
// 'sm', 'md', 'lg', 'xl', 'xxl' - determines collapse point
const expand = 'lg';

interface Props {
  className?: string;
}

const Header: React.FC<Props> = ({ className }) => {
  const [scrollClass, setScrollClass] = useState<string>(className || '');
  
  useEffect(() => {
    window.onscroll = function() { handleScroll(); };

    let scrollPosition = 0;
    async function  handleScroll() {
      if (document.documentElement.scrollTop > scrollPosition) {
        setScrollClass('header-scrolling');
      } else {
        setScrollClass('');
      }
      scrollPosition = document.documentElement.scrollTop;
    }

    return () => {
      window.onscroll = null;
    };
  }, []);
  
  return (
  <StyledHeader expand={expand} variant="dark" className={scrollClass}>
    <Container fluid>
      <Navbar.Brand href="#">
        <BrandContent>
          <LogoWrapper>
            <LogoImg src={headerLogo} alt="logo" />
            <h1>RecipeWiki</h1>
          </LogoWrapper>
        </BrandContent>
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
              <LinkContainer to='/auth/login'><Nav.Link>Login</Nav.Link></LinkContainer>
              <LinkContainer to='/auth/register'><Nav.Link>Register</Nav.Link></LinkContainer>
              <LinkContainer to='/user'><Nav.Link>Profile</Nav.Link></LinkContainer>
            
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Container>
  </StyledHeader>
  )
};

export default Header;