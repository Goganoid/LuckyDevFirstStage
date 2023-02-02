import type { FunctionComponent } from 'react';
import { RouterProvider } from 'react-router-dom';
import './assets/style/scss/site.scss';
import router from './config/routes.config';


const App: FunctionComponent = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;