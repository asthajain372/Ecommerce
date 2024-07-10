import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import * as XLSX from 'xlsx';

const Listorder = () => {

  const [product_list, setproduct_list] = useState([]);
  const [order_id, setorder_id] = useState('');
  const [line1, setline1] = useState('');
  const [city, setcity] = useState('');
  const [postal_code, setpostal_code] = useState('');
  const [state, setstate] = useState('');
  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [user_id, setuser_id] = useState('');
  // const[email , setemail] = useState('');

  const param = useParams();
  // console.log(param, "param");
  useEffect(() => {
    async function fetch_order() {
      const orders = await fetch(`${process.env.REACT_APP_SITE_URL}/order`);
      const data = await orders.json();
      const list = data.filter((val => val._id === param.id));
      setorder_id(list[0]._id);
      const address = list[0].address;
      setline1(address.line1);
      setcity(address.city);
      setpostal_code(address.postal_code);
      setstate(address.state);
      const user_details = list[0].user;
      setemail(user_details.email);
      setname(user_details.name);
      setuser_id(user_details.user_id);
      setproduct_list(list[0].products);
    }
    fetch_order();
  }, [])

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
      name: "Size",
      selector: (row) => row.size
    },
    {
      name: "Color",
      selector: (row) => row.color
    },
    {
      name: "Qty",
      selector: (row) => row.amount,
    },
    {
      name: "price",
      selector: (row) => row.prize * row.amount,
    },


  ];

  function downloadXLS() {
    const ws = XLSX.utils.json_to_sheet(product_list);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "People");
    XLSX.writeFile(wb, 'reports.xlsx');
  }


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
              <li className="breadcrumb-item active">Order List</li>
            </ol>
          </nav>
        </div>{/* End Page Title */}


        {/* Content wrapper */}
        <div className="content-wrapper">
          {/* Content */}
          <div className="container-xxl flex-grow-1 container-p-y">
         
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
              <div className="d-flex flex-column justify-content-center">
                {/* <h5 className="mb-1 mt-3">Order # {order_id} </h5> */}
                <h5 className="mb-1 mt-3">
  Order # <span className="text-muted">{order_id}</span>
</h5>
                
                
                </div>
             
            </div>
            {/* Order Details Table */}
            <div className="row">
              <div className="col-12 col-lg-8">
                <div className="card mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="card-title m-0">Order details</h5>
                    {/* <h6 className="m-0"><a href=" javascript:void(0)">Edit</a></h6> */}
                  </div>
                  <div className="card-datatable table-responsive">


                    <DataTable columns={columns}
                      data={product_list}
                      pagination
                      fixedHeader
                      fixedHeaderScrollHeight='465px'
                      selectableRows
                      selectableRowsHighlight
                      highlightOnHover
                    />

                    <div className="d-flex justify-content-end align-items-center m-3 mb-2 p-1">
                      <div className="order-calculations">
                        <div className="d-flex justify-content-between">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="col-12 col-lg-4">
                <div className="card mb-4">
                  <div className="card-header">
                    <h6 className="card-title m-0">Customer details</h6>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-start align-items-center mb-4">
                   
                      <div className="d-flex flex-column">
                        <a href="app-user-view-account.html" className="text-body text-nowrap">
                          {/* <h6 className="mb-0">Shamus Tuttle</h6> */}
                        </a>
                        <small className="text-muted"> Customer ID: #{user_id}</small></div>
                    </div>
                 
                    <div className="d-flex justify-content-between">
                      <h6>Contact info</h6>
                      {/* <h6><a href=" javascript:void(0)" data-bs-toggle="modal" data-bs-target="#editUser">Edit</a></h6> */}
                    </div>
                    <p className=" mb-0">Name: {name}</p>
                    <p className=" mb-1">Email: {email}</p>
                  </div>
                </div>
                <div className="card mb-4">

                <div className="card-header">
                    <h6 className="card-title m-0">Shipping address</h6>
                  </div>

              
                  <div className="card-body">
                    <p className="mb-0">{line1} <br />{city} <br />{state} <br />{postal_code}</p>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
          {/* / Content */}

        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Listorder
