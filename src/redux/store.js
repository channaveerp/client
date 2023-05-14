import { configureStore } from '@reduxjs/toolkit';

import AuthReducer from './fetaures/authSlice';

export default configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
