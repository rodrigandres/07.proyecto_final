import { createSlice } from '@reduxjs/toolkit'

const tokenFromSessionStorage = () => {
  return window.sessionStorage.getItem('token') !== null
}

const initialState = {
  isAuth: tokenFromSessionStorage(),
  token: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.isAuth = true
      state.token = action.payload.token
    },
    unauthenticateUser: (state) => {
      state.isAuth = false
      state.token = null // Limpiar el ID al desautenticar
      window.sessionStorage.removeItem('token') // Limpiar el token al desautenticar
    }
  }
})

export const { authenticateUser, unauthenticateUser } = authSlice.actions

export default authSlice.reducer
