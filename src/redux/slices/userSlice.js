// userSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile: [],
  loading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const { setUserProfile, setLoading } = userSlice.actions

export default userSlice.reducer
