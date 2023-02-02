import React, { useEffect, useState, type FunctionComponent } from 'react'
import {type Meal } from 'src/api/mealdb.service';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MealsLoader } from 'src/api/meals_loader.service';

const SliderImage = styled.img`
    display: block;
    height: 180px;
`;

const ItemWrapper = styled.div`
     flex: 30%;
     display: flex;
     justify-content: center;
     margin-bottom: 36px;
`;

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
    overflow: hidden;
`;

const PopupYtLink = styled.a`
`;

const ModalFirstDiv = styled.div`
    display: flex;
    gap: 20px;
`;

const ModalSecondDiv = styled.div`
    display: flex;
    gap: 0 20px;
`;

const itemsPerLoad = 6;

const Cards: FunctionComponent = () => {

    const [meals, setMeals] = useState<Meal[]>([]);
    const [showLoadButton, setShowLoadButton] = useState(true);
    const [curMeal, setCurMeal] = useState<Meal>();
    const [curMealImg, setCurMealImg] = useState('');
    const [curMealLink, setCurMealLink] = useState('');

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
        <>
        <ItemWrapper>
            <Item key={idx} className='meal'>
                <SliderImage
                    src={m.strMealThumb}
                    alt=""
                />
                <RecipeContent>
                    <RecipeName>{m.strMeal}</RecipeName>
                    <Button
                        className='Bootstrap-Button meal-select' 
                        onClick={() => {
                            setCurMeal(m);
                            setShow(true);
                            setCurMealImg(m.strMealThumb);
                            setCurMealLink(m.strYoutube);
                        }}>
                            Taste!
                        </Button>
                </RecipeContent>
            </Item>
        </ItemWrapper>
        </> 
    );
    return (
        <div className="d-flex flex-column justify-content-center">
            <MealsList>
                {meal}
                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{curMeal?.strMeal}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid">
                        <ModalFirstDiv>
                            <SliderImage src={curMealImg} alt="" />
                            <div>
                                <p>Category: {curMeal?.strCategory || 'none'}</p>
                                <p>DrinkAlternate: {curMeal?.strDrinkAlternate || 'none'}</p>
                                <p>Area: {curMeal?.strArea || 'none'}</p>
                                <p>Tags: {curMeal?.strTags || 'none'}</p>
                                <p>Youtube: <PopupYtLink href={curMealLink}>{curMealLink || 'none'}</PopupYtLink></p>
                            </div>
                        </ModalFirstDiv>
                        <ModalSecondDiv>
                            <div>
                                {ingradientList.map((ingradient: string) => (
                                    <p>{curMeal?.[ingradient] || ''}</p>
                                ))}
                            </div>
                            <div>
                                {measureList.map((measure: string) => (
                                    <p>{curMeal?.[measure] || ''}</p>
                                ))}
                            </div>
                        </ModalSecondDiv>
                        <div>
                            <p>{curMeal?.strInstructions}</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </MealsList>
            {showLoadButton &&
                <Button variant="primary" className='Load-more-button' onClick={loadMoreMeals}>Load More</Button>}
        </div>
    );
}

export default Cards;