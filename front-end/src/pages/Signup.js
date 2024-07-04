import React, { useState } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirm, setconfirm] = useState('');
    const [type, setType] = useState('');

    const Navigate = useNavigate();
    async function handledata() {

        console.log(name, email, password, confirm );
        if (password != confirm) {
            alert('password does not match ');
        } else {
            const data = { name, password, email, confirm , type };

            let response = await fetch(
                `${process.env.REACT_APP_SITE_URL}/signup`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }
            );

            response = await response.json();
            console.log(response);

            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', JSON.stringify(response.auth));

            if (response) {
                Navigate('/login');
            }

        }
    }

    return (
        <div>
            <section className="vh-100" style={{ backgroundColor: " #eee" }}>
                <div className="container h-70 ">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black mt-4 " style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-4">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form className="mx-1 mx-md-4">

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" onChange={(e) => setname(e.target.value)} className="form-control" placeholder='Enter your name' />
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" onChange={(e) => setemail(e.target.value)} className="form-control" placeholder='Enter Your Email' />
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" onChange={(e) => setpassword(e.target.value)} className="form-control" placeholder='Enter your Password' />
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" onChange={(e) => setconfirm(e.target.value)} id="form3Example4cd" className="form-control" placeholder='Confirm password' />
                                                    </div>
                                                </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <div className="form-outline flex-fill mb-0">
                                                    <select onChange={(e) => setType(e.target.value)} id="formSelectRole" className="form-select">
                                                        <option value="buyer" >Buyer</option>
                                                        <option value="seller"> Seller</option>
                                                    </select>
                                                </div>
                                            </div>

                                                <div className="form-check d-flex justify-content-center mb-4">
                                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                    <label className="form-check-label">
                                                        I agree all statements in <a href="#!">Terms of service</a>
                                                    </label>
                                                </div>

                                                <div className="d-flex justify-content-center  mb-3 mb-lg-4">
                                                    <button type="button" onClick={handledata} className="btn btn-primary btn-lg">Sign Up</button>
                                                </div>

                                                <p className="text-center text-muted mb-2">Have already an account?
                                                    <Link className="fw-bold text-body" to='/login' > Login here </Link> </p>


                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src={`${process.env.REACT_APP_SITE_URL}/public/images/Travel.jpg`}
                                        className="img-fluid" 
                                            />
             
                                            {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid" alt="Sample image" /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup
