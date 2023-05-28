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
import { google, login } from '../redux/fetaures/authSlice';
import { GoogleLogin } from 'react-google-login';
import { render } from '@testing-library/react';

const Login = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
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
    dispatch(login({ inputValue, navigate, toast }));
  };
  const googleSuccess = (res) => {
    const email = res?.profileObj?.email;
    const name = res?.profileObj?.name;
    const googleId = res?.googleId;
    const token = res?.tokenId;
    const result = { email, name, googleId, token };
    dispatch(google(result));
  };
  const googleFailure = (err) => {
    console.log(err);
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
            <div className='col-md-12'>
              <MDBInput
                label='Email'
                type='email'
                value={inputValue.email}
                name='email'
                onChange={handleInputChange}
                required
                oninvalid
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
                oninvalid
                validation='Please provide password'
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
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <GoogleLogin
            clientId='938515353970-v7lnmba5a9ear4k1p8k8snmv4bi3astl.apps.googleusercontent.com'
            render={(renderProps) => (
              <MDBBtn
                style={{ width: '100%', marginTop: '10px', cursor: 'pointer' }}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}>
                <MDBIcon
                  className='me-2'
                  fab
                  icon='google'
                  style={{ marginRight: '5px' }}
                />
                Google Sign In
              </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
        </MDBCardBody>
        <MDBCardFooter>
          <Link to='/register'>
            <p>Don't have an account? Signup</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
