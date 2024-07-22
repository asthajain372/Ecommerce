import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import * as XLSX from 'xlsx';

const Customer = () => {

  const SITE_URL = process.env.REACT_APP_SITE_URL;
  const [user_list, setuser_list] = useState([]);
  const [search, setsearch] = useState('');

  useEffect(() => {
    async function fetch_order() {

      const orders = await fetch(`${SITE_URL}/getusers`);
      const data = await orders.json();
      setuser_list(data);
      console.log("order_list", data);
    }
    fetch_order();
  }, [])

  const columns = [
    {
      name: "UserId",
      selector: (row) => row._id,
    },
    {
      name: "User Type",
      selector: (row) => row.type,
    },
    {
      name: "User Email",
      selector: (row) => row.email,
    },
    {
      name: "User name",
      selector: (row) => row.name,
    },
    {
      name: "Registered on",
      selector: (row) => row.createdAt.split('T')[0]
    },
  ];

  function downloadXLS() {
    const ws = XLSX.utils.json_to_sheet(user_list);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "People");
    XLSX.writeFile(wb, 'reports.xlsx');
  }


  return (
    <div>
      <Sidebar />
      <main id="main" className="main">
      <Header />
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
              <li className="breadcrumb-item">Product</li>
              <li className="breadcrumb-item active">User List</li>
            </ol>
          </nav>
        </div>{/* End Page Title */}


        <section className="section profile">
          <div>

            <div className="card">
              <div className="card-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '30px', paddingRight: '30px' }}>
                  <div>
                    <h5 style={{ paddingTop: '15px' }} >User List</h5>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                    <div>
                      <Button style={{ marginTop: '7px' }} onClick={() => downloadXLS()}>Export</Button>
                    </div>
                  </div>
                </div>
              </div>
              <DataTable columns={columns}
                data={user_list}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='465px'
                // selectableRows
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

export default Customer
