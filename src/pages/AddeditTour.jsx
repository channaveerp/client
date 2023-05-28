import React, { useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBSpinner,
  MDBInput,
} from 'mdb-react-ui-kit';
import ChipInput from 'material-ui-chip-input';
import Filebase from 'react-file-base64';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createTour } from '../redux/fetaures/tourSlice';

const AddeditTour = () => {
  const { error, loading } = useSelector((state) => state?.tour);
  const { user } = useSelector((state) => state?.auth);
  const [tourData, settourData] = useState({
    title: '',
    description: '',
    tags: [],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    settourData({ ...tourData, [name]: value });
  };
  const handleformsubmit = (e) => {
    e.preventDefault();
    if (tourData.title && tourData.description && tourData.tags) {
      const updtaedTour = { ...tourData, name: user?.user?.name };
      dispatch(createTour({ updtaedTour, navigate, toast }));
    }
  };

  const handleAddTag = (tags) => {
    settourData({ ...tourData, tags: [...tourData.tags, tags] });
  };
  const handleDeleteTag = (deletetag) => {
    settourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deletetag),
    });
  };
  const handleClear = () => {
    settourData({
      title: '',
      description: '',
      tags: [],
    });
  };
  console.log('data', tourData);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  return (
    <div
      style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '450px',
        alignItems: 'center',
        marginTop: '120px',
      }}
      className='container'>
      <MDBCard alignment='center'>
        <h5>Add tour</h5>
        <MDBCardBody>
          <MDBValidation
            noValidate
            className='row g-3'
            onSubmit={handleformsubmit}>
            <div className='col-md-12'>
              <MDBInput
                label='title'
                type='text'
                value={tourData.title}
                name='title'
                onChange={handleInputChange}
                required
                invalid
                validation='Please enter a title'
              />
            </div>
            <div className='col-md-12'>
              <textarea
                style={{
                  height: '100px',
                  width: '100%',
                  resize: 'none',
                  padding: '10px',
                }}
                label='Description'
                type='text'
                value={tourData.description}
                name='description'
                onChange={handleInputChange}
                required
                invalid
                validation='Please enter a description'
              />
            </div>
            <div className='col-md-12'>
              <ChipInput
                name='tags'
                variant='outlined'
                placeholder='Enter tag'
                fullWidth
                value={tourData.tag}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}></ChipInput>
            </div>
            <div className='d-flex justify-content-start'>
              <Filebase
                type='file'
                multiple={false}
                onDone={({ base64 }) =>
                  settourData({ ...tourData, imageFile: base64 })
                }></Filebase>
            </div>
            <div className='col-12'>
              <MDBBtn style={{ width: '100%' }}>Submit</MDBBtn>
              <MDBBtn
                style={{ width: '100%' }}
                className='mt-2'
                color='danger'
                onClick={handleClear}>
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddeditTour;
