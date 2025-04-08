import { configureStore } from '@reduxjs/toolkit';
import supplierReducer from '../features/Supplier/SupplierSlice' 
import orderReducer from '../features/Order/OrderSlice' 
import adminReducer from '../features/Owner/OwnerSlice'
const store = configureStore({
    reducer: {
      supplier:supplierReducer,
      order:orderReducer,
      admin:adminReducer
    },
  });
  
  export default store;