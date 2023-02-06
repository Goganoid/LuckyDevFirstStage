import type { FunctionComponent } from 'react';
import { RouterProvider } from 'react-router-dom';
import { UserApi } from './api/user.service';
import './assets/style/scss/site.scss';
import router from './config/routes.config';


const App: FunctionComponent = () => {
  UserApi.Ping().then(result => {
    console.log("Response", result?.status);
  })
  return (
    <RouterProvider router={router} />
  );
};

export default App;