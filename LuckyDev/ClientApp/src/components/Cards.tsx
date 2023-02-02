import React, { useEffect, useState, type FunctionComponent } from 'react'
import {type Meal } from 'src/api/mealdb.service';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { MealsLoader } from 'src/api/meals_loader.service';

const SliderImage = styled.img`
    display: block;
    height: 200px;
`;

const ItemWrapper = styled.div`
     flex: 30%;
     display: flex;
     justify-content: center;
     margin-bottom: 36px;
`

const Item = styled.div`
    display: flex;
    width:100%;
    padding: 20px;
    background-color: #D6D6D6;
    border-radius: 15px;
    transition: 0.2s;
    &:hover {
        transform: translateY(-6px);
        box-shadow: 0px 6px 3px 1px #BEBEBE;
    }
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
    padding-left: 20px;
    width: 100%;
`;

const RecipeName = styled.span`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;
    padding-top: 5px;
    color: #000000;
`;

const itemsPerLoad = 6;

const Cards: FunctionComponent = () => {

    const [meals, setMeals] = useState<Meal[]>([]);
    const [showLoadButton, setShowLoadButton] = useState(true);

    const loadMoreMeals = () => {
        MealsLoader.TakeNext(itemsPerLoad).then(result => {
            setMeals([...meals, ...result]);
            if (MealsLoader.IsEnd()) setShowLoadButton(false);
        });
    }
    useEffect(() => {
        MealsLoader.TakeNext(itemsPerLoad).then(result => {
            console.log(result);
            if (result != null) setMeals(result)
        })
    }, []);
    const meal = meals.map((m, idx) =>

        <ItemWrapper key={idx}>
            <Item>
                <SliderImage
                    src={m.strMealThumb}
                    alt=""
                />
                <RecipeContent>
                    <RecipeName>{m.strMeal}</RecipeName>
                    <Button variant="primary" className='Bootstrap-Button' onClick={() => console.log(m)} >Скуштувати!</Button>
                </RecipeContent>
            </Item>
        </ItemWrapper>
    );
    return (
        <>
            <MealsList>
                {meal}
            </MealsList>
            {showLoadButton &&
                <Button variant="primary" className='Bootstrap-Button' onClick={loadMoreMeals}>Load More</Button>}
        </>
    );
}

export default Cards;