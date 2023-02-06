import { useContext, useState, type FunctionComponent } from 'react';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import { UserApi, type Ingredient } from 'src/api/user.service';
import { convertToFilterList, ingredientOptions } from 'src/config/constants';
import { UserContext } from 'src/pages/Userpage';
import styled from 'styled-components';
import { IngredientsTable } from './IngredientsTable';

const IngredientsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const MyIngredients: FunctionComponent = () => {
  const userContext = useContext(UserContext);
  const [selectedIngredient, setSelectedIngredient] = useState<string>('');

  if (userContext === null) return <></>;

  const handleAddIngredient = () => {
    if (selectedIngredient === '') return;

    UserApi.AddIngredient(selectedIngredient).then(result => {
      if (result?.status === 200) {
        userContext?.setUserProfile({
          info: userContext.info,
          ingredients: [...userContext.ingredients, { name: selectedIngredient } as Ingredient],
          meals: userContext.meals
        })
      }
    });
  }
    
    
  const Selector = (
    <div className='d-flex ms-3'>
      <Select
        options={convertToFilterList(ingredientOptions)}
        isClearable={true}
        isSearchable={true}
        onChange={(newValue, { action }) => {
          if (action === 'select-option')
            setSelectedIngredient(newValue?.value!);
          if (action === 'deselect-option' || action === 'clear')
            setSelectedIngredient('');
        } } />
      <Button className='Bootstrap-Button'
        disabled={selectedIngredient === '' || userContext.ingredients.some(i => i.name === selectedIngredient)}
        onClick={handleAddIngredient}>Add</Button>
    </div>
  );

  return (
    <>
      <div>
        <h2>My ingredients: </h2>
        <div className='new-ingredient'>{Selector}</div>
      </div>
      
      <IngredientsWrapper>
        <IngredientsTable />
      </IngredientsWrapper>

      <hr />
    </>
  )
};

export default MyIngredients;