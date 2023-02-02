//@ts-nocheck
import React, { useEffect, useState, useMemo, type FunctionComponent } from 'react'
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

const itemsPerLoad = 6;

const Cards: FunctionComponent = () => {

    const [meals, setMeals] = useState<Meal[]>([]);
    const [showLoadButton, setShowLoadButton] = useState(true);
    const [curMeal, setCurMeal] = useState<Meal>();
    const [curMealImg, setCurMealImg] = useState('');
    const [curMealLink, setCurMealLink] = useState('');
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedArea, setSelectedArea] = useState();
    const [searchedFilter, setSearchedFilter] = useState();

    function handleCategoryChange(event: any) {
        setSelectedCategory(event.target.value);
    };
    function handleAreaChange(event: any) {
        setSelectedArea(event.target.value);
    };
    function handleSearchChange(event: any){
        setSearchedFilter(event.target.value.toLowerCase());
    };

    function getFilteredList() {
        if (!selectedCategory && !selectedArea && !searchedFilter) {
          return meals;
        }
        if (!selectedCategory && !selectedArea) {
            return meals.filter((item) => 
            item.strMeal.toLowerCase().includes(searchedFilter)
            );
        }
        if (!selectedCategory && !searchedFilter) {
            return meals.filter((item) => 
            item.strArea === selectedArea
            );
        }
        if (!selectedArea && !searchedFilter) {
            return meals.filter((item) => 
            item.strCategory === selectedCategory
            );
        }
        if (!selectedArea) {
            return meals.filter((item) => 
            item.strCategory === selectedCategory &&
            item.strMeal.toLowerCase().includes(searchedFilter)
            );
        }
        if (!searchedFilter) {
            return meals.filter((item) => 
            item.strCategory === selectedCategory && 
            item.strArea === selectedArea
            );
        }
        if (!selectedCategory) {
            return meals.filter((item) => 
            item.strArea === selectedArea &&
            item.strMeal.toLowerCase().includes(searchedFilter)
            );
        }
        return meals.filter((item) => 
        item.strCategory === selectedCategory && 
        item.strArea === selectedArea &&
        item.strMeal.toLowerCase().includes(searchedFilter)
        );
    };

    let filteredList = useMemo(getFilteredList, [selectedCategory, selectedArea, searchedFilter, meals]);

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
    const meal = filteredList.map((m, idx) =>
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
                <div className="m-auto">
                    <div className="search-text">Search:</div>
                    <input id="search-box" onChange={handleSearchChange} />
                    <div>Filter by Category:</div>
                    <div>
                        <select
                            name="category-list"
                            id="category-list"
                            onChange={handleCategoryChange}
                        >
                            <option value="">All</option>
                            <option value="Beef">Beef</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Chicken">Chicken</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Goat">Goat</option>
                            <option value="Lamb">Lamb</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Pork">Pork</option>
                            <option value="Seafood">Seafood</option>
                            <option value="Side">Side</option>
                            <option value="Starter">Starter</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Vegetarian">Vegetarian</option>
                        </select>
                    </div>
                    <div>Filter by Area:</div>
                    <div>
                        <select
                            name="area-list"
                            id="area-list"
                            onChange={handleAreaChange}
                        >
                            <option value="">All</option>
                            <option value="American">American</option>
                            <option value="British">British</option>
                            <option value="Canadian">Canadian</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Croatian">Croatian</option>
                            <option value="Dutch">Dutch</option>
                            <option value="Egyptian">Egyptian</option>
                            <option value="French">French</option>
                            <option value="Greek">Greek</option>
                            <option value="Indian">Indian</option>
                            <option value="Irish">Irish</option>
                            <option value="Italian">Italian</option>
                            <option value="Jamaican">Jamaican</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Kenyan">Kenyan</option>
                            <option value="Malaysian">Malaysian</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Moroccan">Moroccan</option>
                            <option value="Polish">Polish</option>
                            <option value="Portuguese">Portuguese</option>
                            <option value="Russian">Russian</option>
                            <option value="Spanish">Spanish</option>
                            <option value="Thai">Thai</option>
                            <option value="Tunisian">Tunisian</option>
                            <option value="Turkish">Turkish</option>
                            <option value="Unknown">Unknown</option>
                            <option value="Vietnamese">Vietnamese</option>
                        </select>
                    </div>
                </div>
            <MealsList>
                {meal.length ? meal : <h3>No Matches</h3>}
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
                        <h3>Ingredients</h3>
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
                        <h3>Instruction</h3>
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