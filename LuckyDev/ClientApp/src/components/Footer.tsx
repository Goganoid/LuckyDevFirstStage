import type { FunctionComponent } from 'react';
import styled from 'styled-components';
import devLogo from '../assets/images/dev_logo.jpeg';

const BrandContent = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Inter;
  font-style: italic;
  word-spacing: 0.05rem;
`;

const StyledFooter = styled.footer`
  color: #fff;
  width: 100%;
  margin: auto;
  display: block;
  font-size: 1.5rem;
  padding: 2rem 1.75rem;
  background-color: #343A40;

  @media all and (max-width: 769px) {
    font-size: 1.5rem;
  }
`;

const LogoImg = styled.img`
  width: 100px;
  height: 100px;
`;

const Footer: FunctionComponent = () => (
  <StyledFooter>
    <BrandContent>
    <div>
      <p>Проект для хакатону INT20H.
        <br />
        Над проектом працювали команда LuckyDev.</p> 
    </div>
    <LogoImg src={devLogo} alt="LuckyDev logo" />
    </BrandContent>
  </StyledFooter>
);

export default Footer;