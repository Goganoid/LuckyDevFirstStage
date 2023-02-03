import type { FunctionComponent } from 'react';
import { TitleUser, MyIngradients, MyRecipes, SavedRecipes } from '../components';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 90vw;
    margin: 0 auto;
`;

export const UserComponents: FunctionComponent = () => {
    return (
        <Wrapper>
            <TitleUser />
            <MyIngradients />
            <MyRecipes />
            <SavedRecipes />
        </Wrapper>
    );
}