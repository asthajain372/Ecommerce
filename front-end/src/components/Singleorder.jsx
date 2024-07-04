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
  import React , { useEffect , useState  }  from "react";
  import { useParams } from "react-router";

  export default function Singleorder() {
    const [orders, setorders] = useState([]);
    const [single_prod, setsingle_prod] = useState([]);
    const [related_prod, setrelated_prod] = useState([]);
    const params = useParams();

    console.log(params);
    // console.log(params.orderid);
    // console.log(params.prod_id);
    // console.log(params.p_id);


    async function get_orders() {
        const order_data = await fetch(`${process.env.REACT_APP_SITE_URL}/order`, {
            method: "get"
        });
        const order_details = await order_data.json();

        // console.log(order_details);
        setorders(order_details);

    }

    useEffect(() => {
      get_orders();
  }, []);


    useEffect(() => {
      console.log("orders", orders);
      if (orders.length > 0) {
          const order_datas = orders.filter(order => order._id === params.orderid);
          console.log("order_data", order_datas);
          const single_prod = order_datas[0].products.find(val => val._id === params.prod_id);
          const related_prod = order_datas[0].products.filter(val => val._id !== params.prod_id);
          console.log("single_prod", single_prod);
          console.log("related_prod", related_prod);
          setsingle_prod(single_prod);
          setrelated_prod(related_prod);
      }
  }, [orders, params.orderid, params.prod_id]);


    return (
      <>
        <section
          className="h-100 gradient-custom"
          style={{ backgroundColor: "#eee" }}
        >
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="10" xl="8">
                <MDBCard style={{ borderRadius: "10px" }}>
                  <MDBCardHeader className="px-4 py-5">
                    <MDBTypography tag="h5" className="text-muted mb-0">
                      Thanks for your Order,{" "}
                      <span style={{ color: "#a8729a" }}>Anna</span>!
                    </MDBTypography>
                  </MDBCardHeader>
                  <MDBCardBody className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <p
                        className="lead fw-normal mb-0"
                        style={{ color: "#a8729a" }}
                      >
                        Receipt
                      </p>
                      <p className="small text-muted mb-0">
                        Receipt Voucher : 1KAU9-84UIL
                      </p>
                    </div>












          

                                                        
                                                        <MDBCard className="shadow-0 border mb-4"   >
                                                 
                                                            <MDBCardBody>



                                                                <MDBRow>
                                                                    <MDBCol md="2">
                                                                        <MDBCardImage
                                                                            src={`${process.env.REACT_APP_SITE_URL}/public/images/${single_prod.url}`}
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
                                                                                <p className=" mb-0">{single_prod.name}</p>

                                                                            </MDBRow>
                                                                            <MDBRow>
                                                                                <p className="text-muted mb-0"> color: {single_prod.color} &nbsp;&nbsp;  size: {single_prod.size}</p>

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
                                                                        <p className="text-muted mb-0 small">Qty:  {single_prod.amount}</p>
                                                                    </MDBCol>
                                                                    <MDBCol
                                                                        md="2"
                                                                        className="text-center d-flex justify-content-center align-items-center"
                                                                    >
                                                                        <p className="text-muted mb-0 small">₹{single_prod.prize * single_prod.amount}  </p>
                                                                    </MDBCol>
                                                                </MDBRow>
                                                            </MDBCardBody>
                                                        </MDBCard>


                     <br/>
                        other product in the same order
                     <br/>

                               {
                                        // Array.isArray(single_prod) && single_prod.map((order) => (
                                            
                                          related_prod.map((product) => {
                                                console.log(product)

                                                return (
                                                    <div key={product._id}>


                                                        {/* <Link   to={`/order/${order._id}/${product._id}/${product.product_id}`}   style={{ textDecoration: 'none', color: 'black' }} > */}
                                                        
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

                                                        {/* </Link> */}


                                                    </div>
                                                );
                                            })
                                        //  ))
                                    }



















  
  

    
                    <div className="d-flex justify-content-between pt-2">
                      <p className="fw-bold mb-0">Order Details</p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">Total</span> $898.00
                      </p>
                    </div>
  

                    <div className="d-flex justify-content-between pt-2">
                      <p className="text-muted mb-0">Invoice Number : 788152</p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">Discount</span> $19.00
                      </p>
                    </div>
  
                    <div className="d-flex justify-content-between">
                      <p className="text-muted mb-0">
                        Invoice Date : 22 Dec,2019
                      </p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">GST 18%</span> 123
                      </p>
                    </div>
  
                    <div className="d-flex justify-content-between mb-5">
                      <p className="text-muted mb-0">
                        Recepits Voucher : 18KU-62IIK
                      </p>
                      <p className="text-muted mb-0">
                        <span className="fw-bold me-4">Delivery Charges</span>{" "}
                        Free
                      </p>
                    </div>
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
                      Total paid: <span className="h2 mb-0 ms-2">$1040</span>
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

