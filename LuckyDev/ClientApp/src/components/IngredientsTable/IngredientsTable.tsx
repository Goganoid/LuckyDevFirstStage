import React, { useContext } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { UserApi } from 'src/api/user.service';
import { successToastOptions } from 'src/config/toastify.config';
import { UserContext } from 'src/pages/Userpage'


export const IngredientsTable = () => {
    const userContext = useContext(UserContext);

    const handleRemove = (ingredientName: string) => {
        UserApi.DeleteIngredient(ingredientName).then(result => {
            console.log(result);
            if (result?.status === 200) {
              userContext?.setUserProfile({
                info: userContext.info,
                ingredients: userContext.ingredients.filter(i=>i.name!==ingredientName),
                meals: userContext.meals
              })
            }
          });
    }
    const handleUpdateMeasure = (idx: number) => {
        UserApi.UpdateIngredient(userContext?.ingredients[idx]!).then(result => {
            if (result?.status === 200) {
                toast.success("Updated", successToastOptions);
            }
        })
    };
    const handleChangeMeasure = (idx: number, value: string)=>{
        let copy = [...userContext?.ingredients!];
        copy[idx].measure = value;
        userContext?.setUserProfile({
            info: userContext.info,
            ingredients: copy,
            meals: userContext.meals
        })
    }
    return (
        <Container className='mt-3' >
            {userContext?.ingredients.length===0 && <p>Empty :(</p> }
            {userContext?.ingredients.map((ingredient,idx) => {
                return (
                    <Row key={idx} className='ingredients-table'>
                        <Col className='ingredient-name'>{ingredient.name}</Col>
                        <Col className='ingredient-count'><input type="text" className='d-block w-100' 
                            value={ingredient.measure || ''} placeholder='Write count here...'
                            onChange={(event) => handleChangeMeasure(idx, event.target.value)} /></Col>
                        <Col className='ingredient-buttons'>
                            <Button variant='primary' className='ms-3 Bootstrap-Button-white'
                                onClick={() => handleRemove(ingredient.name)}>Remove</Button>
                            <Button variant='primary' className='ms-3 Bootstrap-Button'
                                onClick={() => handleUpdateMeasure(idx)}>Save Changes</Button>
                        </Col>
                    </Row>
                )
            })}
        </Container>
    )
}
