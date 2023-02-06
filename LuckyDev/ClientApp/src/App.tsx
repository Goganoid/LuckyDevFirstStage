import { useEffect, type FunctionComponent } from 'react';
import { RouterProvider } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserApi } from './api/user.service';
import './assets/style/scss/site.scss';
import router from './config/routes.config';
import { apiToastOptions } from './config/toastify.config';
import { dateDiffInHours } from './utils/dateDiff';


const App: FunctionComponent = () => {

  useEffect(() => {
    const init_str = localStorage.getItem("init");
    if (init_str != null) {
      const hoursSinceUpdate = dateDiffInHours(new Date(init_str), new Date());
      if (hoursSinceUpdate < 2) {
        return;
      }
    }
    toast.warning("Server is warming up. Please wait...", apiToastOptions);
    UserApi.Ping().then(result => {
      if (result?.status === 200) {
        toast.success("Server is active", apiToastOptions);
        localStorage.setItem("init",Date().toString());
      }
    })
  }, [])

  return (
    <RouterProvider router={router} />
  );
};

export default App;