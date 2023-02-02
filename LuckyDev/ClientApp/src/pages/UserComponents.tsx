import type { FunctionComponent } from 'react';
import { TitleUser, MyIngradients, MyRecipes, SavedRecipes } from '../components/UserPage';

export const UserComponents: FunctionComponent = () => {
    return (
        <>
            <TitleUser />
            <MyIngradients />
            <MyRecipes />
            <SavedRecipes />
        </>
    );
}