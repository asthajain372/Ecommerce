import { createSlice } from '@reduxjs/toolkit'
import { storeData } from '../../assets/data/dummyData';
// import { productdata } from '../../pages/Products';

const messageslice = createSlice({
    name:'Messageslices',
    initialState:{
        selectedConversation: null,  
        chat: null,  
      
    },
    reducers:{
        userreducer( state , action ){
            // console.log(action.payload);
            const data = action.payload;
            state.selectedConversation = data; 
        },
        chatreducer( state , action ){
            // console.log(action.payload);
            const data = action.payload;
            state.chat = data; 
        },
        
     
    }
})

export const { userreducer , chatreducer } = messageslice.actions
export default messageslice.reducer