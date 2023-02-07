import { useContext, useState, type FunctionComponent } from 'react';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { UserApi, type Ingredient } from 'src/api/user.service';
import { convertToFilterItem, convertToFilterList, ingredientOptions } from 'src/config/constants';
import { successToastOptions } from 'src/config/toastify.config';
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
    toast.info("Sending request...", successToastOptions);
    const ingredient = selectedIngredient;
    setSelectedIngredient('');
    UserApi.AddIngredient(selectedIngredient).then(result => {
      if (result?.status === 200) {
        userContext?.setUserProfile({
          info: userContext.info,
          ingredients: [...userContext.ingredients, { name: ingredient } as Ingredient],
          meals: userContext.meals
        })
      }
    });
  }
    
    
  const Selector = (
    <div className='d-flex ms-3'>
      <Select
        value={selectedIngredient==='' ? null : convertToFilterItem(selectedIngredient)}
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