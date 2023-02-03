import {
  MDBBtn, MDBCard,
  MDBCardBody, MDBContainer, MDBInput
} from 'mdb-react-ui-kit';
import { Alert } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthApi } from 'src/api/auth.service';

export default function Registermain() {
  const [name1, setFirstName] = useState('');
  const [name2, setSecondName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');


  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  
  // Handling the first name change
  const handleFirstName = (e: any) => {
    setFirstName(e.target.value);
    setSubmitted(false);
  };

    // Handling the second name change
  const handleSecondName = (e: any) => {
    setSecondName(e.target.value);
    setSubmitted(false);
  };
  
  // Handling the email change
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
  
  // Handling the password1 change
  const handlePassword1 = (e: any) => {
    setPassword1(e.target.value);
    setSubmitted(false);
  };

  // Handling the password2 change
  const handlePassword2 = (e: any) => {
    setPassword2(e.target.value);
    setSubmitted(false);
  };
  
  // Handling the form submission
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (password1 !== password2) {
      setError(true)
    } else {
      AuthApi.Register(name1, name2, email, password1).then(response => {
          setFirstName('');
          setSecondName('');
          setEmail('');
          setPassword1('');
          setPassword2('');
          setSubmitted(true);
          setError(false);
      }).catch(error => {
        setSubmitted(false);
        setError(true);
      })
    }
  };
  
  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <Alert key={'success'} variant={'success'}>Registration completed successfully</Alert>
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
        <h2 className="text-uppercase text-center mb-5">Create an account</h2>
        <MDBInput onChange={handleFirstName} value={name1} wrapperClass='mb-4' label='Your first name' size='lg' id='form1' type='text'/>
        <MDBInput onChange={handleSecondName} value={name2} wrapperClass='mb-4' label='Your last name' size='lg' id='form2' type='text'/>
        <MDBInput onChange={handleEmail} value={email} wrapperClass='mb-4' label='Your Email' size='lg' id='form3' type='email'/>
        <MDBInput onChange={handlePassword1} value={password1} wrapperClass='mb-4' label='Password' size='lg' id='form4' type='password'/>
        <MDBInput onChange={handlePassword2} value={password2} wrapperClass='mb-4' label='Repeat your password' size='lg' id='form5' type='password'/>
        <MDBBtn onClick={handleSubmit} className='mb-4 w-100 gradient-custom-4' size='lg'>Register</MDBBtn>
        <h6 className="text-uppercase text-center mb-5">Already have an account? <Link to="/auth/login">login</Link></h6>
        <div>
            {errorMessage()}
            {successMessage()}
        </div>
      </MDBCardBody>
    </MDBCard>
  </MDBContainer>
  )
};


