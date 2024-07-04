import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import * as XLSX from 'xlsx';


const Listorder = () => {
  const SITE_URL = process.env.REACT_APP_SITE_URL;
const [order_list , setorder_list] = useState([]);
const [search, setsearch] = useState('');

    useEffect(()=>{
        async function fetch_order(){

            const orders = await fetch(`${SITE_URL}/order`);
            const data = await orders.json();
            setorder_list(data);
            console.log("order_list", order_list);
        }
        fetch_order();
    },[])

    const columns = [
        {
          name: "OrderId",
          selector: (row) => row._id,
        },
        {
          name: "UserId",
          selector: (row) => row.user.user_id,
        },
        {
          name: "OrderDate",
          selector: (row) => row.createdAt.split('T')[0]
        },
        {
          name: "Customer name",
          selector: (row) => row.user.name,
        },
        {
          name: "Product Qty",
          selector: (row) => row.products.length,
        },
        {
            name: "Total Amount",
            selector: (row) => {
                const totalAmount = row.products.reduce((total, product) => total + parseFloat(product.prize), 0);
                return `₹ ${totalAmount.toFixed(2)}`; // Assuming you want to display total with 2 decimal places
            }
        },
        {
          name: "Address",
          selector: (row) => `${row.address.postal_code} ${row.address.line1}  ${row.address.city}`,
        },
        {
            name: "Action",
            cell: (row) => (
                <Link style={{ textDecoration: 'none' }} to={`/orderdetail/${row._id}`} >
                <Button > Details </Button>
              </Link>            )
          },
   
      ];

      function downloadXLS() {
        const ws = XLSX.utils.json_to_sheet(order_list);
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

      
      <section className="section profile">
        <div>
        
          <div className="card">
            <div className="card-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '30px', paddingRight: '30px' }}>
                <div>
                  <h5 style={{ paddingTop: '15px' }} >Order List</h5>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                  <div style={{ paddingLeft: '30px', paddingRight: '30px', paddingTop: '7px' }}  >

                    <input
                      type='text'
                      value={search}
                      onChange={(e) => setsearch(e.target.value)}
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
            </div>
            <DataTable columns={columns}
              data={order_list}
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

export default Listorder
