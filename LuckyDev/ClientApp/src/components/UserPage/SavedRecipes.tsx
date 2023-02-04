import { useContext, useEffect, useState, type FunctionComponent } from 'react';
import { MealDbApi, type Meal } from 'src/api/mealdb.service';
import { LoadingSpinner } from 'src/pages/LoadingSpinner';
import { UserContext } from 'src/pages/Userpage';
import styled from 'styled-components';
import { MealCard } from '../Card';
import { MealDescriptionPopup } from '../MealDescriptionPopup';


const SavedMealList = styled.div`
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
`

const ItemWrapper = styled.div`

  display: flex;
  justify-content: center;
`

const SavedRecipes: FunctionComponent = () => {
  const userContext = useContext(UserContext);
  const [savedMeals, setSavedMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [curMeal, setCurMeal] = useState<Meal>();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    let promises: Promise<Meal | null>[] = [];
    userContext?.meals.savedMealsIds.map((id) => {
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
      <SavedMealList>
        {loading
          ? <LoadingSpinner />
          : savedMeals.map(m => {
            return <ItemWrapper>
              <MealCard
                key={m.idMeal}
                meal={m}
                setCurMeal={setCurMeal}
                setShow={setShow}
              />
            </ItemWrapper>
          })
        }
      </SavedMealList>
    </>
  )
};

export default SavedRecipes;