import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Protected from './pages/Protected';
import Singleprod from './components/Singleprod';
import Cartpage from './pages/Cartpage';
// import Profile from './pages/Profile';
import { Profile } from "./adminSite/pages/Profile";
import Order from './pages/Order';
import Singleorder from './components/Singleorder';
import { Navigate } from "react-router-dom";
import Dashboard from "./adminSite/pages/Dashboard";
// import Listprod from './adminSite/pages/Listprod';
import Listprod from './adminSite/pages/Listprod';
import Updprod from './adminSite/pages/Updprod';
import Addprod from './adminSite/pages/Addprod';
import Listorder from "./adminSite/pages/Listorder";
import Orderdetail from "./adminSite/pages/Orderdetail";
import Customer from './adminSite/pages/Customer';
import Message from './adminSite/pages/Message';
// import Profile from "./pages/Profile";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/product" Component={() => <Protected  Prop={Products}  />}></Route>
        <Route path="/product/:id" Component={() => <Protected  Prop={Singleprod}  />}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>

        <Route path="/" element={<Navigate to="/admin/Dashboard" replace />} />

        <Route  path='/:id' element={<Singleprod/>} ></Route>
        <Route path="/cart" Component={() => <Protected  Prop={Cartpage}  />}></Route>
        <Route path="/profile" Component={() => <Protected  Prop={Profile}  />}></Route>
        <Route path="/order" Component={() => <Protected  Prop={Order}  />}></Route>
        <Route path="/admin/Dashboard" Component={() => <Protected  Prop={Dashboard}  />}></Route>
        <Route path="/customer" Component={() => <Protected  Prop={Customer}  />}></Route>
        <Route path="/message" Component={() => <Protected  Prop={Message}  />}></Route>
        <Route path="/profile" Component={() => <Protected  Prop={Profile}  />}></Route>
        <Route path="/order/:orderid/:prod_id/:p_id" Component={() => <Protected  Prop={Singleorder}  />}></Route>
        <Route path="/listprod" Component={() => <Protected  Prop={Listprod}  />}></Route>
        <Route path="/Updprod/:_id" Component={() => <Protected  Prop={Updprod}  />}></Route>
        <Route path="/Addprod" Component={() => <Protected  Prop={Addprod}  />}></Route>
        <Route path="/Listorder" Component={() => <Protected  Prop={Listorder}  />}></Route>
        <Route path="/orderdetail/:id" Component={() => <Protected  Prop={Orderdetail}  />}></Route>

        
      </Routes>
    </BrowserRouter>  
    </div>
  );
}

export default App;

