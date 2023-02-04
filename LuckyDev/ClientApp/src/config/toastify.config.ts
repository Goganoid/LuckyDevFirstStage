import { type ToastContainerProps, type ToastOptions } from 'react-toastify';


const toastifyProps: ToastContainerProps = {
  autoClose: 1500,
  draggable: false,
  newestOnTop: true,
  theme: 'colored',
  position: 'top-center'
};


const errorToastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  progress:undefined,
  draggable: false,
  theme: "colored",
};



export {
  toastifyProps,
  errorToastOptions
};
