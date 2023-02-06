import { useEffect, useState, type FunctionComponent } from 'react';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { type Meal } from 'src/api/mealdb.service';
import { type MealsFilter, MealsLoader } from 'src/api/meals_loader.service';
import styled from 'styled-components';
import { Filter } from './Filter';
import { itemsPerLoad } from '../config/constants';
import BounceLoader from "react-spinners/BounceLoader";
import { MealDescriptionPopup } from './MealDescriptionPopup';
import { MealCard } from './Card';

const MealsList = styled.div`
    margin-top: 35px;
    gap: 2%;
    margin: 35px auto 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
`;

export const PopupYtLink = styled.a`
`;

const Cards: FunctionComponent = () => {

    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const [showLoadButton, setShowLoadButton] = useState(true);

    const [curMeal, setCurMeal] = useState<Meal>();

    const [searchFilters, setSearchFilters] = useState<MealsFilter>({
        name: '',
        area: '',
        category: '',
        ingredients: []
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const loadMoreMeals = () => {
        MealsLoader.TakeNext(itemsPerLoad, searchFilters).then(result => {
            setMeals([...meals, ...result]);
        });
    }
    useEffect(() => {
        setShowLoadButton(!MealsLoader.IsEnd() && !loading);
    }, [meals, loading]);
    useEffect(() => {
        MealsLoader.TakeNext(itemsPerLoad, searchFilters).then(result => {
            if (result != null) setMeals(result)
            setLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const meal = meals.map((m, idx) =>
        <MealCard
            key={idx}
            meal={m}
            setCurMeal={setCurMeal}
            setShow={setShow}
        />
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
                    <MealDescriptionPopup
                        show={show}
                        handleClose={handleClose}
                        curMeal={curMeal}
                    />
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
