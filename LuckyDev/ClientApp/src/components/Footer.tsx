import type { FunctionComponent } from 'react';
import styled from 'styled-components';

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
  display: block;
  font-size: 1rem;
  padding: 1.5rem 1.75rem;
  background-color: #343A40;
  position: relative;
  @media all and (max-width: 769px) {
    font-size: 1rem;
  }
`;
const Footer: FunctionComponent = () => (
  <StyledFooter>
    <BrandContent>
    <div>
      <p>Проект для хакатону INT20H.
        <br />
        Над проектом працювала команда LuckyDev.</p> 
    </div>
    </BrandContent>
  </StyledFooter>
);

export default Footer;