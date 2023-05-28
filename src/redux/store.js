import { configureStore } from '@reduxjs/toolkit';

import AuthReducer from './fetaures/authSlice';
import TourReducer from './fetaures/tourSlice';

export default configureStore({
  reducer: {
    auth: AuthReducer,
    tour: TourReducer,
  },
});
