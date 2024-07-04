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
  const [search, setsearch] = useState('');
  const param = useParams();
  console.log(param, "param");
  useEffect(() => {
    async function fetch_order() {
      const orders = await fetch(`${process.env.REACT_APP_SITE_URL}/order`);
      const data = await orders.json();
      const list = data.filter((val => val._id === param.id));
      // console.log("product_list", product_list);
      console.log("list", list);
      console.log("product", list[0].products);
      setproduct_list(list[0].products);
      console.log("product_list", product_list);
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
            <h4 className="py-3 mb-4">
              <span className="text-muted fw-light">eCommerce /</span> Order Details
            </h4>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
              <div className="d-flex flex-column justify-content-center">
                <h5 className="mb-1 mt-3">Order #32543 <span className="badge bg-label-success me-2 ms-2">Paid</span> <span className="badge bg-label-info">Ready to Pickup</span></h5>
                <p className="text-body">Aug 17, <span id="orderYear" />, 5:48 (ET)</p>
              </div>
              <div className="d-flex align-content-center flex-wrap gap-2">
                <button className="btn btn-label-danger delete-order">Delete Order</button>
              </div>
            </div>
            {/* Order Details Table */}
            <div className="row">
              <div className="col-12 col-lg-8">
                <div className="card mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="card-title m-0">Order details</h5>
                    <h6 className="m-0"><a href=" javascript:void(0)">Edit</a></h6>
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
                      <div className="avatar me-2">
                        <img src="../../assets/img/avatars/1.png" alt="Avatar" className="rounded-circle" />
                      </div>
                      <div className="d-flex flex-column">
                        <a href="app-user-view-account.html" className="text-body text-nowrap">
                          <h6 className="mb-0">Shamus Tuttle</h6>
                        </a>
                        <small className="text-muted">Customer ID: #58909</small></div>
                    </div>
                    <div className="d-flex justify-content-start align-items-center mb-4">
                      <span className="avatar rounded-circle bg-label-success me-2 d-flex align-items-center justify-content-center"><i className="bx bx-cart-alt bx-sm lh-sm" /></span>
                      <h6 className="text-body text-nowrap mb-0">12 Orders</h6>
                    </div>
                    <div className="d-flex justify-content-between">
                      <h6>Contact info</h6>
                      <h6><a href=" javascript:void(0)" data-bs-toggle="modal" data-bs-target="#editUser">Edit</a></h6>
                    </div>
                    <p className=" mb-1">Email: Shamus889@yahoo.com</p>
                    <p className=" mb-0">Mobile: +1 (609) 972-22-22</p>
                  </div>
                </div>
                <div className="card mb-4">
                  <div className="card-header d-flex justify-content-between">
                    <h6 className="card-title m-0">Shipping address</h6>
                    <h6 className="m-0"><a href=" javascript:void(0)" data-bs-toggle="modal" data-bs-target="#addNewAddress">Edit</a></h6>
                  </div>
                  <div className="card-body">
                    <p className="mb-0">45 Roker Terrace <br />Latheronwheel <br />KW5 8NW,London <br />UK</p>
                  </div>
                </div>
                <div className="card mb-4">
                  <div className="card-header d-flex justify-content-between">
                    <h6 className="card-title m-0">Billing address</h6>
                    <h6 className="m-0"><a href=" javascript:void(0)" data-bs-toggle="modal" data-bs-target="#addNewAddress">Edit</a></h6>
                  </div>
                  <div className="card-body">
                    <p className="mb-4">45 Roker Terrace <br />Latheronwheel <br />KW5 8NW,London <br />UK</p>
                    <h6 className="mb-0 pb-2">Mastercard</h6>
                    <p className="mb-0">Card Number: ******4291</p>
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
