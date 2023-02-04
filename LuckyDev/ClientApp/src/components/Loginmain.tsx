import {
  MDBCard,
  MDBCardBody, MDBContainer, MDBInput
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthApi } from 'src/api/auth.service';
import { errorToastOptions } from 'src/config/toastify.config';
import { setUserData } from 'src/utils/storage';

export default function Loginmain() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    AuthApi.Login(email, password).then(response => {
      console.log(response);
      setUserData(response.data.token, response.data.id);
      window.location.href = "/";
    }).catch(error => {
      console.log(error);
      const errorMessage = error?.response?.data.message;
      if (errorMessage)
        toast.error(`Error:${errorMessage}`, errorToastOptions);
      else
        toast.error(`Error:${error.code}`, errorToastOptions);
    })

  };
  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Sign in your account</h2>
          <MDBInput onChange={handleEmail} value={email} wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' />
          <MDBInput onChange={handlePassword} value={password} wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' />
          <Button onClick={handleSubmit} className='mb-4 w-100 Auth-Button' size='lg' variant='primary'>Sign in</Button>
          <h6 className="text-uppercase text-center mb-5">Don't have an account? <Link to="/auth/register">register</Link></h6>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
};