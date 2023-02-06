import { useContext, useEffect, useState, type FunctionComponent } from 'react';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { MealDbApi, type Meal } from 'src/api/mealdb.service';
import { UserApi } from 'src/api/user.service';
import { LoadingSpinner } from 'src/components/LoadingSpinner';
import { successToastOptions } from 'src/config/toastify.config';
import { UserContext } from 'src/pages/Userpage';
import styled from 'styled-components';
import { MealCard } from '../Card';
import { MealDescriptionPopup } from '../MealDescriptionPopup';

export const SavedMealList = styled.div`
  display: grid; 
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem; 
  justify-content: space-between;

  @media screen and (max-width:785px) {
    &{
      grid-template-columns: repeat(1, 1fr);
      align-items: center;
    }
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SavedRecipes: FunctionComponent = () => {
  const userContext = useContext(UserContext);
  const [savedMeals, setSavedMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [curMeal, setCurMeal] = useState<Meal>();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    let promises: Promise<Meal | null>[] = [];
    userContext?.meals.savedMealsIds.forEach((id) => {
      promises.push(MealDbApi.getMeal(id));
    });
    Promise.all(promises).then(values => {
      let meals: Meal[] = [];
      values.forEach((value, idx) => {
        if (value != null) meals.push(value);
      });
      setSavedMeals(meals)
      setLoading(false)
    })
  }, [userContext?.meals.savedMealsIds])
  if (!userContext) return <></>;
  return (
    <>
      <h2>Saved Recipes: </h2>
      <MealDescriptionPopup
        show={show}
        handleClose={handleClose}
        curMeal={curMeal}
      />
      <Container>
        <SavedMealList>
          {loading
            ? <LoadingSpinner />
            : savedMeals.length === 0
              ? <p>Empty :(</p>
              : savedMeals.map((m, idx) => {
                return <ItemWrapper key={idx}>
                  <MealCard
                    key={m.idMeal}
                    meal={m}
                    setCurMeal={setCurMeal}
                    setShow={setShow}
                    onRemove={(meal) => {
                      UserApi.DeleteSavedMeal(meal.idMeal).then(result => {
                        toast.info("Deleting...", {...successToastOptions, autoClose:1500});
                        if (result?.status === 200) {
                          userContext.setUserProfile({
                            info: userContext.info,
                            ingredients: userContext.ingredients,
                            meals: {
                              userMeals: userContext.meals.userMeals,
                              savedMealsIds: userContext.meals.savedMealsIds.filter(id => id !== meal.idMeal)
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
    </>
  )
};

export default SavedRecipes;