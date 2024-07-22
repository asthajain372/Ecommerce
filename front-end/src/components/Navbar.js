import React from 'react';
import { NavLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCardIcon from '@mui/icons-material/AddCard';
import { useNavigate } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
const Navbar = () => {
    const navigate = useNavigate();
    const auth = localStorage.getItem('user');

    function handleLogout() {
        localStorage.clear();
        navigate('/signup');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <div>
                    <NavLink className="navbar-brand ms-4 " to="/" style={{ fontWeight: 'bold' }}>Easy Buy</NavLink>
                </div>
                
                <div id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ color: 'blue' }} >
                        {auth && (
                            <>
                                <li className="nav-item ">
                                    {/* <NavLink className="nav-link" to='/'>Travel expense</NavLink> */}
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='/product'>Products</NavLink>
                                </li>
                                <li className="nav-item">
                                    {/* <NavLink className="nav-link" to='/profile'>Profile</NavLink> */}
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='/Order'>Order</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        {auth ? (
                            <>
                                <li className="nav-item">
                                    {/* <NavLink className="nav-link" to='/favorites'><FavoriteIcon /></NavLink> */}
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='/cart'><AddCardIcon /></NavLink>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='/signup'>Signup</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='/login'>Login</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
