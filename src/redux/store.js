import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import authSlice from './slices/authSlice'

const middleware = [thunk, logger]

const store = configureStore({
  reducer: {
    auth: authSlice
  },
  middleware
})

export default store
