import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { areaOptions, categoryOptions, convertToFilterList, ingredientOptions } from 'src/config/constants';
import styled from 'styled-components';

export type MealDescriptionPopupProps = {
    show: boolean,
    handleClose: () => void,
}

const Instructions = styled.span`
    white-space: pre-wrap;
`

const Input = ({name}) => {

    const [measure, setMeasure] = useState('');

    function measureChange(e: any) {
        setMeasure(e.target.value);
    }

    return (
    <div className='ingredient-wrapper'>
        <span>{name}</span>
        <input placeholder="Your quantities here" defaultValue={measure} onChange={measureChange} />;
    </div>
    )
};

export function CreateRecipePopup({ show, handleClose }: MealDescriptionPopupProps) {

    function getAllI() {
        const allWithClass = Array.from(
            document.getElementsByClassName('ingredient-wrapper')
        );
        console.log(allWithClass);
        allWithClass.forEach(e => {
            console.log(`name: ${e.children[0].innerHTML}; measure: ${e.children[1].defaultValue}`);
            // setNewRecipe({
            //     ...newRecipe,
            //     ...ingredients, [{name: e.children[0].innerHTML, measure: e.children[1].defaultValue}]
            // });
        });
    };

    const [inputList, setInputList] = useState([]);
    const onAddBtnClick = (event: any) => {
        setInputList(inputList.concat(<Input key={inputList.length} name={curIngredient} />));
    };

    const [curIngredient, setCurIngredient] = useState('');
    const [newRecipe, setNewRecipe] = useState({
        name: '',
        imgSource: '',
        linkSource: '',
        area: '',
        category: '',
        ingredients: [] as any[],
        instructions: ''
    });

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
    function handleIngradientsChange(e: any) {
        // const newIngradients = [];
        // for (let i = 0; i < e.length; i++) {
        //     newIngradients.push(e[i].value);
        // }
        // setNewRecipe({
        //     ...newRecipe,
        //     ingredients: newIngradients
        // });
        setCurIngredient(e.value);
    }

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
                            defaultValue={newRecipe.imgSource}
                            type="text"
                            onChange={handleInputsChange}>
                        </input>
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
                    <div className='info'><span>Include a link to the video guide for your recipe. (optional)</span>
                        <input
                            name="linkSource"
                            defaultValue={newRecipe.linkSource}
                            type="text"
                            onChange={handleInputsChange}>
                        </input>
                    </div>
                </div>
            </div>
            <h3>List all the ingredients you need and their quantities</h3>
            <Container className='modal-div info'>
                <div className='info'><span>Ingredients:</span>
                    <Container className='d-flex flex-column'>
                        <Row>
                            <Col>Ingredient 1</Col>
                            <Col><input type="text" value="450g" /></Col>
                            <Col>X</Col>
                        </Row>
                        <Row>
                            <Col>Ingredient 2</Col>
                            <Col><input type="text" value="450g" /> </Col>
                            <Col>X</Col>
                        </Row>
                        {inputList}
                    </Container>
                    <div className='d-flex w-100'>
                        <Select
                            options={convertToFilterList(ingredientOptions)}
                            isClearable={true}
                            isSearchable={true}
                            onChange={handleIngradientsChange}
                        />
                        <Button onClick={onAddBtnClick}>Add</Button>
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
                getAllI();
                console.log(newRecipe);
                handleClose();
            }} 
            className='Bootstrap-Button'>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>;
}
