import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import App from './App.jsx'
import store from './redux/store.js'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './index.css'
import { CssBaseline } from '@mui/material'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
)
