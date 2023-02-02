import type { FunctionComponent } from 'react';
import { Cards, Slider } from '../components';

export const Catalogue: FunctionComponent = () => {
    return (
        <>
            <Slider />
            <Cards />
        </>
    );
}