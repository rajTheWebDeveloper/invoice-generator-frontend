import React, { ChangeEvent, FormEvent, useState } from 'react'
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { SignInDetailsType } from '../interfaces/interface'
import { SignInErrorsType } from '../interfaces/interface'
import ValidationError from './ValidationError'
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import { signInRequest } from '../store/AccessSlice';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const Login = () => {

    const dispatch=useAppDispatch()
    const {SIGN_IN_LOADING}=useAppSelector(state=>state.Access)
    const [inputs,setInputs]=useState<SignInDetailsType>({email:"",password:""})
    const [errors,setErrors]=useState<SignInErrorsType>({email:"",password:""})
    const [showPassword,setShowPassword]=useState(false)


    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>
    {
        setInputs((prev)=>
        {
            return {...prev,[e.target.name]:e.target.value}
        })
    }

    const handleErrors=()=>
    {
        const subErrors:SignInErrorsType={}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!inputs.email || !emailRegex.test(inputs.email)) {
            subErrors.email = 'Please enter a valid email'
        }
        if(!inputs.password)
        {
            subErrors.password='Please enter a valid password'
        }
        return subErrors
    }

    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>
    {
        e.preventDefault()
        const validationErrors = handleErrors();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            dispatch(signInRequest(inputs));
        }
        else 
        {
            return
        }
    }

    if(SIGN_IN_LOADING)
    {
        return <Loading />
    }

  return (
   <section className='w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
      <div className="container w-[90%] h-auto max-w-[500px] py-8 px-8 bg-white text-[#334155] flex flex-col items-center rounded">
        <h2 className='text-xl font-semibold mb-4'>Login To Invoice Generator</h2>
         <form action="" className='w-[100%] h-auto' onSubmit={handleSubmit}>
            <div className="email w-[100%] my-1">
                <label htmlFor="email">
                    Email
                    <input type="text" name='email' id='email' value={inputs.email} onChange={handleChange} className='w-[100%] rounded mt-1 outline-none border-[1px] border-[#cbd5e1] text-[#334155] py-1 px-2 min-h-[30px] bg-transparent focus:border-[#db2777]'/>
                </label>
                {errors.email?<ValidationError msg={errors.email}/>:null}
            </div>
            <div className="password relative w-[100%] my-1">
                <label htmlFor="password">
                    Password
                    <input type={showPassword?"text":"password"} name='password' id='password' value={inputs.password} onChange={handleChange} className='w-[100%] rounded mt-1 outline-none border-[1px] border-[#cbd5e1] text-[#334155] py-1 px-2 min-h-[30px] bg-transparent focus:border-[#db2777]'/>
                </label>
                <span onClick={()=>setShowPassword(!showPassword)} className={`absolute right-2 cursor-pointer ${errors.password?'top-[37%]':'top-[55%]'}`}>{showPassword?<IoMdEye size={23}/>:<IoMdEyeOff size={23}/>}</span>
                {errors.password?<ValidationError msg={errors.password}/>:null}
            </div>
            <button className='w-[100%] h-[30px] bg-[#db2777] text-white flex justify-center font-medium items-center my-4 rounded outline-none border-none'>Login</button>
            <p className='text-center'>Don't have an account? <Link to='/signup'><span className='text-[#db2777] text-base'>SignUp</span></Link></p>
         </form>
      </div>
   </section>
  )
}

export default Login