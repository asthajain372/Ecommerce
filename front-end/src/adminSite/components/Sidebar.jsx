import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate('/signup');
  }

  return (
    <div>
      {/* ======= Sidebar ======= */}
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link to='/admin/Dashboard' className="nav-link collapsed" href="index.html">
              <i className="bi bi-grid" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
              <i className="bi bi-layout-text-window-reverse" /><span>Products</span><i className="bi bi-chevron-down ms-auto" />
            </a>
            <ul id="tables-nav" className="nav-content collapse " style={{ TextDecoration: 'none' }} data-bs-parent="#sidebar-nav">

              <Link style={{ textDecoration: 'none' }} to='/Listprod'>
                <i className="bi bi-circle" />  <span    >  Product List</span>
              </Link>

              <Link style={{ textDecoration: 'none' }} to='/Addprod' href="tables-data.html">
                <i className="bi bi-circle" /> <span style={{ TextDecoration: 'none' }}  > Add Product</span>
              </Link>
            </ul>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
              <i className="bi bi-journal-text" /><span>Order</span><i className="bi bi-chevron-down ms-auto" />
            </a>
            <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
              <li>
                <Link style={{ textDecoration: 'none' }} to='/listorder' >
                  <i className="bi bi-circle" /><span> Order List</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">

            <a className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
              <i className="bi bi-person" /><span>Users</span> <i className="bi bi-chevron-down ms-auto" />
            </a>
            <ul id="charts-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
              <li>
                <Link style={{ textDecoration: 'none' }} to='/customer' >
                  <i className="bi bi-circle" /><span>All Users</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link to='/message' className="nav-link collapsed">
              <i className="bi bi-envelope" />
              <span>Messages</span>
            </Link>
          </li>

          {/* <li className="nav-item">
            <Link to='/profile'  className="nav-link collapsed">
              <i className="bi bi-person" />
              <span>Profile</span>
            </Link>
          </li> */}

          <li className="nav-item">
            <Link to='/product' className="nav-link collapsed">
              <i className="bi bi-box-arrow-in-right" />
              <span>Visit Front site </span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to='/' className="nav-link collapsed">
              <i className="bi bi-box-arrow-in-left" />
              <span onClick={handleLogout} style={{ cursor: 'pointer' }}  >Logout</span>
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default Sidebar
