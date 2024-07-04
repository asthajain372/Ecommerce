import React, { useState } from 'react'
import { storeData } from '../assets/data/dummyData';
import { useParams } from 'react-router';
import { Card, Button } from 'react-bootstrap';
import '../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { addcard } from '../features/slice/cardSlice';
import { Link } from 'react-router-dom';

const Singleprod = () => {
    const dispatch = useDispatch();
    const param = useParams();
    const singledata = useSelector((state) => state.productSlice.singleProduct);
    console.log(singledata);
     
    const singleproduct = singledata.filter(data => data._id === param.id)
    // const intialsize = singledata[0].size ? singleproduct[0].size[0] : '';
    const intialsize = singledata[0].size ;

    const intialcolor = singledata[0].color ;
    // const intialcolor = singledata[0].color ? singleproduct[0].color[0] : '';
    const [allSizes, setallSizes] = useState([intialsize]);
    // const sizes = allSizes[0].split(',');
    const [size, setsize] = useState(intialsize[0]);

    const [color, setcolor] = useState(intialcolor[0]);
    
    // const [selcolor, setselcolor] = useState([intialcolor]);

    // const allSizes = ["", "XS", "S", "M", "L", "XL", "XXL"];
    const allColors = ["red", "blue", "green", "yellow",  "black", "white"];
    // const colors = selcolor[0].split(',');

    console.log("intialsize" , intialsize );
    console.log("size" , size );
    console.log("color", color);

    return (
        <div className="single-product-container">
            {singleproduct.map((val) => (
                <div key={val.id} className="product-details">
                    <h1>{val.name}</h1>
                    <div className="product-info">
                        <div className="product-image-container">
                            <img src={`${process.env.REACT_APP_SITE_URL}/public/images/${val.url}`}  alt={val.name} className="product-image" />
                        </div>

                        <div className='pro-data' >
                        <p><strong>Type:</strong> {val.type}</p>
                            {/* <p><strong>Available Sizes:</strong> {val.size.join(", ")}</p> */}
                            <p><strong>Available Colors:</strong> {val.color.join(", ")}</p>
                            <p><strong>Price:</strong> ${val.prize}</p>


                            <p>{val.text}</p>
                            {val.size ?
                                <>
                                    <label>Pick a size </label>
                                    {/* <select value={sizes} onChange={(e) => console.log(e)} */}
                                    <select  onChange={(e) => setsize(e.target.value)}
                                        style={{
                                            padding: '.3rem',
                                            margin: '.5rem',
                                            fontSize: '1rem',
                                        }}>  

                                        {intialsize.map((item, index) => (
                                            <option key={index}>{item}</option>
                                        ))}
                                        {/* {val.size.map((item, index) => (
                                            <option key={index}>{item}</option>
                                        ))} */}


                                    </select>
                                </>
                                :
                                null
                            }


                            {/* {val.color ?
                                <>
                                    <label>Pick a color </label>
                                    <select value={color} onChange={(e) => setcolor(e.target.value)}
                                        style={{
                                            padding: '.3rem',
                                            margin: '.5rem',
                                            fontSize: '1rem',
                                        }}>
                                        {val.color.map((item, index) => (
                                            <option key={index}>{item}</option>
                                        ))}
                                    </select>
                                </>
                                :
                                null
                            } */}

<>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {allColors.map((color, index) => (
            <button 
                key={index} 
                onClick={() => setcolor(color)}
                disabled={!intialcolor.includes(color)}
                style={{
                    padding: '1rem',
                    margin: '.4rem',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    backgroundColor: color,
                    opacity:  intialcolor.includes(color)  ? 1 : 0.5, // Adjust opacity for disabled colors
                }}
            >
                {/* {color} */}   
            </button>
        ))}
    </div>
</>        


{/* 
<>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {allColors.map((color, index) => (
            <button 
                key={index} 
                onClick={() =>  setcolor(color)}
                disabled={!val.color.includes(color)}
                style={{
                    padding: '1rem',
                    margin: '.4rem',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    backgroundColor: color,
                    opacity: val.color.includes(color) ? 1 : 0.5, // Adjust opacity for disabled colors
                }}
            >
          
            </button>
        ))}
    </div>
</>         */}
                           
                            <p className='mt-4' style={{display:'flex' , justifyContent:'space-evenly'}} >

                                <Link  to='/cart' >
                                <Button onClick={() => dispatch(addcard({
                                    _id: val._id,
                                    size: size,
                                    color: color,
                                    prize: val.prize,
                                    url: val.url,
                                    name: val.name,
                                    text: val.desc,
                                    type: val.type,
                                    gender: val.gender,
                                }))} variant="primary" > Add to Cart</Button>
                                </Link>
                                
                                <Button> Buy Now  </Button>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Singleprod

