import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';
// login action
export const login = createAsyncThunk(
  'auth/login',
  async ({ inputValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await api.signIn(inputValue);
      console.log('res:', res);

      toast.success('Login succesfully');
      navigate('/');
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

// login action
export const register = createAsyncThunk(
  'auth/register',
  async ({ inputValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const res = await api.signUp(inputValue);
      console.log('res:', res);

      toast.success('registered succesfully');
      navigate('/');
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: '',
    loading: false,
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },

    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },

    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default authSlice.reducer;
