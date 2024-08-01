import React from 'react'
import { Card, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
// import cardSlice from '../features/slice/cardSlice';
// import { AddCard } from '@mui/icons-material'; 
import { addcard, removecard } from '../features/slice/cardSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux'
// import Paybutton from '../components/Paybutton';
import Payment from '../components/Payment';
import Navbar from '../components/Navbar';

const Cartpage = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.cardSlice.carddata);
    console.log("data", data);

    const totalPrice = useSelector((state) => state.cardSlice.totalPrice);
    const totalAmount = useSelector((state) => state.cardSlice.totalAmount);

    console.log(totalAmount);
    return (
        <>
            <Navbar />
            <div className=' filterprod  d-flex justify-content-center align-items-center ' style={{ backgroundColor: '#fdccbc' }} >
                {/* <div classNameName=' filterprod  d-flex justify-content-center align-items-center '  style={{ backgroundColor: '#fdccbc' }} > */}
                {/* <div classNameName="row "> */}

                {data ?
                    (
                        <div>
                            {/* <div classNameName="row "> */}
                            {data.map((val) => (
                                <div key={val.id}>
                                    <section className="mt-3" style={{ width: '1100px' }}  >
                                        <div>
                                            <div className="row d-flex justify-content-center align-items-center ">
                                                <div className="col">
                                                    <div className="card ">
                                                        <div className="card-body">
                                                            <div className="row align-items-center">
                                                                <div className="col-md-2">
                                                                    <img src={`${process.env.REACT_APP_SITE_URL}/public/images/${val.url}`} style={{ height: '160px', width: '144px' }} className="img-fluid" alt="Generic placeholder image" />
                                                                </div>
                                                                <div className="col-md-2 d-flex justify-content-center">
                                                                    <div>
                                                                        <p className="small text-muted mb-4 pb-2">Name</p>
                                                                        <p className="lead fw-normal mb-0">{val.name}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3 d-flex justify-content-center">
                                                                    <div className=' me-5'>
                                                                        <p className="small text-muted  mb-4 pb-2">Size</p>
                                                                        <p className="lead fw-normal mb-0">
                                                                            {val.size}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="small text-muted mb-4 pb-2">Color</p>
                                                                        <p className="lead fw-normal mb-0">
                                                                            {val.color}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-1 d-flex justify-content-center">
                                                                    <div>
                                                                        <p className="small text-muted mb-4 pb-2">Quantity</p>
                                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                            <div
                                                                                onClick={() => dispatch(removecard({
                                                                                    _id: val._id,
                                                                                    size: val.size,
                                                                                    color: val.color,
                                                                                    prize: val.prize,
                                                                                    img: val.img,
                                                                                    name: val.name,
                                                                                    text: val.text,
                                                                                    type: val.type,
                                                                                    gender: val.gender,
                                                                                    totalAmount: totalAmount,
                                                                                    totalPrice: totalPrice,
                                                                                    amount: val.amount
                                                                                }))}
                                                                            ><RemoveIcon /></div>
                                                                            <p className="lead fw-normal mb-0 me-3 ms-3">{val.amount}</p>
                                                                            <div onClick={() => dispatch(addcard({
                                                                                _id: val._id,
                                                                                size: val.size,
                                                                                color: val.color,
                                                                                prize: val.prize,
                                                                                img: val.img,
                                                                                name: val.name,
                                                                                text: val.text,
                                                                                type: val.type,
                                                                                gender: val.gender,
                                                                            }))} > <AddIcon />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 d-flex justify-content-center">
                                                                    <div>
                                                                        <p className="small text-muted mb-4 pb-2">Price</p>
                                                                        <p className="lead fw-normal mb-0">₹{val.prize}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 d-flex justify-content-center">
                                                                    <div>
                                                                        <p className="small text-muted mb-4 pb-2">Total</p>
                                                                        <p className="lead fw-normal mb-0">₹{val.prize * val.amount}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            ))}

                            {/* <div className="d-flex justify-content-end pb-4">
                                <Link to='/product'>
                                    <button type="button" className="btn btn-light btn-lg me-2" >Continue shopping</button>
                                </Link>
                                <Payment />
                            </div> */}

                            <div className="d-flex flex-column flex-md-row justify-content-end pb-4 ">
                                <Link to='/product'>
                                    <button type="button" className="btn btn-light btn-lg me-2">Continue shopping</button>
                                </Link>
                                <Payment />
                            </div>

                        </div>
                    )
                    :
                    null
                }
            </div>


        </>
    )
}

export default Cartpage
