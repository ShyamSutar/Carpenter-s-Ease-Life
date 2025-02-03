import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hidden: false,
};

const hiddenSlice = createSlice({
  name: 'hidden',
  initialState,
  reducers: {
    toggle: (state) => {
      state.hidden = !state.hidden;
    },
  },
});

export const { toggle } = hiddenSlice.actions;
export default hiddenSlice.reducer;
