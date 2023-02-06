import type { FunctionComponent } from 'react';
import Slider  from 'src/components/Catalogue/Slider';
import Cards from 'src/components/Catalogue/Cards';

export const Catalogue: FunctionComponent = () => {
    return (
        <>
            <Slider />
            <Cards />
        </>
    );
}