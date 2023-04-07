import { createSlice, createAction} from '@reduxjs/toolkit';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';


const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    code: null,
    isActive: false,
  },
  reducers: {
    setAttendanceCode: (state, action) => {
      state.code = action.payload;
    },
    clearAttendanceCode: (state) => {
      state.code = null;
    },
    setAttendancePeriodActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const generateAttendanceCodeAction = (): AppThunk => async (dispatch) => {
  const code = Math.random().toString(36).substr(2, 6);

  dispatch(setAttendanceCode(code));
};

export const endAttendanceAction = createAction<void>('attendance/endAttendance');
export const regenerateCodeAction = createAction<void>('attendance/regenerateCode');

export const { setAttendanceCode, clearAttendanceCode, setAttendancePeriodActive } =
  attendanceSlice.actions;

export default attendanceSlice.reducer;
