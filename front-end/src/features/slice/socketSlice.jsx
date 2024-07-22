import { createSlice } from '@reduxjs/toolkit'
import { storeData } from '../../assets/data/dummyData';
// import { productdata } from '../../pages/Products';

const socketSlice = createSlice({
    name:'socketSlice',
    initialState:{
        OnlineUsers: null,  
        Socketconnect:null,
    },
    reducers:{
        useronlinereducer( state , action ){
            // console.log(action.payload);
            const data = action.payload;
            state.OnlineUsers = data; 
        },
    }
})

export const { useronlinereducer  } = socketSlice.actions
export default socketSlice.reducer