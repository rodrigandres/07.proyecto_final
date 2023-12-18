import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import authSlice from './slices/authSlice'
import cartReducer from './slices/cartSlice'

const middleware = [thunk, logger]

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartReducer
  },
  middleware
})

export default store
