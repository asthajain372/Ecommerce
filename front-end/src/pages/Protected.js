import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
const Protected = ({Prop}) => {
    const navigate = useNavigate();
    // console.log(prop);

    useEffect(()=>{
        if(!localStorage.getItem('user')){
            navigate('/signup');
        }
    })

  return (
    <div>
     <Prop />
    </div>
  )
}

export default Protected
