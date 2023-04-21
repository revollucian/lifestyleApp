import {configureStore} from '@reduxjs/toolkit';
import entryReducer from '../reducers/entryReducer';
import userReducer from '../reducers/userReducer';

export default configureStore({
  reducer: {
    entryReducer: entryReducer,
    userReducer: userReducer,
  },
});
