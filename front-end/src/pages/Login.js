import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Login = () => {
  const[email , setemail ] = useState('');
  const [password  , setpassword ] = useState('');
  const navigate = useNavigate();
async function handledata(){

  // console.log(name , password);
  const credential = { email , password }  ;
  // console.log(data);
  let data = await fetch(`${process.env.REACT_APP_SITE_URL}/login`,{
    
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(credential)  
  });

   data =  await data.json();

   console.log(data);

   if(data){
    localStorage.setItem('user',JSON.stringify(data.existinguser) );
    localStorage.setItem('token',JSON.stringify(data.token) );
    localStorage.setItem('roles',JSON.stringify(data.existinguser.roles) );
    // localStorage.setItem('user',JSON.stringify(data.existinguser) );
    console.log(data.existinguser.roles[0].roles);
    if(data.existinguser.roles[0].roles == 'Buyer'){
      navigate('/');
    }else{
      navigate('/Listprod');
    }
   }
}
  return (
    <div className='' >
<section className="vh-100 bg-image"
  style={{backgroundImage:" url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}>
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{borderRadius: "15px"}}>
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Login In</h2>

              <form>
                <div className="form-outline mb-4">
                  <label className="form-label"> Enter Your Email</label>
                  <input type="email"  onChange={(e)=>setemail(e.target.value)} className="form-control form-control-lg" />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" >Password</label>
                  <input type="password" onChange={(e)=>setpassword(e.target.value)}   className="form-control form-control-lg" />
                </div>

                <div className="form-check d-flex justify-content-center mb-5">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                  <label className="form-check-label" >
                    I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                  </label>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="button" onClick={handledata}
                    className="btn  btn-block gradient-custom-4  btn-primary btn-lg ">Login</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">Don't Have an account? 
                
                {/* <a href="#!"
                    className="fw-bold text-body"><u>SignUp here</u></a> */}
          
                    <Link className="fw-bold text-body" to='/signup' > SignUp here </Link>                    
                    </p>
              </form>
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

export default Login
