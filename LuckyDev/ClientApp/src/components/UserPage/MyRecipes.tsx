import type { FunctionComponent } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const MyRecipes: FunctionComponent = () => (
  <>
    <h2>My recipes:</h2>
    <Wrapper>
      <Button className='Bootstrap-Button Load-more-button'>Add new ingradients</Button>
    </Wrapper>
    <hr />
  </>
);

export default MyRecipes;