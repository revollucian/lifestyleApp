import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
    steps: 0,
  },
  reducers: {
    setUserData: (state, action) => { state.data = action.payload },
    setUserSteps: (state, action) => { state.steps = action.payload },
  },
});

// Action creators are generated for each case reducer function
export const {setUserData, setUserSteps} = userSlice.actions;
export default userSlice.reducer;