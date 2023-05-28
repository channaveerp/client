import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';
// tour action
export const createTour = createAsyncThunk(
  'tour/createTour',
  async ({ updtaedTour, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await api.createTour(updtaedTour);
      console.log('res:', res);

      toast.success('tourData created succesfully');
      navigate('/');
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const tourSlice = createSlice({
  name: 'tour',
  initialState: {
    tour: {},
    tours: [],
    userTours: [],
    error: '',
    loading: false,
  },
  // to persist the state
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // for logout
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    [createTour.pending]: (state, action) => {
      state.loading = true;
    },
    [createTour.fulfilled]: (state, action) => {
      state.loading = false;

      state.tour = action.payload;
    },

    [createTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default tourSlice.reducer;
