import { configureStore } from '@reduxjs/toolkit';
import authReducer,{authMiddleware} from '../Reducers/authslice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // other reducers...
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat([authMiddleware]) 
});

export default store;