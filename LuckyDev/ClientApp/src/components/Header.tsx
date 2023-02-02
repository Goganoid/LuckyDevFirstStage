import type { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styled from 'styled-components';
import headerLogo from '../assets/images/header_logo.png';

const BrandContent = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Inter;
  word-spacing: 0.05rem;
`;

const StyledHeader = styled(Navbar)`
  color: #fff;
  width: 100%;
  display: block;
  font-size: 1.5rem;
  background-color: #343A40;
  margin-bottom: 1rem;
  @media all and (max-width: 769px) {
    font-size: 1.5rem;
  }
`;


const LogoImg = styled.img`
  width: 80px;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;
// false - menu is always collapsed
// 'sm', 'md', 'lg', 'xl', 'xxl' - determines collapse point
const expand = false;

const Header: FunctionComponent = () => (
  <StyledHeader expand={expand} variant="dark">
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
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Container>
  </StyledHeader>
);

export default Header;