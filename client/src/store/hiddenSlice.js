import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hidden: false,
};

const hiddenSlice = createSlice({
  name: 'hidden',
  initialState,
  reducers: {
    toggle: (state, action) => {
      state.hidden = action.payload;
    },
  },
});

export const { toggle } = hiddenSlice.actions;
export default hiddenSlice;
