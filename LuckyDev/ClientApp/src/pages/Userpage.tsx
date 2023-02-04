import { createContext, Fragment, useEffect, useState, type FunctionComponent, type PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';
import BounceLoader from 'react-spinners/BounceLoader';
import { UserApi, type Ingredient, type UserInformation, type UserMeals } from 'src/api/user.service';
import styled from 'styled-components';
import { MyIngradients, MyRecipes, SavedRecipes, TitleUser } from '../components/UserPage';


const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
`;

const Wrapper = styled.div`
    width: 90vw;
    margin: 0 auto;
`;

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

  return (
    <Fragment>
      <Profile>
        {loading
          ?
          <Container className='d-flex align-items-center justify-content-center h-100'>
            <BounceLoader
              color={"#36d7b7"}
              loading={loading}
              size={60}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </Container>
          :
          <UserContext.Provider value={{ ...userProfile!, setUserProfile }}>
            <Wrapper>
              <TitleUser />
              <MyIngradients />
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