import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess} from '../util'

const Signup = () => {
    const [signupInfo,setSignupInfo]=useState({
        name: "",
        email: '',
        password: ''
    });

    const navigate=useNavigate();

    const handleChange=(e)=>{
        const {name,value}=e.target;
        //console.log(name,value);
        const copySignupInfo={...signupInfo};
        copySignupInfo[name]=value;
        setSignupInfo(copySignupInfo);
    }
    //console.log('signupInfo -> ',signupInfo);

    const handleSignup=async(e)=>{
        e.preventDefault();
        const {name,email,password}=signupInfo;
        if(!name || !email || !password){
            return handleError('credentials required');
        }
        try {
            const url='http://localhost:8080/auth/signup';
            const response=await fetch(url,{
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result=await response.json();
            //console.log(result);
            const { success, message}=result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login')
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
                <h1 className='text-2xl font-bold'>Signup</h1>
            </div>
            <div className='w-full'>
                <form onSubmit={handleSignup}>
                    <div className='flex flex-col mt-5'>
                        <label htmlFor='name' className='text-lg font-semibold'>Name</label>
                        <input type='text' name='name' value={signupInfo.name} autoFocus placeholder='Enter your name...' className='border-b-2 text-sm mt-2 p-1' onChange={handleChange}/>
                    </div>
                    <div className='flex flex-col mt-5'>
                        <label htmlFor='email' className='text-lg font-semibold'>Email</label>
                        <input type='email' name='email' value={signupInfo.email} placeholder='Enter your email...' className='border-b-2 text-sm mt-2 p-1' onChange={handleChange}/>
                    </div>
                    <div className='flex flex-col mt-5'>
                        <label htmlFor='password' className='text-lg font-semibold'>Password</label>
                        <input type='password' name='password' value={signupInfo.password} placeholder='Enter your password...' className='border-b-2 text-sm mt-2 p-1' onChange={handleChange}/>
                    </div>
                    <div className='bg-purple-700 mt-5 p-2.5 flex justify-center rounded'>
                        <button className='text-lg text-white font-semibold'>Signup</button>
                    </div>
                    <div className='mt-5 pl-2'>Already have an account ? <Link to='/login'><span className='border-b-1 border-blue-400'>Login</span></Link></div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Signup