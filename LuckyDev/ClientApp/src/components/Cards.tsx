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
            <div>
                <h4>{m.strMeal}</h4>
                <TasteButton>Скуштувати</TasteButton>
            </div>
        </Item>
    );
    return <MealsList>{meal}</MealsList>;
}

export default Cards;