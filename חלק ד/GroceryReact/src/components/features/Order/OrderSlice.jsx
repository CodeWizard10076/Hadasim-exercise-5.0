import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// הוספת הזמנה
export const addOrder = createAsyncThunk(
  'orders/register',
  async (orderData, { rejectWithValue }) => {
    try {
      console.log('orderData', orderData);
      const response = await axios.post(`https://localhost:7261/api/Order`, orderData);
      console.log('from Slice', response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// קבלת הזמנות לפי ספק
export const getOrdersBySupplierId = createAsyncThunk(
  'orders/getById',
  async (supplierId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://localhost:7261/api/Order/supplier/${supplierId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// פעולה לשליפת כל ההזמנות
export const getAllOrders = createAsyncThunk(
  'orders/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://localhost:7261/api/Order`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
// עדכון הזמנה
export const updateOrder = createAsyncThunk(
  'orders/update',
  async ({ id, updatedOrder }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://localhost:7261/api/Order/${id}`,
        JSON.stringify(updatedOrder),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


// Slice
const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    currentOrder: null,
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // הוספה
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentOrder = null;
      })

      // שליפה לפי ספק
      .addCase(getOrdersBySupplierId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersBySupplierId.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersBySupplierId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.orders = [];
      })

      // שליפה של כל ההזמנות
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.orders = [];
      })
      // עדכון הזמנה
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        // עדכון ההזמנה בתוך המערך
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        // במידה והוזנה הזמנה נוכחית לעריכה
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder = action.payload;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = orderSlice.actions;

export default orderSlice.reducer;
