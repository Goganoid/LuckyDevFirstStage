import { createContext, Fragment, useEffect, useState, type FunctionComponent, type PropsWithChildren } from 'react';
import { UserApi, type Ingredient, type UserInformation, type UserMeals } from 'src/api/user.service';
import styled from 'styled-components';
import { MyIngradients as MyIngredients, MyRecipes, SavedRecipes, TitleUser } from '../components/UserPage';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { isLoggedIn } from 'src/utils/storage';


const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
  margin-bottom: 50px;
`;

const Wrapper = styled.div`
    width: 90vw;
    margin: 0 auto;
`;
const LoadingWrapper = styled.div`
  height: 80vh;

`
interface UserProfile {
  info: UserInformation,
  meals: UserMeals,
  ingredients: Ingredient[]
}

export interface UserContextSetter {
  setUserProfile: (userProfile: UserProfile) => void
}

export const UserContext = createContext<null | UserProfile & UserContextSetter>(null);

const Userpage: FunctionComponent<PropsWithChildren> = () => {

  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) return;
    Promise.all([UserApi.GetUserInfo(), UserApi.GetMeals(), UserApi.GetUserIngredients()])
      .then(responses => {
        const [UserInfoResponse, UserMealsResponse, UserIngredientsResponse] = responses;
        console.log(UserInfoResponse, UserMealsResponse, UserIngredientsResponse);
        setUserProfile({
          info: UserInfoResponse.data,
          meals: UserMealsResponse.data,
          ingredients: UserIngredientsResponse.data
        });
        setLoading(false);
      })

  }, [])
  if (!isLoggedIn()) return <p>Access denied</p>;
  return (
    <Fragment>
      <Profile>
        {loading
          ?
          <LoadingWrapper>{LoadingSpinner()}</LoadingWrapper>
          :
          <UserContext.Provider value={{ ...userProfile!, setUserProfile }}>
            <Wrapper>
              <TitleUser />
              <MyIngredients />
              <MyRecipes />
              <SavedRecipes />
            </Wrapper>
          </UserContext.Provider>
        }
      </Profile>
    </Fragment>
  );
}

export default Userpage;


