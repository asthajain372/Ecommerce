
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import DataTable from 'react-data-table-component'
import { Button } from 'react-bootstrap'
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom'

const Listprod = () => {

  const [pro_list, setpro_list] = useState([]);
  const [search, setsearch] = useState('');
  const [filtered, setfiltered] = useState([]);
  // const[ Product_flag , set_product_flag ] = useState(false);

  // PascalCase
  // sanke_case  - python 
  // camleCase  - javascript
  // kabak-case

  async function fetch_product() {
    const prod_data = await fetch(`${process.env.REACT_APP_SITE_URL}/product`);
    const data = await prod_data.json();
    console.log("data", data);

    const productData = localStorage.getItem('productdata');
    console.log("parsedProductData" , JSON.parse(productData));

    setfiltered(data);
    setpro_list(data);
  }

  useEffect(() => {
    fetch_product();
  }, []);


  useEffect(() => {
    const filtered_data = pro_list.filter(data => data.name.toLowerCase().match(search.toLowerCase()));
    console.log(filtered_data);
    setfiltered(filtered_data);
  }, [search]);

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
      )
    },
    // {
    //   name: "Delete",
    //   cell: (row) => (
    //   <Button className="btn btn-danger"   onClick={() => deleteProduct(row._id)}  > Delete </Button>
    //   )
    // },
  ];

  return (
    <div>
      <Sidebar />
      <main id="main" className="main" >
      <Header/>
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
                data={filtered}
                // data={filtered .map((item) => ({
                //   ...item,
                // }))}
                // title='Product List'
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

export default Listprod