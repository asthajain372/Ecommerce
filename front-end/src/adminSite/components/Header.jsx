import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [authuser, setauthuser] = useState('');
  // const [datarole, setDatarole] = useState('');



  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setauthuser(parsedUser);
        } catch (error) {
            console.error('Failed to parse user from localStorage:', error);
        }
    }
  }, []);
  

  function handleLogout() {
    localStorage.clear();
    navigate('/signup');
  }

  const handleToggle = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div>
      {/* ======= Header ======= */}
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <Link style={{ textDecoration: 'none' }} to='/admin/Dashboard' className="logo d-flex align-items-center">
            <span className="d-none d-lg-block">Prime Mart </span>
          </Link>

          <nav class="navbar navbar-expand-xl ">
            <div class="container-fluid">
              <button class="navbar-toggler" onClick={handleToggle} type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

            </div>
          </nav>
        </div>
        <div className="search-bar">
          <form className="search-form d-flex align-items-center" method="POST" action="#">
          </form>
        </div>
        <nav className="header-nav ms-auto  navbar navbar-expand-lg  ">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search" />
              </a>
            </li>
            <li className="nav-item dropdown pe-3">
              <a className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
                <img src={authuser.url} alt="Profile" className="rounded-circle pe-3" />
                <span className="d-none d-md-block dropdown-toggle ps-2">{authuser.name}</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{authuser.name}</h6>
                  <span>{authuser.email}</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center" >
                    <i className="bi bi-person" />
                    <span>{authuser.type}</span>
                  </a>
                </li>
                {/* <li>
                  <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                    <i className="bi bi-gear" />
                    <span>Account Settings</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center" href="pages-faq.html">
                    <i className="bi bi-question-circle" />
                    <span>Need Help?</span>
                  </a>
                </li> */}
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center">
                    <i className="bi bi-box-arrow-right" />
                    <span onClick={handleLogout} style={{ cursor: 'pointer' }} >Sign Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>



      <aside id="navbarText" className="collapse navbar-collapse  pb-4 " >

        <ul className="sidebar-nav" id="sidebar-nav">

          <div className='mobile-nav' >

            <li className="nav-item">
              <Link to='/admin/Dashboard' className="nav-link collapsed">
                <i className="bi bi-grid" />
                <span>Dashboard</span>
              </Link>
            </li>{/* End Dashboard Nav */}

            <li className="nav-item">
              <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" >
                <i className="bi bi-layout-text-window-reverse" /><span>Products</span><i className="bi bi-chevron-down ms-auto" />
              </a>
              <ul id="tables-nav" className="nav-content collapse " style={{ TextDecoration: 'none' }} data-bs-parent="#sidebar-nav">

                <Link style={{ textDecoration: 'none' }} to='/Listprod'>
                  <i className="bi bi-circle" />  <span    >  Product List</span>
                </Link>

                <Link style={{ textDecoration: 'none' }} to='/Addprod'>
                  <i className="bi bi-circle" /> <span style={{ TextDecoration: 'none' }}  > Add Product</span>
                </Link>
              </ul>
            </li>{/* End Tables Nav */}

            <li className="nav-item">
              <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" >
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
              <a className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse">
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
          </div>
        </ul>
      </aside>

    </div>
  )
}

export default Header
