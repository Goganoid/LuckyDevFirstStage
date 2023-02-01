import React, { useEffect, useState, type FunctionComponent } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { MealDbApi, type Meal } from 'src/api/mealdb.service';
import styled from 'styled-components';

const SliderImage = styled.img`
    display: block;
    /* height:400px; */
`
const ItemStyle = {
    height:'500px'
}


export const Slider: FunctionComponent = () => {

    const [meals, setMeals] = useState<Meal[]>([]);
    useEffect(() => {
        MealDbApi.getRandomSelection().then(result => {
            console.log(result);
            setMeals(result)
        })
    },[]);
    return (
        <>
            <div className='d-flex justify-content-center'>
                <Carousel className='w-50 h-25'>
                    {meals.map((meal, idx) => (
                        <Carousel.Item key={idx} style={ItemStyle}>
                        <SliderImage
                            src={meal.strMealThumb}
                            alt=""
                        />
                        <Carousel.Caption>
                                <h3>{meal.strMeal}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </>
    )
}