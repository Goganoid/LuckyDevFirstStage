import { createBrowserRouter } from 'react-router-dom';
import AuthWrapper from 'src/pages/AuthWrapper';
import Userpage from 'src/pages/Userpage';
import { Catalogue } from '../pages/Catalogue';
import Layout from '../pages/Layout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Logout from 'src/pages/Logout';

const router = createBrowserRouter([
  // layout wrapper
  // pages that require header and footer should go here
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Catalogue />
      },
      { 
        path:'user',
        element: <Userpage />
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
      },
      {
        path: 'logout',
        element: <Logout/>
      },
    ]
  },
]);

export default router;