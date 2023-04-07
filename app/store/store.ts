import { combineReducers, configureStore } from '@reduxjs/toolkit';
import attendanceReducer from './attendanceSlice';

const rootReducer = combineReducers({
  attendance: attendanceReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;