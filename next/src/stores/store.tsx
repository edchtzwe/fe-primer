import { configureStore } from '@reduxjs/toolkit';
import txnsReducer from '@/stores/TxnsSlice'

export const store = configureStore({
  reducer: {
    sort: txnsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
