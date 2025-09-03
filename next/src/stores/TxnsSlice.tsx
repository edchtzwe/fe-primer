import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SortDir = 'asc' | 'desc';

interface SortState {
  direction: SortDir;
}

const initialState: SortState = {
  direction: 'asc',
};

const txnsSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    toggleDirection(state) {
      state.direction = state.direction === 'asc' ? 'desc' : 'asc';
    },
    setDirection(state, action: PayloadAction<SortDir>) {
      state.direction = action.payload;
    },
  },
});

export const { toggleDirection, setDirection } = txnsSlice.actions;
export default txnsSlice.reducer;
