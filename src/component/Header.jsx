import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
  MDBNavbarItem,
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../redux/fetaures/authSlice';
import { Box } from '@material-ui/core';
const Header = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));
  console.log('user:', user?.user?._id);

  const handleLogout = () => {
    dispatch(setLogout());
  };
  return (
    <MDBNavbar fixed='top' expand='lg' style={{ backgroundClip: '#f0e6ea' }}>
      <MDBContainer
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'baseline',
          gap: '100px',
        }}>
        <MDBNavbarBrand
          href='/'
          style={{ color: '#606080', fontWeight: '600', fontSize: '22px' }}>
          Touropedia
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation '
          onClick={() => setShow(!show)}>
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse
          show={show}
          navbar
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          {user?.user?._id && (
            <h5 style={{ marginRight: '30px', marginTop: '17px' }}>
              Logged-In as : {user?.user?.name}
            </h5>
          )}
          <MDBNavbarLink href='/' style={{ marginTop: '14px' }}>
            <p className='header-text'>Home</p>
          </MDBNavbarLink>
          {user?.user?._id && (
            <>
              {' '}
              <MDBNavbarLink href='/addTour' style={{ marginTop: '14px' }}>
                <p className='header-text'>Add Tour</p>
              </MDBNavbarLink>{' '}
              <MDBNavbarLink href='/dashboard' style={{ marginTop: '14px' }}>
                <p className='header-text'>Dashboard</p>
              </MDBNavbarLink>{' '}
            </>
          )}

          {user?.user?._id ? (
            <>
              <MDBNavbarLink href='/login' style={{ marginTop: '14px' }}>
                <p className='header-text' onClick={handleLogout}>
                  Logout
                </p>
              </MDBNavbarLink>
            </>
          ) : (
            <>
              <MDBNavbarLink href='/login'>
                <p className='header-text'>Login</p>
              </MDBNavbarLink>
            </>
          )}
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
