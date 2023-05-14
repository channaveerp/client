import React, { useState, useEffect } from 'react';

import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBSpinner,
  MDBIcon,
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/fetaures/authSlice';

const Register = () => {
  const [inputValue, setInputValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  console.log('error:', error);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleformsubmit = (e) => {
    e.preventDefault();
    if (inputValue.password !== inputValue.confirmPassword) {
      return toast.error('Password should be match');
    }
    if (
      inputValue.email &&
      inputValue.password &&
      inputValue.confirmPassword &&
      inputValue.firstName &&
      inputValue.lastName
    ) {
      dispatch(register({ inputValue, navigate, toast }));
    }
  };

  return (
    <div
      style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '450px',
        alignItems: 'center',
        marginTop: '120px',
      }}>
      <MDBCard alignment='center'>
        <MDBIcon fas icon='user-circle' className='fa-2x' />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation
            onSubmit={handleformsubmit}
            noValidate
            className='row g-3'>
            <div className='col-md-6'>
              <MDBInput
                label='firstName'
                type='text'
                value={inputValue.firstName}
                name='firstName'
                onChange={handleInputChange}
                required
                invalid
                validation='Please provide firstname'
              />
            </div>
            <div className='col-md-6'>
              <MDBInput
                label='lastName'
                type='text'
                value={inputValue.lastName}
                name='lastName'
                onChange={handleInputChange}
                required
                invalid
                validation='Please provide lastname'
              />
            </div>
            <div className='col-md-12'>
              <MDBInput
                label='Email'
                type='email'
                value={inputValue.email}
                name='email'
                onChange={handleInputChange}
                required
                invalid
                validation='Please provide email address'
              />
            </div>
            <div className='col-md-12'>
              <MDBInput
                label='Password'
                type='password'
                value={inputValue.password}
                name='password'
                onChange={handleInputChange}
                required
                invalid
                validation='Please provide password'
              />
            </div>
            <div className='col-md-12'>
              <MDBInput
                label='confirmPassword'
                type='password'
                value={inputValue.confirmPassword}
                name='confirmPassword'
                onChange={handleInputChange}
                required
                invalid
                validation='Please provide confirmPassword'
              />
            </div>

            <div className='col-12'>
              <MDBBtn style={{ width: '100%' }} className='mt-2'>
                {loading && (
                  <MDBSpinner
                    size='sm'
                    role='status'
                    tag='span'
                    className='me-2'
                  />
                )}
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to='/login'>
            <p>Already have an account? login</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Register;
