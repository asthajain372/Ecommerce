import React from 'react'
import '../App.css'
import Filterdprod from './Filterdprod';
import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import { productreducer } from '../features/slice/productSlice';
import { Link } from 'react-router-dom';
import RightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { UseSelector } from 'react-redux'
import { Card  } from 'react-bootstrap';

const Newbutton = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productSlice.filtredProduct);
  console.log(data);

  // const data = useSelector((state)=>state);
  // console.log(data);

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
                <div className='coll' >
                  {

                    data.slice(0, 4).map((val) => (
                      <div className="col-md-3 m-2" key={val.id}>
                        <Card>
                          <Card.Img variant="top" src={val.img} style={{ height: '200px', objectFit: 'cover' }} />
                          <Card.Body>
                            <Card.Title>{val.name}</Card.Title>
                            <Card.Text>{val.text}</Card.Text>
                            <Card.Text>Type: {val.type}</Card.Text>
                            <Card.Text>Price: ${val.price}</Card.Text>
                            {/* <Button variant="primary">Add to Cart</Button> */}
                          </Card.Body>
                        </Card>
                      </div>
                    ))
                  }
                </div>

                {data.slice(0, 1).map((val) => (
                  <div key={val.id} >
                  < Link to={`/filterprod/:${val.type}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                    <span style={{ marginRight: '10px', fontSize: '20px', fontWeight: 'bold', color: 'black' }}>More Related Collections</span>
                    <RightIcon style={{ height: '50px', width: '50px', color: 'black', cursor: 'pointer' }} />
                  </Link>
                  </div>
                ))
                }


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

export default Button
