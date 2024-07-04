import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'
import sliderslice from '../features/slice/sliderSlice'
import cardSlice from '../features/slice/cardSlice'
import productSlice from '../features/slice/productSlice'
export default configureStore({
  reducer: {
    sliderslice: sliderslice,
    productSlice:productSlice, 
    cardSlice:cardSlice
  }
})