import { createSlice } from '@reduxjs/toolkit'
import { storeData } from '../../assets/data/dummyData';
// import { productdata } from '../../pages/Products';

const productSlice = createSlice({
    name:'productslice',
    initialState:{
        filtredProduct:JSON.parse(localStorage.getItem('productdata')) || null ,
        // filtredProduct:JSON.parse(localStorage.getItem('filter')) || storeData ,
        singleProduct: JSON.parse(sessionStorage.getItem('oneproduct')) || storeData  
    },
    reducers:{
        productreducer( state , action ){
            console.log(action);
            const newdata = JSON.parse(localStorage.getItem('productdata'))
            // console.log(newdata[[0]]);

           const filtered = newdata.filter((data)=>{
               return data.type === action.payload;
           });

             const filterdata =  state.filtredProduct = filtered;
           localStorage.setItem("filter" , JSON.stringify(filterdata));
             console.log(state);
        },
        singlereducer(state , action){
            const newdata = JSON.parse(localStorage.getItem('productdata'))
            console.log(action.payload);
            const singledata = newdata.filter((data)=>data._id === action.payload );
            sessionStorage.setItem('oneproduct', JSON.stringify(singledata));
            state.singleProduct = singledata;        
        }
    }
})

export const {productreducer , singlereducer} = productSlice.actions
export default productSlice.reducer