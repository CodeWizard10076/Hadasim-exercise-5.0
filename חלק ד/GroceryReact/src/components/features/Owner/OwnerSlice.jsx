import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//בדיקה לסיסמא
export const loginAdmin = createAsyncThunk(
  'admin/login',
  async (password, { rejectWithValue }) => {
    try {
      console.log(typeof(password));
      const response = await axios.post('https://localhost:7261/api/Admin/login', { password });
      return response.data;
    } catch (err) {
      return rejectWithValue('Incorrect password');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    logoutAdmin: (state) => {
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
