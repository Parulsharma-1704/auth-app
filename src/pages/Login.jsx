import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess} from '../util'

const Login = () => {
    const [loginInfo,setLoginInfo]=useState({
        email: '',
        password: ''
    });

    const navigate=useNavigate();

    const handleChange=(e)=>{
        const {name,value}=e.target;
        //console.log(name,value);
        const copyLoginInfo={...loginInfo};
        copyLoginInfo[name]=value;
        setLoginInfo(copyLoginInfo);
    }
    //console.log('loginInfo -> ',loginInfo);

    const handleLogin=async(e)=>{
        e.preventDefault();
        const {email,password}=loginInfo;
        if(!email || !password){
            return handleError('credentials required');
        }
        try {
            const url='http://localhost:8080/auth/login';
            const response=await fetch(url,{
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result=await response.json();
            //console.log(result);
            const { success, message,jwtToken , name}=result;
            if(success){
                handleSuccess(message);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedInUser',name);
                setTimeout(()=>{
                    navigate('/home')
                },1000);
            }
            else if(result.error){
                handleError(result.error.details[0].message); //server side validation
            }
            else if(!success){
                handleError(message)
            }
        } catch (error) {
            handleError(error);
        }
    }

    return (
        <div className='flex flex-col mt-20 shadow-2xl w-110 rounded-2xl p-10'>
            <div className='w-full'>
                <h1 className='text-2xl font-bold'>Login</h1>
            </div>
            <div className='w-full'>
                <form onSubmit={handleLogin}>
                    <div className='flex flex-col mt-5'>
                        <label htmlFor='email' className='text-lg font-semibold'>Email</label>
                        <input type='email' name='email' value={loginInfo.email} placeholder='Enter your email...' className='border-b-2 text-sm mt-2 p-1' onChange={handleChange}/>
                    </div>
                    <div className='flex flex-col mt-5'>
                        <label htmlFor='password' className='text-lg font-semibold'>Password</label>
                        <input type='password' name='password' value={loginInfo.password} placeholder='Enter your password...' className='border-b-2 text-sm mt-2 p-1' onChange={handleChange}/>
                    </div>
                    <div className='bg-purple-700 mt-5 p-2.5 flex justify-center rounded'>
                        <button className='text-lg text-white font-semibold'>Login</button>
                    </div>
                    <div className='mt-5 pl-2'>Dont't have an account ? <Link to='/signup'><span className='border-b-1 border-blue-400'>Signup</span></Link></div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login