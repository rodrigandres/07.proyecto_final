import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
    tripValue: 0
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload
      const existingItem = state.items.find(item => item.id === newItem.id)

      if (!existingItem) {
        state.items.push(newItem)
      } else {
        existingItem.quantity += newItem.quantity
      }

      state.total += newItem.price * newItem.quantity
    },
    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload
      const itemToRemove = state.items.find(item => item.id === itemIdToRemove)

      if (itemToRemove) {
        state.total -= itemToRemove.price * itemToRemove.quantity
        state.items = state.items.filter(item => item.id !== itemIdToRemove)
      }
    },
    addTripValue: (state, action) => {
      const tripValue = action.payload
      state.tripValue = tripValue
    }
  }
})

export const { addToCart, removeFromCart, addTripValue } = cartSlice.actions
export default cartSlice.reducer
