import { configureStore } from '@reduxjs/toolkit'
import sliderslice from '../features/slice/sliderSlice'
import cardSlice from '../features/slice/cardSlice'
import productSlice from '../features/slice/productSlice'
import messageslice from '../features/slice/messageslice'
import socketSlice from '../features/slice/socketSlice'
import conversationSlice from '../features/slice/conversationSlice'

export default configureStore({
  reducer: {
    sliderslice: sliderslice,
    productSlice:productSlice, 
    cardSlice:cardSlice,
    messageslice:messageslice,
    socketSlice:socketSlice,
    conversationSlice:conversationSlice
  }
})