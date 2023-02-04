//@ts-nocheck
import { useEffect, useState, type FunctionComponent } from 'react';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { type Meal } from 'src/api/mealdb.service';
import { MealsFilter, MealsLoader } from 'src/api/meals_loader.service';
import styled from 'styled-components';
import { Filter } from './Filter';
import { itemsPerLoad } from '../config/constants';
import BounceLoader from "react-spinners/BounceLoader";
import { MealDescriptionPopup } from './MealDescriptionPopup';

const ItemWrapper = styled.div`
     flex: 30%;
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

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    
`;

const MealsList = styled.div`
    margin-top: 35px;
    width:75%;
    gap: 2%;
    margin: 35px auto 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
`;

const RecipeContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-basis: 50%;
    /* padding-left: 20px; */
    /* width: 100%; */
`;
const ImageWrapper = styled.div`
    flex-basis: 50%;
`
const RecipeName = styled.span`
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
`;

export const PopupYtLink = styled.a`
`;
const Cards: FunctionComponent = () => {

    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const [showLoadButton, setShowLoadButton] = useState(true);

    const [curMeal, setCurMeal] = useState<Meal>();

    const [searchFilters, setSearchFilters] = useState<MealsFilter>({
        name: '',
        area: '',
        category: '',
        ingredients: []
    })




    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const loadMoreMeals = () => {
        MealsLoader.TakeNext(itemsPerLoad, searchFilters).then(result => {
            setMeals([...meals, ...result]);
        });
    }
    useEffect(() => {
        setShowLoadButton(!MealsLoader.IsEnd() && !loading);
    }, [meals, loading])
    useEffect(() => {
        MealsLoader.TakeNext(itemsPerLoad, searchFilters).then(result => {
            if (result != null) setMeals(result)
            setLoading(false);
        })
    }, [searchFilters]);
    const meal = meals.map((m, idx) =>
        <ItemWrapper key={idx}>
            <Item className='meal'>
                <ImageWrapper>
                    <img
                        src={m.strMealThumb}
                        alt=""
                        height={180}
                    />
                </ImageWrapper>
                <RecipeContent>
                    <RecipeName>{m.strMeal}</RecipeName>
                    <Button
                        className='Bootstrap-Button meal-select'
                        onClick={() => {
                            setCurMeal(m);
                            setShow(true);
                        }}>
                        Taste!
                    </Button>
                </RecipeContent>
            </Item>
        </ItemWrapper>
    );
    return (
        <div id='main'>
            <div className="d-flex flex-column justify-content-center" id='left'>
                {loading && <Container className='d-flex align-items-center justify-content-center h-100'>
                    <BounceLoader
                        color={"#36d7b7"}
                        loading={loading}
                        size={60}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </Container>}
                {!loading && <MealsList>
                    {meal.length ? meal : <h3>No Matches</h3>}
                    <MealDescriptionPopup
                        show={show}
                        handleClose={handleClose}
                        curMeal={curMeal}
                    />
                </MealsList>}
                {showLoadButton &&
                    <Button variant="primary" className='Load-more-button' onClick={loadMoreMeals}>Load More</Button>}
            </div>
            <div id='right'>
                <Filter
                    searchFilters={searchFilters}
                    setSearchFilters={setSearchFilters}
                    setMeals={setMeals}
                    setShowLoadButton={setShowLoadButton}
                    setLoading={setLoading}
                />
            </div>
        </div>
    );
}

export default Cards;



