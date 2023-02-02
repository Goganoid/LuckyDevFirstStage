import { createBrowserRouter } from 'react-router-dom';
import AuthWrapper from 'src/pages/AuthWrapper';
import { Catalogue } from '../pages/Catalogue';
import Layout from '../pages/Layout';
import Login from '../pages/Login';
import Register from '../pages/Register';


const router = createBrowserRouter([
  // layout wrapper
  // pages that require header and footer should go here
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element:<Catalogue/>
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthWrapper />,
    children: [
      {
        path: 'register',
        element: <Register/>
      },
      {
        path: 'login',
        element: <Login/>
      }
    ]
  }
]);

export default router;