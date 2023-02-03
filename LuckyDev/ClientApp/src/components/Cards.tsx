//@ts-nocheck
import React, { useEffect, useState, useMemo, type FunctionComponent } from 'react'
import {type Meal } from 'src/api/mealdb.service';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MealsLoader } from 'src/api/meals_loader.service';


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

const FilterMenu = styled.div`
    float: right;
    top: 85px;
    bottom: 18%;
    position: sticky;
    display: flex;
    width: 290px;
    background-color: #D6D6D6 !important;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 30px;
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
                <MealsList>
                {meal.length ? meal : <h3>No Matches</h3>}
                    <Modal show={show} onHide={handleClose} size="lg" className='popup'>
                        <Modal.Header closeButton>
                            <Modal.Title>{curMeal?.strMeal}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='show-grid'>
                            <div className='modal-div'>
                                <img src={curMealImg} alt="" className='popup-image'/>
                                <div style={{width: 'calc(100% - 300px)'}}>
                                    <div className='info'><span>Category: {curMeal?.strCategory || 'none'}</span></div>
                                    <div className='info'><span>DrinkAlternate: {curMeal?.strDrinkAlternate || 'none'}</span></div>
                                    <div className='info'><span>Area: {curMeal?.strArea || 'none'}</span></div>
                                    <div className='info'><span>Tags: {curMeal?.strTags || 'none'}</span></div>
                                    <div className='info' style={{overflow: 'hidden'}}><span>Youtube: <PopupYtLink href={curMealLink}>{curMealLink || 'none'}</PopupYtLink></span></div>
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
                </MealsList>
                {showLoadButton &&
                    <Button variant="primary" className='Load-more-button' onClick={loadMoreMeals}>Load More</Button>}
            </div>
            <div id='right'>
                <FilterMenu>
                    <form className='search-form'>
                        <input type="image" 
                            name="search" 
                            src='free-icon-magnifying-glass-126474.png' 
                            alt='x'>
                        </input>
                        <input name="search-line" placeholder="search"></input>

                        <h5>Category:</h5>
                        <input name="filter-line" placeholder="Category"></input>
                        <button className='filter-more'><img alt='>'></img></button>
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

                        <h5>DrinkAlternate:</h5>
                        <input name="filter-line" placeholder="DrinkAlternate"></input>
                        <button className='filter-more'><img alt='>'></img></button>

                        <h5>Area:</h5>
                        <input name="filter-line" placeholder="Area"></input>
                        <button className='filter-more'><img alt='>'></img></button>

                        <h5>Tags:</h5>
                        <input name="filter-line" placeholder="Tags"></input>
                        <button className='filter-more'><img alt='>'></img></button>
                        
                        <Button type='submit' className='Bootstrap-Button d-flex mt-4 mx-auto'>What can I cook with my products...</Button>
                    </form>
                </FilterMenu>
            </div>
        </div>
    );
}

export default Cards;