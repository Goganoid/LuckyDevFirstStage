//@ts-nocheck
import { useEffect, useState, type FunctionComponent } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container } from 'react-bootstrap';
import { type Meal } from 'src/api/mealdb.service';
import { MealsFilter, MealsLoader } from 'src/api/meals_loader.service';
import styled from 'styled-components';
import { Filter } from './Filter';
import { itemsPerLoad } from '../config/constants';
import BounceLoader from "react-spinners/BounceLoader";

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
    font-size: 20px;
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









const Cards: FunctionComponent = () => {

    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const [showLoadButton, setShowLoadButton] = useState(true);

    const [curMeal, setCurMeal] = useState<Meal>();
    const [curMealImg, setCurMealImg] = useState('');
    const [curMealLink, setCurMealLink] = useState('');

    const [searchFilters, setSearchFilters] = useState<MealsFilter>({
        name: '',
        area: '',
        category: '',
        ingredients: []
    })


    let ingradientList: string[] = [];
    const findIngradients = () => {
        for (let i = 1; i <= 20; i++) {
            if (`strMeasure${i}` !== '')
                ingradientList.push(`strIngredient${i}`)
        }
    }
    findIngradients();

    let measureList: string[] = [];
    const findMeasure = () => {
        for (let i = 1; i <= 20; i++) {
            if (`strMeasure${i}` !== '')
                measureList.push(`strMeasure${i}`)
        }
    }
    findMeasure();

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
            console.log(result);
            if (result != null) setMeals(result)
            setLoading(false);
        })
    }, []);
    const meal = meals.map((m, idx) =>
        <>
            <ItemWrapper>
                <Item key={idx} className='meal'>
                    <img
                        src={m.strMealThumb}
                        alt=""
                        height={180}
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
                    <Modal show={show} onHide={handleClose} size="lg" className='popup'>
                        <Modal.Header closeButton>
                            <Modal.Title>{curMeal?.strMeal}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='show-grid'>
                            <div className='modal-div'>
                                <img src={curMealImg} alt="" className='popup-image' />
                                <div style={{ width: 'calc(100% - 300px)' }}>
                                    <div className='info'><span>Category: {curMeal?.strCategory || 'none'}</span></div>
                                    <div className='info'><span>DrinkAlternate: {curMeal?.strDrinkAlternate || 'none'}</span></div>
                                    <div className='info'><span>Area: {curMeal?.strArea || 'none'}</span></div>
                                    <div className='info'><span>Tags: {curMeal?.strTags || 'none'}</span></div>
                                    <div className='info' style={{ overflow: 'hidden' }}><span>Youtube: <PopupYtLink href={curMealLink}>{curMealLink || 'none'}</PopupYtLink></span></div>
                                </div>
                            </div>
                            <h3>Ingredients</h3>
                            <div className='modal-div info'>
                                <div>
                                    {ingradientList.map((ingradient: string) => (
                                        <span>{curMeal?.[ingradient] || ''}</span>
                                    ))}
                                </div>
                                <div>
                                    {measureList.map((measure: string) => (
                                        <span>{curMeal?.[measure] || ''}</span>
                                    ))}
                                </div>
                            </div>
                            <h3>Instruction</h3>
                            <div className='info'>
                                <span>{curMeal?.strInstructions}</span>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} className='Bootstrap-Button-white'>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleClose} className='Bootstrap-Button'>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
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


