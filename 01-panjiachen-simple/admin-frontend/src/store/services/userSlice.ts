import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../store'

export interface UserState {
  currentUser: User | null
}

const initialState: UserState = {
  currentUser: null
}

export const UserSlice = createSlice({
  name: 'User', // 独一无二不重复的名字语义化
  // 定义初始化的数据
  initialState,
  reducers: {
    // action为一个对象 对象中有一个固定的属性叫做payload 为传递过来的参数
    setCurrentUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload
    }
  }
})

// 生成修改数据的方法导出
export const { setCurrentUser } = UserSlice.actions

export const selectCurrentUser = (state: RootState) => state.user.currentUser

// 生成reducer 导出 供index.js做组合模块
export default UserSlice.reducer
