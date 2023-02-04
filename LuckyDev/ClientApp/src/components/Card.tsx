import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { type Meal } from 'src/api/mealdb.service';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const RecipeContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-basis: 50%;
`;
export const ImageWrapper = styled.div`
    flex-basis: 50%;
    & img{
        height: 180px;
        width: 180px;
    }
    @media screen and (max-width:1215px) {
        & img{
        height: 140px;
        width: 140px;
        }
    }
    @media screen and (max-width:1110px) {
        & img{
        height: 100px;
        width: 100px;
        }
    }
    `
export const RecipeName = styled.span`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    display: flex;
    align-items: center;
    padding-top: 5px;
    color: #000000;
    overflow: hidden;
    @media screen and (max-width:1050px) {
        &{
            font-size: 18px;
        }
    }
`;


export const ItemWrapper = styled.div`
position: relative;
     flex: 30%;
     flex-grow: 0;
     display: flex;
     /* justify-content: center; */
     margin-bottom: 36px;
     padding: 20px;
     background-color: #D6D6D6;
     border-radius: 15px;
     transition: 0.2s;
    &:hover {
        transform: translateY(-6px);
        box-shadow: 0px 6px 3px 1px #BEBEBE;
    }
`;
const CloseWrapper = styled.div`
    position: absolute;
    top:5px;
    right:10px;
`


export const Item = styled.div`
position: relative;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
    
`;
export type MealCardProps = {
    meal: Meal,
    setCurMeal: (curMeal: Meal) => void,
    setShow: (show: boolean) => void,
    onRemove?: (mealRemove: Meal) => void,
}

export function MealCard({ meal, setCurMeal, setShow, onRemove }: MealCardProps): JSX.Element {
    return <ItemWrapper>
        {onRemove &&
            <CloseWrapper>
                    <FontAwesomeIcon icon={faTrash}  onClick={() => {
                            onRemove(meal);
                        }} />
             </CloseWrapper>}
        <Item className='meal'>
            
            <ImageWrapper>
                <img
                    src={meal.strMealThumb}
                    alt=""
                // height={180}
                />
            </ImageWrapper>
            <RecipeContent>
                <RecipeName>{meal.strMeal}</RecipeName>
                <div>
                    <Button
                        className='Bootstrap-Button meal-select'
                        onClick={() => {
                            setCurMeal(meal);
                            setShow(true);
                        }}>
                        Taste!
                    </Button>
                </div>
            </RecipeContent>
        </Item>
    </ItemWrapper>;
}
