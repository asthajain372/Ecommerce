import { createSlice, current } from '@reduxjs/toolkit'
import { storeData } from '../../assets/data/dummyData';
import { json } from 'react-router';
const cardSlice = createSlice({
    name:'Cardslice',
    initialState:{
        carddata:JSON.parse(localStorage.getItem('cart')) || [] ,
        amount:0,
        totalPrice:JSON.parse(localStorage.getItem('totalPrice')) || 0 ,
        totalAmount:JSON.parse(localStorage.getItem('totalAmount')) || 0 ,
    },
    reducers:{
        addcard(state , action){
            // console.log(action.payload);
            let  userprod = action.payload;
             console.log("userprod",userprod);

            const exist = state.carddata.find((product)=>
                product._id === userprod._id &&
                product.size === userprod.size &&
                product.color === userprod.color
            );

            if(exist){
                console.log(current(exist));
                // state.amount++;
                // exist.totalPrice += userprod.prize;
                exist.amount++ ;
                state.totalAmount ++ ;
                console.log(state.totalPrice);
                state.totalPrice =  state.totalPrice + parseFloat(userprod.prize) ;
// state.totalPrice = userprod.prize + userprod.prize;

                // state.totalPrice = parseFloat(exist.price) + parseFloat(state.totalPrice);
            }else{
                // userprod.amount  =  userprod.amount + 1;
                state.amount++ ;
                state.totalAmount ++ ;
                console.log(userprod.prize);
                state.totalPrice =  state.totalPrice + parseFloat(userprod.prize) ;

                // state.totalPrice = state.totalPrice + userprod.prize;
                // state.totalPrice = parseFloat(state.totalPrice) + parseFloat(userprod.prize);
//                 console.log("Before addition:", state.totalPrice, userprod.prize);
// state.totalPrice = userprod.prize + userprod.prize;
// console.log("After addition:", state.totalPrice);

           
                state.carddata.push({
                    _id: userprod._id,
                    size: userprod.size,
                    color: userprod.color,
                    prize: userprod.prize,
                    url: userprod.url,
                    name: userprod.name,
                    text: userprod.text,
                    type: userprod.type,
                    amount:1,
                })
            }
            localStorage.setItem('cart' , JSON.stringify(state.carddata))
            localStorage.setItem('totalPrice' , JSON.stringify(state.totalPrice))
            localStorage.setItem('totalAmount' , JSON.stringify(state.totalAmount))
            
            // const filterdata = storeData.filter((data)=>data._id == action.payload);
            // console.log(filterdata);
            // state.carddata.push(filterdata);
              console.log(current(state));
        },

        removecard(state, action){
            // console.log(action.payload);

            const removedata = action.payload
            
                const findcart = state.carddata.find((data)=> 
                data._id ==  removedata._id  &&
                data.size ==  removedata.size &&
                data.color == removedata.color
                );
                console.log(current(findcart));
             
                    if(findcart.amount === 1){
                        findcart.amount--;

                      const filtercart = state.carddata.filter((data)=> data._id !== findcart._id ||
                      data.size !==  findcart.size ||
                      data.color !== findcart.color
                      );
                      state.totalPrice = state.totalPrice - findcart.prize;
                      state.totalAmount--;
                      state.carddata = filtercart;
                     localStorage.setItem('cart' , JSON.stringify(state.carddata))              
                    }else{
                        findcart.amount--;
                        state.totalPrice = state.totalPrice -   findcart.prize;
                        state.totalAmount -- ;
                        localStorage.setItem('totalPrice' , JSON.stringify(state.totalPrice))
                        localStorage.setItem('totalAmount' , JSON.stringify(state.totalAmount))
                    }
                    console.log(state.totalPrice);
                    //     state.carddata
                    //    const data = action.payload.amount--;
                    //   state.carddata = data;
                    //     console.log(current(state));
        }
        
    }
})

export const {addcard , removecard} = cardSlice.actions
export default cardSlice.reducer


