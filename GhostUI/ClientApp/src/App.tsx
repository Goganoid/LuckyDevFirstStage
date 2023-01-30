import type { FunctionComponent } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Routes as routes } from './config';
import Layout from './Layout';
import './assets/style/scss/site.scss'
const App: FunctionComponent = () => {
  const location = useLocation();

  return (
    <Layout>
          <Routes location={location}>
            {routes.map(({ path, Component }) => (
              <Route
                key={path}
                path={path}
                element={<Component />}
              />
            ))}
          </Routes>
    </Layout>
  );
};

export default App;