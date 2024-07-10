import React from 'react'
import Slider from '../components/Slider'
// import Button from '../components/Button'
import Newbuttons from '../components/Newbuttons'
import Filterdprod from '../components/Filterdprod'
import { useEffect , useState } from 'react'
import Sidebar from '../adminSite/components/Sidebar'
import Header from '../adminSite/components/Header'
import Navbar from '../components/Navbar'

const Products = () => {
  // const [productData, setProductData] = useState([]);
  useEffect(()=>{
    async function getdata (){
        let productdata = await fetch(`${process.env.REACT_APP_SITE_URL}/product`);
        productdata = await productdata.json();

        localStorage.setItem('productdata',JSON.stringify(productdata));
        // console.log(productdata);
        // setProductData(productdata);
    }
    getdata();
 },[]);

 

  return (
    <div>
      <Navbar/> 
      {/* <Slider/> */}
      {/* <Button/> */}
      {/* 
            <Sidebar/>
            <Header/> */}
      <Newbuttons/>
    
      {/* <Filterdprod/> */}

    </div>
  )
}

export default Products
// export {productdata}
