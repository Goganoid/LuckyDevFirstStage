import React, { useEffect, useState, type FunctionComponent } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { MealDbApi, type Meal } from 'src/api/mealdb.service';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import dateDiffInDays from 'src/utils/dateDiff';

const SliderImage = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const ItemStyle = {
    height: '500px'
}


type SliderStorage = {
    items: Meal[],
    last_update: string
}


const Slider: FunctionComponent = () => {

    const [meals, setMeals] = useState<Meal[]>([]);
    useEffect(() => {
        const stored_slider_str: string | null = window.localStorage.getItem('slider_items');
        console.log(stored_slider_str);
        if (stored_slider_str != null) {
            const stored_slider = JSON.parse(stored_slider_str) as SliderStorage;
            const daysSinceUpdate = dateDiffInDays(new Date(stored_slider.last_update), new Date());
            console.log(daysSinceUpdate);
            if (daysSinceUpdate < 7) {
                setMeals(stored_slider.items);
                return;
            }
        }

        MealDbApi.getRandomSelection().then(result => {
            console.log(result);
            setMeals(result);
            var date = new Date();
            date.setDate(date.getDate() - 10);
            var storage_item: SliderStorage = {
                items: result,
                last_update: date.toString()
            }
            window.localStorage.setItem('slider_items', JSON.stringify(storage_item))
        })

    }, []);
    return (
        <>
            <div className='d-flex justify-content-center'>
                <Carousel className='w-50 h-100 button-on-slick'>
                    {meals.map((meal, idx) => (
                        <Carousel.Item key={idx} style={ItemStyle}>
                            <SliderImage
                                src={meal.strMealThumb}
                                alt=""
                            />
                            <Carousel.Caption>
                                <h3>{meal.strMeal}</h3>
                                <Button className='Bootstrap-Button' variant="primary">Скуштувати!</Button>
                        </Carousel.Caption>
                    </Carousel.Item>
                    ))}
                </Carousel>
            </div>
            <hr className='line'></hr>
        </>
    )
}

export default Slider;