import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import taskReducer from '@/store/services/taskSlice'
import userReducer from '@/store/services/userSlice'

export const store = configureStore({
  reducer: {
    task: taskReducer,
    user: userReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
