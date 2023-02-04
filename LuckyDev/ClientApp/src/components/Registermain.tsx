import { AxiosError } from 'axios';
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

export default function Registermain() {
  const [name1, setFirstName] = useState('');
  const [name2, setSecondName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');


  // Handling the first name change
  const handleFirstName = (e: any) => {
    setFirstName(e.target.value);
  };

  // Handling the second name change
  const handleSecondName = (e: any) => {
    setSecondName(e.target.value);
  };

  // Handling the email change
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  // Handling the password1 change
  const handlePassword1 = (e: any) => {
    setPassword1(e.target.value);
  };

  // Handling the password2 change
  const handlePassword2 = (e: any) => {
    setPassword2(e.target.value);
  };

  // Handling the form submission
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (password1 !== password2) {
      toast.error("Passwords don't match!", errorToastOptions);
    } else {
      AuthApi.Register(name1, name2, email, password1).then(response => {
        console.log(response);
        if (response.status === 200) {
           window.location.href = "login";
        }
      }).catch((error: AxiosError<any>) => {
        console.log(error);
        const errorMessage = error?.response?.data.message;
        if (errorMessage)
          toast.error(`Error:${errorMessage}`, errorToastOptions);
        else
          toast.error(`Error:${error.code}`, errorToastOptions);
      })
    }
  };
  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <MDBInput onChange={handleFirstName} value={name1} wrapperClass='mb-4' label='Your first name' size='lg' id='form1' type='text' />
          <MDBInput onChange={handleSecondName} value={name2} wrapperClass='mb-4' label='Your last name' size='lg' id='form2' type='text' />
          <MDBInput onChange={handleEmail} value={email} wrapperClass='mb-4' label='Your Email' size='lg' id='form3' type='email' />
          <MDBInput onChange={handlePassword1} value={password1} wrapperClass='mb-4' label='Password' size='lg' id='form4' type='password' />
          <MDBInput onChange={handlePassword2} value={password2} wrapperClass='mb-4' label='Repeat your password' size='lg' id='form5' type='password' />
          <Button onClick={handleSubmit} className='mb-4 w-100 Auth-Button' size='lg' variant="primary">Register</Button>
          <h6 className="text-uppercase text-center mb-5">Already have an account? <Link to="/auth/login">login</Link></h6>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
};


