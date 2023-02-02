import type { FunctionComponent } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
  }
from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const Loginmain: FunctionComponent = () => (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
    <div className='mask gradient-custom-3'></div>
    <MDBCard className='m-5' style={{maxWidth: '600px'}}>
      <MDBCardBody className='px-5'>
        <h2 className="text-uppercase text-center mb-5">Sign in your account</h2>
        <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email'/>
        <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password'/>
        <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg'>Sign in</MDBBtn>
        <h6 className="text-uppercase text-center mb-5">Don't have an account? <Link to="/auth/register">register</Link></h6>
      </MDBCardBody>
    </MDBCard>
  </MDBContainer>
);

export default Loginmain;