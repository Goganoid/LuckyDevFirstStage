import { Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './App';
import './assets/style/scss/site.scss';
import registerIcons from './config/fa.config';
import { toastifyProps } from './config/toastify.config';
import reportWebVitals from './reportWebVitals';

registerIcons();

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

function AppRenderer() {
  return (
    <Fragment>
      {/* <StrictMode> */}
        <App />
      {/* </StrictMode> */}
      <ToastContainer {...toastifyProps} />
    </Fragment>
  );
}

root.render(<AppRenderer />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

