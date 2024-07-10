import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Profile from '../../pages/Profile'


const Sidebar = () => {
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
          </li>{/* End Dashboard Nav */}

          <li className="nav-item">
            <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
              <i className="bi bi-layout-text-window-reverse" /><span>Products</span><i className="bi bi-chevron-down ms-auto" />
            </a>
            <ul id="tables-nav" className="nav-content collapse " style={{ TextDecoration: 'none' }} data-bs-parent="#sidebar-nav">

              <Link style={{ textDecoration: 'none' }} to='/Listprod'>
                <i className="bi bi-circle" />  <span    >  Product List</span>
              </Link>
              {/* <Link  to='/Listprod'>
          <i className="bi bi-circle" /> <span  to='/Listprod'   >  Product List</span>
          </Link> */}

              <Link style={{ textDecoration: 'none' }} to='/Addprod' href="tables-data.html">
                <i className="bi bi-circle" /> <span style={{ TextDecoration: 'none' }}  > Add Product</span>
              </Link>

              {/* <Link  style={{ textDecoration: 'none' }}  to='/'   href="tables-data.html">
        <i className="bi bi-circle" /> <span  style={{TextDecoration:'none'}}  > Category List</span>
        </Link> */}



            </ul>


          </li>{/* End Tables Nav */}


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
          </li>{/* End Forms Nav */}

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

          {/* <li className="nav-item">
            <a style={{ textDecoration: 'none' }} className="nav-link collapsed" href="pages-contact.html">
              <Link style={{ textDecoration: 'none' }} to='/message' >
                <i className="bi bi-envelope" /><span> Messages</span>
              </Link>
            </a>
          </li> */}


    
          <li className="nav-item">
            <Link to='/message'  className="nav-link collapsed">
              <i className="bi bi-envelope" />
              <span>Messages</span>
            </Link>
          </li>{/* End F.A.Q Page Nav */}


          <li className="nav-item">
    

      <Link to='/profile'  className="nav-link collapsed">
              <i className="bi bi-person" />
              <span>Profile</span>
            </Link>
    
          </li>{/* End Profile Page Nav */}

          

          <li className="nav-item">
            <Link to='/message'  className="nav-link collapsed">
              <i className="bi bi-question-circle" />
              <span>F.A.Q</span>
            </Link>
          </li>{/* End F.A.Q Page Nav */}

          <li className="nav-item">
            <a className="nav-link collapsed" href="pages-register.html">
              <i className="bi bi-card-list" />
              <span>Register</span>
            </a>
          </li>{/* End Register Page Nav */}
          <li className="nav-item">
            <a className="nav-link collapsed" href="pages-login.html">
              <i className="bi bi-box-arrow-in-right" />
              <span>Login</span>
            </a>
          </li>{/* End Login Page Nav */}
          <li className="nav-item">
            <a className="nav-link collapsed" href="pages-error-404.html">
              <i className="bi bi-dash-circle" />
              <span>Error 404</span>
            </a>
          </li>{/* End Error 404 Page Nav */}
          <li className="nav-item">
            <a className="nav-link collapsed" href="pages-blank.html">
              <i className="bi bi-file-earmark" />
              <span>Blank</span>
            </a>
          </li>{/* End Blank Page Nav */}
        </ul>
      </aside>{/* End Sidebar*/}
    </div>
  )
}

export default Sidebar
