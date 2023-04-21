import {createSlice} from '@reduxjs/toolkit';

export const entrySlice = createSlice({
  name: 'entry',
  initialState: {
    data: {},
  },
  reducers: {
    setEntryData: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setEntryData} = entrySlice.actions;

export default entrySlice.reducer;
