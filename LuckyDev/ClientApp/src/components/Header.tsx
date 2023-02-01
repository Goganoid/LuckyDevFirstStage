import type { FunctionComponent } from 'react';
import styled from 'styled-components';
import headerLogo from '../assets/images/header_logo.png';

const BrandContent = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Inter;
  word-spacing: 0.05rem;
`;

const StyledHeader = styled.footer`
  color: #fff;
  width: 100%;
  margin: auto;
  display: block;
  font-size: 1.5rem;
  padding: 1rem 1.5rem;
  background-color: #343A40;

  @media all and (max-width: 769px) {
    font-size: 1.5rem;
  }
`;

const LogoImg = styled.img`

`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Header: FunctionComponent = () => (
  <StyledHeader>
    <BrandContent>
    <LogoWrapper>
        <LogoImg src={headerLogo} alt="logo" />
        <h1>RecipeWiki</h1> 
    </LogoWrapper>
    </BrandContent>
  </StyledHeader>
);

export default Header;