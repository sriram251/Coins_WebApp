import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAlert: false,
  message: '',
  alertType: '',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action) => {
     
      state.showAlert = true;
      state.message = action.payload.message;
      state.alertType = action.payload.alertType;
      console.log(state)
    },
    hideAlert: (state) => {
      state.showAlert = false;
      state.message = '';
      state.alertType = '';
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;