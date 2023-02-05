import { useContext, useState, type FunctionComponent } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import type { Meal } from 'src/api/mealdb.service';
import { UserApi, type UserCustomMeal } from 'src/api/user.service';
import { UserContext } from 'src/pages/Userpage';
import styled from 'styled-components';
import { MealCard } from '../Card';
import { ItemWrapper } from './SavedRecipes';
import { LoadingSpinner } from '../LoadingSpinner';
import { MealDescriptionPopup } from '../MealDescriptionPopup';
import { CreateRecipePopup } from './CreateRecipePopup';
import { SavedMealList } from './SavedRecipes';
import { toast } from 'react-toastify';
import { successToastOptions } from 'src/config/toastify.config';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;


function CustomMealToMeal(customMeal: UserCustomMeal): Meal {
  let meal = {} as Meal;
  meal.custom = true;
  meal.idMeal = customMeal.id!.toString();
  meal.strArea = customMeal.area;
  meal.strCategory = customMeal.category;
  meal.strMealThumb = customMeal.image;
  meal.strMeal = customMeal.name;
  meal.strInstructions = customMeal.instructions;
  console.log(customMeal.ingredients);
  customMeal.ingredients.forEach((ingredient, idx) => {
    if (idx >= 20) return;
    (meal as any)[`strIngredient${idx}`] = ingredient.name;
    (meal as any)[`strMeasure${idx}`] = ingredient.measure ?? '';
  })
  console.log(meal);
  return meal;
}

const MyRecipes: FunctionComponent = () => {
  const userContext = useContext(UserContext);
  const [newRecipeShow, setNewRecipeShow] = useState(false);
  const [show, setShow] = useState(false);
  const handleNewRecipeClose = () => setNewRecipeShow(false);
  const handleClose = () => setShow(false);
  const [loading, setLoading] = useState(false);
  const [curMeal, setCurMeal] = useState<Meal>();
  return (
    <div>
      <h2>My recipes:</h2>
      <Wrapper>
        <MealDescriptionPopup
          show={show}
          handleClose={handleClose}
          curMeal={curMeal}
        />
        <Container>
          <SavedMealList>
            {loading
              ? <LoadingSpinner />
              : userContext?.meals.userMeals.length === 0
                ? <p>Empty :(</p>
                : userContext?.meals.userMeals.map((customMeal, idx) => {
                  let m = CustomMealToMeal(customMeal);
                  return <ItemWrapper key={idx}>
                    <MealCard
                      key={m.idMeal}
                      meal={m}
                      setCurMeal={setCurMeal}
                      setShow={setShow}
                      onRemove={(meal) => {
                        console.log(meal.idMeal);
                        UserApi.DeleteCustomMeal(meal.idMeal).then(result => {
                          if (result?.status === 200) {
                            toast.success("Item Deleted", successToastOptions);
                            userContext.setUserProfile({
                              info: userContext.info,
                              ingredients: userContext.ingredients,
                              meals: {
                                userMeals: userContext.meals.userMeals.filter(m=>m.id!==customMeal.id),
                                savedMealsIds:userContext.meals.savedMealsIds
                              }
                            })
                          }
                        })
                      }}
                    />
                  </ItemWrapper>
                })
            }
          </SavedMealList>
        </Container>
        <Button
          className='Bootstrap-Button Load-more-button'
          onClick={() => {
            setNewRecipeShow(true);
          }}>
          Add new recipe
        </Button>
        <CreateRecipePopup
          show={newRecipeShow}
          handleClose={handleNewRecipeClose}
        />
      </Wrapper>
      <hr />
    </div>
  )
};

export default MyRecipes;