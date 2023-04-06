import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AttendanceState = {
    code: string | null;
    isActive: boolean;
  };
  
  const initialState: AttendanceState = {
    code: null,
    isActive: false,
  };
  
  const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {
      setAttendanceCode: (state, action: PayloadAction<string>) => {
        state.code = action.payload;
      },
      clearAttendanceCode: (state) => {
        state.code = null;
      },
      setAttendancePeriodActive: (state,action) => {
        state.isActive = action.payload;
      },
    },
  });
  
  export const { setAttendanceCode, clearAttendanceCode, setAttendancePeriodActive } = attendanceSlice.actions;
  
  export default attendanceSlice.reducer;