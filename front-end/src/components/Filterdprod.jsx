import React from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { singlereducer } from '../features/slice/productSlice';
import '../App.css'
const Filterdprod = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.productSlice.filtredProduct);
    console.log(data);
    const param = useParams();

    return (
        <div>
                <h2> collections of {param.type} </h2>
            <div className=' container filterprod'>
                <div className="row">

                    {data ?
                        (
                        <div>
                            <div className="row">
                                    {data.map((val) => (
                                        <div className="col-md-4 mb-3" key={val.id}>
                                            <Link style={{textDecoration:'none'}}  to={val._id}  >
                                            <Card  onClick={()=>dispatch(singlereducer(val.id))}   >
                                                {/* <Card.Img variant="top" src={val.img} style={{ height: '200px', objectFit: 'cover' }} /> */}
                                                <Card.Body>
                                                    <Card.Title>{val.url}</Card.Title>
                                                    <Card.Text>Type: {val.type}</Card.Text>
                                                    <Card.Text>{val.text}</Card.Text>
                                                    <Card.Text>Price: ${val.prize}</Card.Text>
                                                    {/* <Button variant="primary">Add to Cart</Button> */}
                                                </Card.Body>
                                            </Card>
                                            </Link>
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

export default Filterdprod

