import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { type Meal } from 'src/api/mealdb.service';
import styled from 'styled-components';
import { PopupYtLink } from './Cards';

export type MealDescriptionPopupProps = {
    show: boolean,
    handleClose: () => void,
    curMeal: Meal | undefined,
}

const Instructions = styled.span`
    white-space: pre-wrap;
`

const IngredientSpan = styled.span`
    padding-left: 3%;
`;

export function MealDescriptionPopup(
    { show, handleClose, curMeal }: MealDescriptionPopupProps) {
    
    if (curMeal === undefined) return;
    var ingredients = [];
    for (let i = 1; i <= 20; i++){
        const ingredient: string = (curMeal as any)[`strIngredient${i}`];
        if (ingredient !== null && ingredient!=="") {
            const measure: string = (curMeal as any)[`strMeasure${i}`];
            ingredients.push(
                <Row>
                    <Col>
                        <IngredientSpan>{ingredient}</IngredientSpan>
                    </Col>
                    <Col>
                        <IngredientSpan>{measure}</IngredientSpan>
                    </Col>
                </Row>
            )
        }
    }

    return <Modal show={show} onHide={handleClose} size="lg" className='popup'>
        <Modal.Header closeButton>
            <Modal.Title>{curMeal?.strMeal}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='show-grid'>
            <div className='modal-div'>
                <img src={curMeal.strMealThumb} alt="" className='popup-image' />
                <div style={{ width: 'calc(100% - 300px)' }}>
                    <div className='info'><span>Category: {curMeal?.strCategory || 'none'}</span></div>
                    <div className='info'><span>DrinkAlternate: {curMeal?.strDrinkAlternate || 'none'}</span></div>
                    <div className='info'><span>Area: {curMeal?.strArea || 'none'}</span></div>
                    <div className='info'><span>Tags: {curMeal?.strTags || 'none'}</span></div>
                    {curMeal.strYoutube && <div className='info' style={{ overflow: 'hidden' }}><span>Youtube: <PopupYtLink href={curMeal.strYoutube}>{curMeal.strYoutube || 'none'}</PopupYtLink></span></div>}
                </div>
            </div>
            <h3>Ingredients</h3>
            <Container className='modal-div info'>
                {ingredients}
            </Container>
            <h3>Instructions</h3>
            <div className='info'>
                <Instructions>{curMeal?.strInstructions}</Instructions>
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
    </Modal>;
}
