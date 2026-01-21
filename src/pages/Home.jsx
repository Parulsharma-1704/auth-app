import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../util';

const Home = () => {
  const [loggedInUser,setLoggedInUser]=useState("");
  const [products,setProducts]=useState([]);

  const navigate=useNavigate();

  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  },[])

  const handleLogout=(e)=>{
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      handleSuccess('Logout successfully');
      setTimeout(()=>{
        navigate('/login');
      },1000);
  }

  const fetchProducts=async()=>{
    try {
      const url='http://localhost:8080/products';
      const headers={
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      };
      const response=await fetch(url,headers);
      const result=await response.json();
     // console.log(result);
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  }

  useEffect(()=>{
    fetchProducts();
  },[]);

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <div className='bg-purple-700 mt-5 p-2.5 flex justify-center rounded'>
    <button className='text-lg text-white font-semibold' onClick={handleLogout}>Logout</button>
</div>
    <div>
      {
        products?.map((item,index)=>{
          return <div key={index}>{item.name} , {item.price}</div>
        })
      }
    </div>
      <ToastContainer />
    </div>
  )
}

export default Home