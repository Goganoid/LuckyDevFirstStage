import { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
  }
from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { AuthApi } from 'src/api/auth.service';

export default function Loginmain() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
    setSubmitted(false);
  }

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
    setSubmitted(false);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    AuthApi.Login(email, password).then(response => {
      setEmail('');
      setPassword('');
      setSubmitted(true);
      setError(false);
    }).catch(error => {
      setSubmitted(false);
      setError(true);
    })

  };
  
  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <Alert key={'success'} variant={'success'}>Login completed successfully</Alert>
      </div>
    );
  };
  
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <Alert key={'danger'} variant={'danger'}>Error! Incorrect email or password</Alert>
      </div>
    );
  };

  return (
  <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
    <div className='mask gradient-custom-3'></div>
    <MDBCard className='m-5' style={{maxWidth: '600px'}}>
      <MDBCardBody className='px-5'>
        <h2 className="text-uppercase text-center mb-5">Sign in your account</h2>
        <MDBInput onChange={handleEmail} value={email} wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email'/>
        <MDBInput onChange={handlePassword} value={password} wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password'/>
        <MDBBtn onClick={handleSubmit} className='mb-4 w-100 gradient-custom-4' size='lg'>Sign in</MDBBtn>
        <h6 className="text-uppercase text-center mb-5">Don't have an account? <Link to="/auth/register">register</Link></h6>
        <div>
            {errorMessage()}
            {successMessage()}
        </div>
      </MDBCardBody>
    </MDBCard>
  </MDBContainer>
  )
};