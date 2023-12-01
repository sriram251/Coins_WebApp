import { configureStore } from '@reduxjs/toolkit';
import authReducer,{authMiddleware} from '../Reducers/authslice';
import alertReducer from '../Reducers/alertslice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    // other reducers...
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat([authMiddleware]) 
});

export default store;