import type { FunctionComponent } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import IngredientsTable from './IngredientsTable/IngredientsTable';

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const AllButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const MyIngradients: FunctionComponent = () => (
  <>
    <h2>My ingradients:</h2>
    <AllButtonsWrapper>
      <ButtonsWrapper>
        <h4>Sort by:</h4>
        <Button className='Bootstrap-Button user-button'>Type</Button>
        <Button className='Bootstrap-Button user-button'>Name</Button>
        <Button className='Bootstrap-Button user-button'>Count</Button>
      </ButtonsWrapper>
      
      <IngredientsTable></IngredientsTable>
      
      <Button className='Bootstrap-Button Load-more-button'>Add new ingradients</Button>
    </AllButtonsWrapper>

    <hr />
  </>
);

export default MyIngradients;