import { AxiosError } from 'axios';
import { useContext, useState, type ChangeEvent } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { UserApi, type UserCustomMeal } from 'src/api/user.service';
import { areaOptions, categoryOptions, convertToFilterList, ingredientOptions } from 'src/config/constants';
import { errorToastOptions, successToastOptions } from 'src/config/toastify.config';
import { isFileImage } from 'src/utils/isFileImage';
import styled from 'styled-components';
import { UserContext } from 'src/pages/Userpage';
export type MealDescriptionPopupProps = {
    show: boolean,
    handleClose: () => void,
}

const Instructions = styled.span`
    white-space: pre-wrap;
`


export function CreateRecipePopup({ show, handleClose }: MealDescriptionPopupProps) {
    const userContext = useContext(UserContext)!;
    const [newRecipe, setNewRecipe] = useState<UserCustomMeal>({
        name: '',
        image: '',
        area: '',
        category: '',
        ingredients: [],
        instructions: ''
    });

    const [selectedIngredient, setSelectedIngredient] = useState('');

    function handleInputsChange(e: any) {
        const value = e.target.value;
        setNewRecipe({
            ...newRecipe,
            [e.target.name]: value
        });
    };
    function handleAreaChange(e: any) {
        const value = e.value;
        setNewRecipe({
            ...newRecipe,
            area: value
        });
    };
    function handleCategoryChange(e: any) {
        const value = e.value;
        setNewRecipe({
            ...newRecipe,
            category: value
        });
    };



    const handleAddIngredient = () => {
        setNewRecipe({
            ...newRecipe,
            ingredients: [...newRecipe.ingredients, { name: selectedIngredient, measure: '' }]
        })
    };

    const handleRemoveIngredient = (idx: number) => {
        let copy = [...newRecipe.ingredients];
        copy.splice(idx, 1);
        setNewRecipe({ ...newRecipe, ingredients: copy });
    }

    const handleChangeMeasure = (idx: number, value: string) => {
        let copy = [...newRecipe.ingredients];
        copy[idx].measure = value;
        setNewRecipe({ ...newRecipe, ingredients: copy });
    }

    const handleAddImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files != null && event.target.files.length > 0) {
            let file = event.target.files[0];
            if (file.size > 2_000_000) {
                toast.error("Image size must less than 2Mb", errorToastOptions);
                event.target.files = null;
                return;
            }
            else if (!isFileImage(file)) {
                toast.error("File is not an image", errorToastOptions);
                event.target.files = null;
                return;
            }
            else {
                let reader = new FileReader();
                reader.onloadend = () => {
                    setNewRecipe({
                        ...newRecipe,
                        image: reader.result! as string
                    })
                }
                reader.readAsDataURL(file);
            }
        }
    }



    const Selector = <div className='d-inline-flex ms-3'>
        <Select
            options={convertToFilterList(ingredientOptions)}
            isClearable={true}
            isSearchable={true}
            onChange={(newValue, { action }) => {
                if (action === 'select-option')
                    setSelectedIngredient(newValue?.value!);
                if (action === 'deselect-option' || action === 'clear')
                    setSelectedIngredient('');
            }} />
        <Button disabled={
            selectedIngredient === '' ||
            newRecipe.ingredients.some(i => i.name === selectedIngredient) ||
            newRecipe.ingredients.length>=20} onClick={handleAddIngredient}>Add</Button>
    </div>;



    return <Modal show={show} onHide={handleClose} size="lg" className='popup'>
        <Modal.Header closeButton>
            <Modal.Title>Your new recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body className='show-grid'>
            <div className='modal-div'>
                <div>
                    <div className='info'><span>Give your recipe a name.</span>
                        <input
                            name="name"
                            defaultValue={newRecipe.name}
                            type="text"
                            onChange={handleInputsChange}>
                        </input>
                    </div>
                    <div className='info'><span>Include a link to a photo of your dish.</span>
                        <input
                            name="imgSource"
                            type="file"
                            onChange={handleAddImage}
                        >
                        </input>
                        {newRecipe.image !== '' && <img width={180} src={newRecipe.image} alt="" />}
                    </div>
                    <div className='info'><span>What category does your recipe belong to?</span>
                        <Select
                            options={convertToFilterList(categoryOptions)}
                            isClearable={true}
                            isSearchable={true}
                            onChange={handleCategoryChange}
                        />
                    </div>
                    <div className='info'><span>What area does your recipe belong to?</span>
                        <Select
                            options={convertToFilterList(areaOptions)}
                            isClearable={true}
                            isSearchable={true}
                            onChange={handleAreaChange}
                        />
                    </div>
                </div>
            </div>
            <h3>List all the ingredients you need and their quantities</h3>
            <Container className='modal-div info'>
                <div className='info'><span>Ingredients:</span>
                    <Container className='d-flex flex-column'>
                        {newRecipe.ingredients.length === 0 && <p>Start adding ingredients to your recipe.</p>}
                        {newRecipe.ingredients.map((ingredient, idx) => (
                            <Row key={idx} className='mb-3'>
                                <Col>{ingredient.name}</Col>
                                <Col><input type="text" value={ingredient.measure || ''}
                                    onChange={(event) => handleChangeMeasure(idx, event.target.value)} /></Col>
                                <Col><Button variant='primary'
                                    onClick={() => handleRemoveIngredient(idx)}>Remove</Button></Col>
                            </Row>
                        ))}
                    </Container>
                    <div className='d-flex w-100'>
                        {Selector}
                    </div>
                </div>

            </Container>
            <h3>Write your recipe below</h3>
            <div className='info'>
                <Instructions>
                    <textarea
                        name='instructions'
                        defaultValue={newRecipe.instructions}
                        onChange={handleInputsChange}>
                    </textarea>
                </Instructions>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} className='Bootstrap-Button-white'>
                Close
            </Button>
            <Button
                variant="primary"
                onClick={() => {
                    console.log(newRecipe);
                    if (newRecipe.name === '') {
                        toast.error(`Name is empty`, errorToastOptions);
                        return;
                    }
                    UserApi.AddCustomMeal(newRecipe).then(result => {
                        console.log(result);
                        if (result?.status === 200) {
                            toast.success("Recipe added", successToastOptions);
                            userContext.setUserProfile({
                                info: userContext.info,
                                ingredients: userContext.ingredients,
                                meals: {
                                  userMeals: [...userContext.meals.userMeals,result.data],
                                  savedMealsIds:userContext.meals.savedMealsIds
                                }
                              })
                        }
                        else {
                            const errorMessage = result?.data;
                            if (errorMessage)
                                toast.error(`Error:${errorMessage}`, errorToastOptions);
                            else
                                toast.error(`Error:${result?.status}`, errorToastOptions);
                        }
                        handleClose();
                    }).catch((error: AxiosError<any>) => {
                        console.log(error);

                    })
                    
                }}
                className='Bootstrap-Button'>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>;
}
