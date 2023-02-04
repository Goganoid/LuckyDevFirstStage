import { useEffect, useState, type FunctionComponent } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { CreateRecipePopup } from './CreateRecipePopup';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const MyRecipes: FunctionComponent = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <div>
      <h2>My recipes:</h2>
    <Wrapper>
      <Button 
        className='Bootstrap-Button Load-more-button' 
        onClick={() => {
          setShow(true);
        }}>
        Add new recipe
      </Button>
      <CreateRecipePopup
        show={show}
        handleClose={handleClose}
      />
    </Wrapper>
    <hr />
    </div>
  )
};

export default MyRecipes;