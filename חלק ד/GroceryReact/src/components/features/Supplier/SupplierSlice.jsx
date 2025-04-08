import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'https://localhost:7261/api/'; 

// פונקציה לפענוח ה-token
const getSupplierIdFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.id;
  } catch (error) {
    console.error('Token decoding failed:', error);
    return null;
  }
};

// פעולה להתחברות ספק
export const loginSupplier = createAsyncThunk(
  'suppliers/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}Supplier/Login`, credentials);
      return response.data; //
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// פעולה אסינכרונית להרשמה 
export const registerSupplier = createAsyncThunk(
  'suppliers/register',
  async (supplierData, { rejectWithValue }) => {
    try {
      console.log('supplierData',supplierData);
      const response = await axios.post(`https://localhost:7261/api/Supplier`, supplierData);
      console.log('from Slice',response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// פעולה אסינכרונית לשליפת ספק לפי ID
export const getSupplierById = createAsyncThunk(
  'suppliers/getById',
  async (supplierId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}Supplier/${supplierId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// פעולה לשליפת כל הספקים
export const getAllSuppliers = createAsyncThunk(
  'suppliers/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://localhost:7261/api/Supplier`);
      console.log('res',response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Slice
const supplierSlice = createSlice({
  name: 'suppliers',
  initialState: {
    currentSupplierId: null,
    token: null,
    supplierFromGet: null,
    suppliers: [],
    loading: false,
    error: null,
  },
  reducers: {
    logoutSupplier: (state) => {
      state.currentSupplierId = null;
      state.token = null;
      localStorage.removeItem('supplierToken');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // התחברות
      .addCase(loginSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        const supplierId = getSupplierIdFromToken(action.payload);
        state.currentSupplierId = supplierId;
        localStorage.setItem('supplierToken', action.payload);
      })
      .addCase(loginSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.token = null;
        state.currentSupplierId = null;
      })

      // הרשמה
      .addCase(registerSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        const supplierId = getSupplierIdFromToken(action.payload);
        state.currentSupplierId = supplierId;
        localStorage.setItem('supplierToken', action.payload);
      })
      .addCase(registerSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.token = null;
        state.currentSupplierId = null;
      })

      // שליפה לפי ID
      .addCase(getSupplierById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSupplierById.fulfilled, (state, action) => {
        state.loading = false;
        state.supplierFromGet = action.payload;
      })
      .addCase(getSupplierById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.supplierFromGet = null;
      })

      // שליפה של כל הספקים
      .addCase(getAllSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers = action.payload;
      })
      .addCase(getAllSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.suppliers = [];
      });
  },
});

export const { logoutSupplier, clearError } = supplierSlice.actions;

export default supplierSlice.reducer;
