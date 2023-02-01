import React, { useEffect, useState, type FunctionComponent } from 'react'
import { MealDbApi, type Meal } from 'src/api/mealdb.service';
import styled from 'styled-components';

const SliderImage = styled.img`
    display: block;
    height: 200px;
`;

const Item = styled.div`
    display: flex;
    width: 475px;
    padding: 20px;
    background-color: #D6D6D6;
    border-radius: 15px;
`;

const MealsList = styled.div`
    margin: 30px 45px;
    display: flex;
    flex-wrap: wrap;
    gap: 36px;
    justify-content: space-between;
    align-items: center;
`;

const RecipeContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    padding-left: 5px;
    padding-top: 5px;
    color: #000000;
`;

const TasteButton = styled.button`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #FFFFFF;
    background: #E09822;
    border: none;
    border-radius: 10px;
    pading: 5px;
    margin: 0 30px 15px 30px;
`;

const TasteSpan = styled.span`
    width: 100%;
    margin: auto;
    text-align: center;
`;

const Cards: FunctionComponent = () => {

    const [meals, setMeals] = useState<Meal[]>([]);
    useEffect(() => {
        MealDbApi.getMeals().then(result => {
            console.log(result);
            setMeals(result)
        })
    },[]);
    const meal = meals.map((m, idx) =>
        <Item key={idx}>
            <SliderImage
                src={m.strMealThumb}
                alt=""
            />
            <RecipeContent>
                <RecipeName>{m.strMeal}</RecipeName>
                <TasteButton><TasteSpan>Скуштувати!</TasteSpan></TasteButton>
            </RecipeContent>
        </Item>
    );
    return <MealsList>{meal}</MealsList>;
}

export default Cards;