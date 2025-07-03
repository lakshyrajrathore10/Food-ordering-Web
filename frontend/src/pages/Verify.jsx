import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Storecontext } from '../context/Storecontext';
import axios from 'axios';


const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const { url } = useContext(Storecontext);

  const verifyPayment = async() =>{
    const response = await axios.post(url+"/api/order/verify",{success,orderId});
    if(response.data.success){
     navigate("/myorders");
    }
    else{
        navigate("/")
    }
  }
  useEffect(()=>{
   verifyPayment();
  },[])
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Verify;
