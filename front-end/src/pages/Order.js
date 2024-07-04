import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBProgress,
    MDBProgressBar,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect } from "react";

import { useState } from "react";
import { Link } from "react-router-dom";




export default function Order() {

    const [orders, setorders] = useState([]);
    const [total_pr, settotal_pr] = useState(0);

    useEffect(() => {
        console.log("hello");
        get_orders();
        setTimeout(() => {
            console.log("orders", orders); // This will log an empty array initially
        }, 4000); // Timeout set to 2000 milliseconds
    }, []);



    useEffect(() => {
        let totalPrice = 0;
        orders.forEach((order) => {
            order.products.forEach((product) => {
                totalPrice += product.prize * product.amount;
            });
        });
        settotal_pr(totalPrice); // Update the total price state once after calculating
    }, [orders]);


    async function get_orders() {
        const order_data = await fetch(`${process.env.REACT_APP_SITE_URL}/order`, {
            method: "get"
        });
        const order_details = await order_data.json();
        // console.log(order_details);
        setorders(order_details);
    }

    let finaltotal = 0;


    return (
        <>
            <section
                className="h-100 gradient-custom"
                style={{ backgroundColor: "#eee" }}
            >


                {/* 
                {
                    orders.map((order) => {
                        order.products.map((product) => {
                            return (
                                <div key={product.id}>
                                    <p>Name: {product.name}</p>
                                    <p>Price: {product.price}</p>
                                </div>
                            );
                        });

                    }
                    )} */}





                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="10" xl="8">
                            <MDBCard style={{ borderRadius: "10px" }}>

                                <MDBCardBody className="p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p
                                            className="lead fw-normal mb-0"
                                            style={{ color: "#a8729a" }}
                                        >
                                            My Orders
                                        </p>
                                        {/* <p className="small text-muted mb-0">
                                            Receipt Voucher : 1KAU9-84UIL
                                        </p> */}
                                    </div>








                                    {/* 
{
Array.isArray(orders) && orders.map((order) => {
    return order.products.map((product) => {
        return (
            <div key={product._id}>
                <p>Name: {product.name}</p>
                <p>Price: {product.price}</p>
            </div>
        );
    });
})
} */}


                                    {
                                        Array.isArray(orders) && orders.map((order) => (
                                            

                                            order.products.map((product) => {
                                                console.log(product)

                                                return (
                                                    <div key={product._id}>


                                                        <Link   to={`/order/${order._id}/${product._id}/${product.product_id}`}   style={{ textDecoration: 'none', color: 'black' }} >
                                                        
                                                        <MDBCard className="shadow-0 border mb-4"   >
                                                 
                                                            <MDBCardBody>



                                                                <MDBRow>
                                                                    <MDBCol md="2">
                                                                        <MDBCardImage
                                                                            src={`${process.env.REACT_APP_SITE_URL}/public/images/${product.url}`}
                                                                            fluid
                                                                            alt="Phone"
                                                                            style={{ height: '100px', width: '104px' }}
                                                                        />
                                                                    </MDBCol>
                                                                    <MDBCol
                                                                        md="3"
                                                                        className="text-center d-flex justify-content-center align-items-center"
                                                                    >
                                                                        <MDBRow>
                                                                            <MDBRow>
                                                                                <p className=" mb-0">{product.name}</p>

                                                                            </MDBRow>
                                                                            <MDBRow>
                                                                                <p className="text-muted mb-0"> color: {product.color} &nbsp;&nbsp;  size: {product.size}</p>

                                                                            </MDBRow>

                                                                        </MDBRow>





                                                                    </MDBCol>
                                                                    <MDBCol
                                                                        md="2"
                                                                    >
                                                                    </MDBCol>

                                                                    <MDBCol
                                                                        md="2"
                                                                        className="text-center d-flex justify-content-center align-items-center"
                                                                    >
                                                                        <p className="text-muted mb-0 small">Qty:  {product.amount}</p>
                                                                    </MDBCol>
                                                                    <MDBCol
                                                                        md="2"
                                                                        className="text-center d-flex justify-content-center align-items-center"
                                                                    >
                                                                        <p className="text-muted mb-0 small">₹{product.prize * product.amount}  </p>
                                                                    </MDBCol>
                                                                </MDBRow>
                                                            </MDBCardBody>
                                                        </MDBCard>

                                                        </Link>


                                                    </div>
                                                );
                                            })
                                        ))
                                    }

                                 
                                </MDBCardBody>
                                <MDBCardFooter
                                    className="border-0 px-4 py-5"
                                    style={{
                                        backgroundColor: "#a8729a",
                                        borderBottomLeftRadius: "10px",
                                        borderBottomRightRadius: "10px",
                                    }}
                                >
                                    <MDBTypography
                                        tag="h5"
                                        className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0"
                                    >
                                        {/* Total paid: <span className="h2 mb-0 ms-2">₹{total_pr}</span> */}
                                    </MDBTypography>
                                </MDBCardFooter>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    );
}
