import React from 'react'
import { useSelector } from "react-redux";
import {loadStripe} from '@stripe/stripe-js';

const Payment = () => {
    const cartdata = useSelector((state) => state.cardSlice.carddata);
    const authuser = JSON.parse(localStorage.getItem('user'));
    console.log("cartdata", cartdata);


async function handleCheckout(){
    const stripe = await loadStripe("pk_test_51OA4XLSB2fKJnUAPnFEKIfOvw48i45qBSPwSwybKUO89dEvZodBh9ViYutML9fdVqmDAthGRlZWgPyhwBv6KnD5H00ZPjKMF8c");

    const body = {
        products: cartdata ,
        user : authuser
    }
    const headers ={
        "Content-Type":"application/json"
    }
    const response = await fetch(`${process.env.REACT_APP_SITE_URL}/api/create-checkout-session`,{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    })
    const session = await response.json();
    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });

    

    if(result.error){
        console.log(result.error);
    }
}

  return (
    <div>
       <button type="submit"  className="btn btn-primary btn-lg "  onClick={handleCheckout}  >
        Checkout
    </button>
    </div>
  )
}

export default Payment
