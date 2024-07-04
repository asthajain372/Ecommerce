import React from 'react'
import data from './data';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux'
import { nextSlide , prevSlide ,dotSlide} from '../features/slice/sliderSlice';
import RightIcon from '@mui/icons-material/ChevronRight';
import LeftIcon from '@mui/icons-material/ChevronLeft';
const Slider = () => {
 const dispatch = useDispatch();
  const sliderno = useSelector((state)=>state.sliderslice.value);
  console.log(sliderno);

  return (
    <div>
        {/* <h1> slider </h1> */}
      {data.map((val)=>{
        return (
          <div key={val.id} >
            {val.id ==sliderno ?  <img style={{ paddingBottom:'40px', height:'600px' , width:'1536px' }} src={val.img} /> : null}
          </div>
          );
      })}   

    <div className='sliderpoint'>  
      {data.map((val)=>{
        return (
          <div key={val.id} >
            {/* {val.id ==sliderno ?  <img  style={{height:'500px' , width:'600px' }} src={val.img} /> : null} */}
          <div   onClick={()=>dispatch(dotSlide(val.id))}   className =  { val.id == sliderno ?  " slide bg-primary rounded-full p-2 m-2 cursor-pointer " : " slide bg-secondary rounded-full p-2 m-2 cursor-pointer" } > </div> 
          </div>
          );
      })}   
    </div>
          {/* <button className='prev-btn' onClick={()=>dispatch(prevSlide(sliderno-1))} > prev </button> */}
          {/* <button className='next-btn' onClick={()=>dispatch(nextSlide(sliderno+1))} > next </button> */}
          <div className='prev-btn' onClick={()=>dispatch(prevSlide(sliderno-1))}  > <LeftIcon/>  </div>
          <div  className='next-btn' onClick={()=>dispatch(nextSlide(sliderno+1))}> <RightIcon/>  </div>  
    </div>
  )
}

export default Slider
