import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../api/quotationApi'

const initialState = {
  quotations: [],
  loading: false,
  error: null
}

// Async thunk action para obtener cotizaciones
export const fetchQuotations = createAsyncThunk(
  'quotations/fetchQuotations',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getAllQuotationsByUserId(userId)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener las cotizaciones desde redux')
    }
  }
)

// Async thunk action para enviar cotización al backend
export const submitQuotationToBackend = createAsyncThunk(
  'quotations/submitToBackend',
  async (quotationData, { rejectWithValue }) => {
    try {
      const response = await api.saveQuotation(quotationData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al enviar la cotización desde redux para el backend')
    }
  }
)

export const quotationSlice = createSlice({
  name: 'quotations',
  initialState,
  reducers: {
    saveQuotation: (state, action) => {
      state.quotations.push(action.payload)
    },
    removeQuotation: (state, action) => {
      state.quotations = state.quotations.filter(quotation => quotation.id !== action.payload)
    }
  },
  extraReducers: {
    [fetchQuotations.pending]: (state) => {
      state.loading = true
    },
    [fetchQuotations.fulfilled]: (state, action) => {
      state.loading = false
      state.quotations = action.payload
    },
    [fetchQuotations.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    // [submitQuotationToBackend.fulfilled]: (state, action) => {
    // },
    [submitQuotationToBackend.rejected]: (state, action) => {
      state.error = action.payload
    }
  }
})

export const { saveQuotation, removeQuotation } = quotationSlice.actions

export default quotationSlice.reducer
