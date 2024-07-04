import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Export from "react-data-table-component"
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import DataTable from 'react-data-table-component'
import { Button } from 'react-bootstrap'
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom'



const Listprod = () => {
  const dispatch = useDispatch();
  // const param = useParams();
  // const singledata = useSelector((state) => state.productSlice.singleProduct);
  // const singleproduct = singledata.filter(data => data._id === param.id)

  const [pro_list, setpro_list] = useState([]);
  const [search, setsearch] = useState('');
  const [filtered, setfiltered] = useState([]);

  async function fetch_product() {
    const prod_data = await fetch(`${process.env.REACT_APP_SITE_URL}/product`);
    const data = await prod_data.json();
    console.log("data", data);

    const productData = localStorage.getItem('productdata');
    // const parsedProductData = JSON.parse(productData);
    console.log("parsedProductData" , JSON.parse(productData));

    setfiltered(data);
    setpro_list(data);
  }

  useEffect(() => {
    fetch_product();
  }, []);


  useEffect(() => {
    // const filtered_data  = pro_list.filter(data =>  data._id.match(search));
    const filtered_data = pro_list.filter(data => data.name.toLowerCase().match(search.toLowerCase()));
    console.log(filtered_data);
    setfiltered(filtered_data);
    // filtered_data();
  }, [search])

  function downloadXLS() {
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "People");
    XLSX.writeFile(wb, 'reports.xlsx');
  }


  async function deleteProduct(id){
    let result = await fetch(`${process.env.REACT_APP_SITE_URL}/product/${id}`,{
        method:'delete'
    });
    result = await result.json();
    if(result){
        alert("record is deleted");
        localStorage.setItem('productdata',JSON.stringify(result));     

        setfiltered(result);
        console.log("result" , result);
    }
}

  const columns = [
    {
      name: "Product",
      selector: (row) => <img style={{ height: '70px', width: '70px', padding: '10px', objectFit: 'cover' }} src={`${process.env.REACT_APP_SITE_URL}/public/images/${row.url}`} />,
    },
    {
      name: "Product name",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Product Type",
      selector: (row) => row.type,
      sortable: true
    },
    {
      name: "Size",
      selector: (row) => row.size.map((val) => {
        return (
          <>
            <span> {val}  </span>,
          </>
        )
      }),
    },
    {
      name: "Color",
      selector: (row) => row.color.map((val) => {
        return (
          <>
            <span> {val}</span> ,
          </>
        )
      })
    },
    {
      name: "price",
      selector: (row) => row.prize,
    },
    {
      name: "Edit",
      cell: (row) => (
        <Link style={{ textDecoration: 'none' }} to={`/Updprod/${row._id}`} >
        <Button > Edit </Button>
      </Link>
      //   <Link style={{ textDecoration: 'none' }} to={`/Updprod/${row._id}`} >
      //   <Button onClick={() => dispatch(singlereducer(row._id))} > Edit </Button>
      // </Link>
      )
    },
    {
      name: "Delete",
      cell: (row) => (
<Button className="btn btn-danger"   onClick={() => deleteProduct(row._id)}  > Delete </Button>
      )
    },
  ];

  return (
    <div>
      <Sidebar />
      <Header />
      <main id="main" className="main">
        <div className="pagetitle">
          {/* <h1>Profile</h1> */}
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
              <li className="breadcrumb-item">Product</li>
              <li className="breadcrumb-item active">Product List</li>
            </ol>
          </nav>
        </div>{/* End Page Title */}

        
        <section className="section profile">
          <div>
            {/* <h4 className="py-3 mb-4">
              <span className="text-muted fw-light">eCommerce /</span> Product List
            </h4> */}
            {/* Product List Widget */}
            {/* <div className="card mb-4">
              <div className="card-widget-separator-wrapper">
                <div className="card-body card-widget-separator">
                  <div className="row gy-4 gy-sm-1">
                    <div className="col-sm-6 col-lg-3">
                      <div className="d-flex justify-content-between align-items-start card-widget-1 border-end pb-3 pb-sm-0">
                        <div>
                          <h6 className="mb-2">In-store Sales</h6>
                          <h4 className="mb-2">$5,345.43</h4>
                          <p className="mb-0"><span className="text-muted me-2">5k orders</span><span className="badge bg-label-success">+5.7%</span></p>
                        </div>
                        <div className="avatar me-sm-4">
                          <span className="avatar-initial rounded bg-label-secondary">
                            <i className="bx bx-store-alt bx-sm" />
                          </span>
                        </div>
                      </div>
                      <hr className="d-none d-sm-block d-lg-none me-4" />
                    </div>
                    <div className="col-sm-6 col-lg-3">
                      <div className="d-flex justify-content-between align-items-start card-widget-2 border-end pb-3 pb-sm-0">
                        <div>
                          <h6 className="mb-2">Website Sales</h6>
                          <h4 className="mb-2">$674,347.12</h4>
                          <p className="mb-0"><span className="text-muted me-2">21k orders</span><span className="badge bg-label-success">+12.4%</span></p>
                        </div>
                        <div className="avatar me-lg-4">
                          <span className="avatar-initial rounded bg-label-secondary">
                            <i className="bx bx-laptop bx-sm" />
                          </span>
                        </div>
                      </div>
                      <hr className="d-none d-sm-block d-lg-none" />
                    </div>
                    <div className="col-sm-6 col-lg-3">
                      <div className="d-flex justify-content-between align-items-start border-end pb-3 pb-sm-0 card-widget-3">
                        <div>
                          <h6 className="mb-2">Discount</h6>
                          <h4 className="mb-2">$14,235.12</h4>
                          <p className="mb-0 text-muted">6k orders</p>
                        </div>
                        <div className="avatar me-sm-4">
                          <span className="avatar-initial rounded bg-label-secondary">
                            <i className="bx bx-gift bx-sm" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-2">Affiliate</h6>
                          <h4 className="mb-2">$8,345.23</h4>
                          <p className="mb-0"><span className="text-muted me-2">150 orders</span><span className="badge bg-label-danger">-3.5%</span></p>
                        </div>
                        <div className="avatar">
                          <span className="avatar-initial rounded bg-label-secondary">
                            <i className="bx bx-wallet bx-sm" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* Product List Table */}


            <div className="card">
              <div className="card-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '30px', paddingRight: '30px' }}>
                  <div>
                    <h5 style={{ paddingTop: '15px' }} >Product List</h5>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                    <div style={{ paddingLeft: '30px', paddingRight: '30px', paddingTop: '7px' }}  >

                      <input
                        type='text'
                        value={search}
                        onChange={(e) => setsearch(e.target.value)}
                        // actions={<Button onClick={() => downloadXLS()}>Export</Button>}
                        placeholder='Search here'
                        className=' form-control'
                      />
                    </div>
                    <div>
                      <Button style={{ marginTop: '7px' }} onClick={() => downloadXLS()}>Export</Button>
                    </div>

                    <Link to='/Addprod' >
                      <Button style={{ marginTop: '7px'  , marginLeft:'20px' }} >Add product</Button>
                    </Link>
                  </div>
                </div>
                {/* <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h5 className="card-title">Product List</h5>
                  </div>
                  <div>
                    <Button onClick={() => downloadXLS()}>Export</Button>
                  </div>
                </div> */}
              </div>
              <DataTable columns={columns}
                data={filtered}
                // data={filtered .map((item) => ({
                //   ...item,
                // }))}
                // title='Product List'
                pagination
                fixedHeader
                fixedHeaderScrollHeight='465px'
                selectableRows
                selectableRowsHighlight
                highlightOnHover
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Listprod