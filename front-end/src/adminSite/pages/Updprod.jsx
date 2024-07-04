import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';

const Updprod = () => {
  const SITE_URL = process.env.REACT_APP_SITE_URL;

  console.log("SITE_URL" , SITE_URL);
  console.log("hello");
  
  const [prodata , setprodata] = useState([]);

  useEffect(()=>{
    async function fetchsingle (){
      const single_product = await fetch(`${process.env.REACT_APP_SITE_URL}/singleproduct/${param._id}`)
      const data = await single_product.json();
      console.log(data);
      setprodata(data);
      setname(data.name);
      setdesc(data.desc);
      setnewsize(data.size);
      setnewcolor(data.color);
      setprize(data.prize);
      seturl(data.url);
      settype(data.type);
    }
    fetchsingle();
  },[])


  const dispatch = useDispatch();
  const param = useParams();

  const [name, setname] = useState('');
  const [desc, setdesc] = useState('');
  const [image, setimage] = useState('');
  const [size, setsize] = useState('');
  const [newsize, setnewsize] = useState([]);
  const [color, setcolor] = useState('');
  const [newcolor, setnewcolor] = useState([]);
  const [type, settype] = useState('');
  const [prize, setprize] = useState('');
  const [url, seturl] = useState('');
  const [imageChanged, setImageChanged] = useState(false);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setimage(file);
    setImageChanged(true);
  };

  useEffect(() => {
    if (imageChanged) {
      seturl(image.name);
      setImageChanged(false);
    }
  }, [image, imageChanged])

  async function handledata() {
    const file = Date.now() + image;
    const formdata = new FormData();
    formdata.append('type', type);
    formdata.append('name', name);
    formdata.append('url', url);
    formdata.append('file', image);
    formdata.append('desc', desc);
    formdata.append('prize', prize);


    newcolor.forEach((color, index) => {
      formdata.append('color', color);
    })
    newsize.forEach((size, index) => {
      formdata.append('size', size);
    });


    for (const entry of formdata.entries()) {
      console.log(entry);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_SITE_URL}/update/${param._id}`, {
        method: 'PUT',
        body: formdata
      });
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Parse the JSON data from the response
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }



  const removeSize = (index) => {
    setnewsize(prevSizes => {
      // Filter out the size at the specified index
      const updatedSizes = prevSizes.filter((val, idx) => idx !== index);
      return updatedSizes;
    });
  };
  const removeColor = (index) => {
    setnewcolor(prevSizes => {
      // Filter out the size at the specified index
      const updatedSizes = prevSizes.filter((val, idx) => idx !== index);
      return updatedSizes;
    });
  };

  function addsize(e) {
    setnewsize([...newsize, size]);
  }


  function addcolor(e) {
    setnewcolor([...newcolor, color]);
  }
  const handleRemoveImage = () => {
    setimage(null); // Reset the image state to null
  };

function handlepriseChange(e){
  setprize(e.target.value)
  console.log("prize", prize);
}

  return (
    <div>
      <Sidebar />
      <Header />

      <main id="main" className="main">
    

      <div className="layout-page">
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">

          <div className="pagetitle">
          {/* <h1>Profile</h1> */}
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
              <li className="breadcrumb-item">Product</li>
              <li className="breadcrumb-item active">Edit Product</li>
            </ol>
          </nav>
        </div>{/* End Page Title */}


            <div className="  app-ecommerce" >
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                <div className="d-flex flex-column justify-content-center">
                  <h4 className="mb-1 mt-3"> update   Product details </h4>
                  <p className="text-muted">Orders placed across your store</p>
                </div>
                <div className="d-flex align-content-center flex-wrap gap-3">
                  <button className="btn btn-label-secondary">Discard</button>
                  <button className="btn btn-label-primary">Save draft</button>
                  <Link to='/Listprod' >
                  <button type="submit" className="btn btn-primary" onClick={handledata} > Publish update </button>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-lg-8">
                  <div className="card mb-4">
                    <div className="card-header">
                      <h5 className="card-tile mb-0">Product information</h5>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="ecommerce-product-name">Name</label>
                        <input type="text"   value={name} onChange={(e) => setname(e.target.value)} className="form-control" id="name1" name="name1" placeholder="Product title"  htmlFor="name1" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="ecommerce-product-name">Description</label>
                        <textarea value={desc} onChange={(e) => setdesc(e.target.value)} type="text" className="form-control" id="ecommerce-product-name" placeholder="Product desc..."
                          name="productTitle" aria-label="Product title"
                          style={{
                            height: '100px',
                            padding: '10px',
                            outline: 'none',
                            resize: 'none'
                          }} />
                      </div>
                    </div>
                  </div>
                  <div className="card mb-4">
                    <div className="card-header">
                      <h5 className="card-tile mb-0">Product Image</h5>
                    </div>

                    <div className="card-body">
                      <div className="mb-3">
                        <label htmlFor="img" className="form-label">Image:</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {
                            <img
                              src={`${SITE_URL}/public/images/${url}`}
                              alt="Preview"
                              style={{ height: '60px', width: '70px', objectFit: 'cover', marginRight: '15px' }}
                            />
                          }

                          <input
                            type="file"
                            className="form-control"
                            id="img"
                            accept=".png,.jpg,.jpeg"
                            onChange={handleImageChange}
                          />

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mb-4">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Variants</h5>
                    </div>
                    <div className="card-body">
                      <div>
                        <label htmlFor="img" className="form-label"> Size</label>
                        <div>

                          {newsize.map((val, index) => {
                            return (
                              <>

                                <span key={index} className="badge bg-primary me-2 mb-2 ">
                                  <span className="badge bg-primary  " style={{ fontSize: '15px' }} >

                                    {val}
                                    {/* hello */}
                                  </span>
                                  <CloseIcon onClick={() => removeSize(index)} className=' bg-danger text-white  mb-1' style={{ height: '20px', width: '20px' }} />
                                </span>
                              </>
                            );
                          })}
                          <select className="form-select mb-2" onChange={(e) => setsize(e.target.value)}>
                            <option   >Select Size</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                          </select>

                          <button className="btn btn-secondary mt-1 mb-3" onClick={() => addsize(size)}> Add Size</button>
                        </div>
                        <label htmlFor="img" className="form-label"> Color</label>

                        <div>
                          {newcolor && newcolor.map((val, index) => (
                            <span key={index} className="badge bg-primary me-2 mb-2 ">
                              <span className="badge bg-primary  " style={{ fontSize: '15px' }} >
                                {val}
                              </span>

                              <CloseIcon onClick={() => removeColor(index)} className=' bg-danger text-white  mb-1' style={{ height: '20px', width: '20px' }} />

                            </span>

                          ))
                          }
                          <input type="text" className="form-control" value={color} placeholder='Add color' onChange={(e) => setcolor(e.target.value)} />
                          <button className="btn btn-secondary mt-2 mb-3" onClick={() => addcolor(color)} >Add Color</button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="col-12 col-lg-4">
                  {/* Pricing Card */}
                  <div className="card mb-4">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Pricing</h5>
                    </div>
                    <div className="card-body">
                      {/* Base Price */}
                      <div className="mb-3">
                        <label className="form-label" htmlFor="ecommerce-product-price">Base Price</label>
                        <input type="number" value={prize} onChange={(e) => handlepriseChange(e)} className="form-control" id="ecommerce-product-price" placeholder="Price" name="productPrice" aria-label="Product price" />
                      </div>
                      {/* Discounted Price */}
                      <div className="mb-3">
                        <label className="form-label" htmlFor="ecommerce-product-discount-price">Discounted Price</label>
                        <input type="number" className="form-control" id="ecommerce-product-discount-price" placeholder="Discounted Price" name="productDiscountedPrice" aria-label="Product discounted price" />
                      </div>
                      {/* Charge tax check box */}
                      <div className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" defaultValue id="price-charge-tax" defaultChecked />
                        <label className="form-label" htmlFor="price-charge-tax">
                          Charge tax on this product
                        </label>
                      </div>
                      {/* Instock switch */}
                      <div className="d-flex justify-content-between align-items-center border-top pt-3">
                        <span className="mb-0 h6">In stock</span>
                        <div className="w-25 d-flex justify-content-end">
                          <label className="switch switch-primary switch-sm me-4 pe-2">
                            <input type="checkbox" className="switch-input" defaultChecked />
                            <span className="switch-toggle-slider">
                              <span className="switch-on">
                                <span className="switch-off" />
                              </span>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Pricing Card */}
                  {/* Organize Card */}
                  <div className="card mb-4">
                    <div className="card-header">
                      <h5 className="card-title mb-0"> Type</h5>
                    </div>
                    <div className="card-body">
                      {/* Vendor */}
                      <div className="mb-3 col ecommerce-select2-dropdown">
                        <label className="form-label mb-1" >
                          Product Type
                        </label>
                      </div>
                      <select className="form-select mb-2" onChange={(e) => settype(e.target.value)}>
                        <option >{type}</option>
                        <option value="Hoodies">Hoodies</option>
                        <option value="Dresses">Dresses</option>
                        <option value="Suits">Suits</option>
                        <option value="Shoes">Shoes</option>
                        <option value="T-Shirts">T-Shirts</option>
                        <option value="Jeans">Jeans</option>
                        <option value="Jackets">Jackets</option>
                        <option value="Bags">Bags</option>
                      </select>
                      {/* Status */}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>


          {/* <div className="content-backdrop fade" /> */}
        </div>
        {/* Content wrapper */}
      </div>

      </main>



      <Footer />
    </div>
  )
}

export default Updprod
