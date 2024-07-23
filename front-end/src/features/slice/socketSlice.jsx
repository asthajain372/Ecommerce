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
            // console.log(action.payload , "acrioncccc");
        },
        socketreducer( state , action ){
            // console.log(action.payload);
            const data = action.payload;
            state.Socketconnect = data; 
            console.log(action.payload, "sovvvvvvvvvv");
        },
    }
})

export const { useronlinereducer , socketreducer  } = socketSlice.actions
export default socketSlice.reducer