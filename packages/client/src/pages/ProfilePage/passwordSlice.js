// passwordSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updatePassword } from './api';

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async ({ oldPassword, newPassword }) => {
    const response = await updatePassword(oldPassword, newPassword);
    return response;
  }
);

const passwordSlice = createSlice({
  name: 'password',
  initialState: { status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(changePassword.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default passwordSlice.reducer;
