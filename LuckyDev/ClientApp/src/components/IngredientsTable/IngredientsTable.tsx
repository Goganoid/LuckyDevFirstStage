import React, { useContext } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { UserApi } from 'src/api/user.service';
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

    return (
        <Container>
            {userContext?.ingredients.length===0 && <p>Empty :(</p> }
            {userContext?.ingredients.map((ingredient,idx) => {
                return (
                    <Row key={idx}>
                        <Col>{ingredient.name}</Col>
                        <Col><Button variant='primary' onClick={()=>handleRemove(ingredient.name)}>Remove</Button></Col>
                    </Row>
                )
            })}
        </Container>
    )
}
