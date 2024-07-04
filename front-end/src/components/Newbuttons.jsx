import React, { useEffect } from 'react'
import '../App.css'
import { useState } from 'react'
import Filterdprod from './Filterdprod';
import { useDispatch, useSelector } from 'react-redux';
import { productreducer } from '../features/slice/productSlice';
import { Link } from 'react-router-dom';
import RightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { UseSelector } from 'react-redux'
import { Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { singlereducer } from '../features/slice/productSlice';
import { addcard } from '../features/slice/cardSlice';

const Newbuttons = () => {

    const dispatch = useDispatch();
    const param = useParams();
    const singledata = useSelector((state) => state.productSlice.singleProduct);
    console.log(singledata);
    const [buttondata , setbutton] = useState('Hoodies');

    const singleproduct = singledata.filter(data => data._id === param.id)
    const [size, setsize] = useState('');
    const [color, setcolor] = useState('');

    console.log(color);
    const data = useSelector((state) => state.productSlice.filtredProduct);
    console.log(data);

    async function deleteProduct(id){
        let result = await fetch(`${process.env.REACT_APP_SITE_URL}/product/${id}`,{
            method:'delete'
        });
        result = await result.json();
        if(result){
            alert("record is deleted");
            localStorage.setItem('productdata',JSON.stringify(result));
            dispatch(productreducer(data[0].type));
        }
    }

    const button = [
        "Hoodies",
        "Dresses",
        "Suits",
        "Shoes",
        "T-Shirts",
        "Jeans",
        "Jackets",
        "Bags",
    ];

    return (
        <div>
            <div>
                {button.map((val) => {
                    return (
                        <button onClick={() => dispatch(productreducer(val))}
                            key={val}
                            className="btn btn-lg border bg-secondary m-2 "
                            style={{ fontWeight: "bold" }}
                        >
                            {val}
                        </button>
                    );
                })}
            </div>
            <div className=' container filterprod'>
                <div className="row">
                    {data ?
                        (
                            <div>
                                <div className="row">
                                    {data.map((val) => (
                                        <div className="col-md-4 mb-3" key={val._id}>
                                            <Card >
                                                {/* <Card.Img variant="top" src={val.img} style={{ height: '200px', objectFit: 'cover' }} /> */}
                                                <Card.Img variant="top" src={`${process.env.REACT_APP_SITE_URL}/public/images/${val.url}`} style={{ height: '200px', objectFit: 'cover' }} />
                                                <Card.Body>
                                                    <Card.Title>{val.url}</Card.Title>
                                                    <Card.Text>Type: {val.type}</Card.Text>
                                                    <Card.Text>{val.text}</Card.Text>
                                                    <Card.Text>Price: ${val.prize}</Card.Text>

                                                 

                                                    <Link style={{ textDecoration: 'none' }} to={val._id}  >
                                                        <Button onClick={() => dispatch(singlereducer(val._id))}  > view Product </Button>
                                                    </Link>

                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}

export default Newbuttons