import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import authSlice from './slices/authSlice'
import cartReducer from './slices/cartSlice'
import userReducer from './slices/userSlice'
import quotationReducer from './slices/quotationSlice'

const middleware = [thunk, logger]

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartReducer,
    user: userReducer,
    quotation: quotationReducer
  },
  middleware
})

export default store
