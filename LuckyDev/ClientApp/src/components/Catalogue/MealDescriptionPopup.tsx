import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { type Meal } from 'src/api/mealdb.service';
import { isLoggedIn } from 'src/utils/storage';
import styled from 'styled-components';
import { PopupYtLink } from './Cards';
import { UserApi } from 'src/api/user.service';
import ImagePlaceholder from '../../assets/images/img-placeholder.png';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { errorToastOptions, successToastOptions } from 'src/config/toastify.config';
export type MealDescriptionPopupProps = {
    show: boolean,
    handleClose: () => void,
    curMeal: Meal | undefined,
}

const Instructions = styled.span`
    white-space: pre-wrap;
`;

const IngredientSpan = styled.span`
    padding-left: 3%;
`;

export function MealDescriptionPopup(
    { show, handleClose, curMeal }: MealDescriptionPopupProps) {
    if (curMeal === undefined) return null;
    var ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient: string = (curMeal as any)[`strIngredient${i}`];
        if (ingredient !== null && ingredient !== "" && ingredient !== undefined) {
            const measure: string = (curMeal as any)[`strMeasure${i}`];
            ingredients.push(
                <Row key={i}>
                    <Col>
                        <Form.Check label={ingredient} className='ms-3' />
                    </Col>
                    <Col>
                        <IngredientSpan>{measure}</IngredientSpan>
                    </Col>
                </Row>
            )
        }
    }

    const SaveMealButton = <Button variant="primary" onClick={() => {
        toast.info("Sending request...", successToastOptions);
        UserApi.SaveMeal(curMeal.idMeal).then(result => {
            console.log(result);
            if (result?.status === 200) toast.success("Meal saved", successToastOptions);
            else if (result?.status === 409) toast.error("Meal is already saved", errorToastOptions);
            else toast.error(`Error:${result?.status}`);
            handleClose();
        });
        // handleClose();
    }} className='Bootstrap-Button'>
        Save to my list
    </Button>;
    const LoginButton = <Button variant='primary' onClick={()=>window.location.href='/auth/login'}>Login to save</Button>

    return <Modal show={show} onHide={handleClose} size="lg" className='popup'>
        <Modal.Header closeButton>
            <Modal.Title>{curMeal?.strMeal}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='show-grid'>
            <div className='modal-div'>
                <div className='left'><img src={curMeal.strMealThumb === '' ? ImagePlaceholder : curMeal.strMealThumb} alt="" className='popup-image' /></div>
                <div className='right'>
                    <div className='info'><span>Category: <b>{curMeal?.strCategory === '' ? 'none' : curMeal.strCategory}</b></span></div>
                    <div className='info'><span>Area: <b>{curMeal?.strArea === '' ? 'none' : curMeal.strArea}</b></span></div>
                    {curMeal.strYoutube && <div className='info' style={{ overflow: 'hidden' }}><span>Youtube: <PopupYtLink href={curMeal.strYoutube}>{curMeal.strYoutube || 'none'}</PopupYtLink></span></div>}
                </div>
            </div>
            {ingredients.length !== 0 && <><h3>Ingredients</h3>
                <Container className='modal-ingredients info'>
                    {ingredients}
                </Container></>}
            <h3>Instructions</h3>
            <div className='info'>
                <Instructions>{curMeal?.strInstructions}</Instructions>
            </div>
        </Modal.Body>
        <Modal.Footer>
            {!isLoggedIn() && LoginButton }
            {isLoggedIn() && curMeal.custom !== true && SaveMealButton}
        </Modal.Footer>
    </Modal>;
}
