//@ts-nocheck
import { useEffect, useState, type FunctionComponent } from 'react';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { MealDbApi, type Meal } from 'src/api/mealdb.service';
import {dateDiffInDays} from 'src/utils/dateDiff';
import styled from 'styled-components';
import { MealDescriptionPopup } from './MealDescriptionPopup';

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

    const [curMeal, setCurMeal] = useState<Meal>();

    let ingradientList: string[] = [];
    const findIngradients = () => {
        for (let i = 1; i <= 20; i++) {
            ingradientList.push(`strIngredient${i}`)
        }
    }
    findIngradients();

    let measureList: string[] = [];
    const findMeasure = () => {
        for (let i = 1; i <= 20; i++) {
            measureList.push(`strMeasure${i}`)
        }
    }
    findMeasure();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [meals, setMeals] = useState<Meal[]>([]);
    useEffect(() => {
        const stored_slider_str: string | null = window.localStorage.getItem('slider_items');
        if (stored_slider_str != null) {
            const stored_slider = JSON.parse(stored_slider_str) as SliderStorage;
            const daysSinceUpdate = dateDiffInDays(new Date(stored_slider.last_update), new Date());
            if (daysSinceUpdate < 7) {
                setMeals(stored_slider.items);
                return;
            }
        }

        MealDbApi.getRandomSelection().then(result => {
            setMeals(result);
            var date = new Date();
            date.setDate(date.getDate());
            var storage_item: SliderStorage = {
                items: result,
                last_update: date.toString()
            }
            window.localStorage.setItem('slider_items', JSON.stringify(storage_item))
        })

    }, []);
    return (
        <>
            <div className='d-flex justify-content-center margin-for-first'>
                <Carousel className='slider button-on-slick'>
                    {meals.map((meal, idx) => (
                        <Carousel.Item key={idx} style={ItemStyle}>
                            <SliderImage
                                src={meal.strMealThumb}
                                alt=""
                            />
                            <Carousel.Caption className='carousel-container'>
                                <h3>{meal.strMeal}</h3>
                                <Button className='Bootstrap-Button' variant="primary" onClick={() => {
                                    setCurMeal(meal);
                                    setShow(true);
                                }}>Taste!</Button>
                        </Carousel.Caption>
                    </Carousel.Item>
                    ))}
                </Carousel>
            </div>
            <MealDescriptionPopup
                curMeal={curMeal}
                handleClose={handleClose}
                show={show}
            />
            <hr className='line'></hr>
        </>
    )
}

export default Slider;