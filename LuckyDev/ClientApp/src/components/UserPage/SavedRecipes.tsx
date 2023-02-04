import { useContext, useEffect, useState, type FunctionComponent } from 'react';
import { MealDbApi, type Meal } from 'src/api/mealdb.service';
import { LoadingSpinner } from 'src/pages/LoadingSpinner';
import { UserContext } from 'src/pages/Userpage';
import styled from 'styled-components';
import { MealCard } from '../Card';


const SavedMealList = styled.div`
  display:flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

const SavedRecipes: FunctionComponent = () => {
  const userContext = useContext(UserContext);
  const [savedMeals, setSavedMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [curMeal, setCurMeal] = useState<Meal>();
  const [show, setShow] = useState(false);
  console.log(userContext?.meals.savedMealsIds);

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
      <h2>SavedRecipes: </h2>
      <SavedMealList>
        {loading
          ? <LoadingSpinner />
          : savedMeals.map(m => {
            return <MealCard
              key={m.idMeal}
              meal={m}
              setCurMeal={setCurMeal}
              setShow={setShow}
            />
          })
        }
      </SavedMealList>
    </>
  )
};

export default SavedRecipes;