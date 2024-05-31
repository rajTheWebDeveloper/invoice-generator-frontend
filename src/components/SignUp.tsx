import React, { ChangeEvent, FormEvent, useState } from 'react'
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

import { SignUpDetailsType } from '../interfaces/interface'
import { SignUpErrorsType } from '../interfaces/interface'
import ValidationError from './ValidationError'
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/Hooks';
import { signUpRequest } from '../store/AccessSlice';
import Loading from './Loading';

const SignUp = () => {


    const [inputs,setInputs]=useState<SignUpDetailsType>({name:"",email:"",password:"",confirmPassword:""})
    const [errors,setErrors]=useState<SignUpErrorsType>({name:"",email:"",password:"",confirmPassword:""})
    const [showPassword,setShowPassword]=useState(false)

    const dispatch=useAppDispatch()
    const {SIGN_UP_LOADING}=useAppSelector(state=>state.Access)


    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>
    {
        setInputs((prev)=>
        {
            return {...prev,[e.target.name]:e.target.value}
        })
    }

    const handleErrors=()=>
    {
        const subErrors:SignUpErrorsType={}
        if(!inputs.name)
        {
            subErrors.name='Please enter a valid name'
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!inputs.email || !emailRegex.test(inputs.email)) {
            subErrors.email = 'Please enter a valid email'
        }
        if(!inputs.password)
        {
            subErrors.password='Please enter a valid password'
        }
        if(!inputs.confirmPassword || inputs.password !== inputs.confirmPassword)
        {
            subErrors.confirmPassword="Passwords don't match. Please re-enter"
        }
        return subErrors
    }

    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>
    {
        e.preventDefault()
        const validationErrors = handleErrors();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            dispatch(signUpRequest(inputs));
        }
        else 
        {
            return
        }
    }

    if(SIGN_UP_LOADING)
    {
        return <Loading />
    }
  return (
   <section className='w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
      <div className="container w-[90%] h-auto max-w-[500px] py-6 px-8 bg-white text-[#334155] flex flex-col items-center rounded">
        <h2 className='text-xl font-semibold mb-4'>Register As New User</h2>
         <form action="" className='w-[100%] h-auto' onSubmit={handleSubmit}>
            <div className="name w-[100%] my-1">
                <label htmlFor="name">
                    Name
                    <input type="text" name='name' id='name' value={inputs.name} onChange={handleChange} className='w-[100%] rounded mt-1 outline-none border-[1px] border-[#cbd5e1] text-[#334155] py-1 px-2 min-h-[30px] bg-transparent focus:border-[#db2777]'/>
                </label>
                {errors.name?<ValidationError msg={errors.name}/>:null}
            </div>
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
            <div className="confirm-password relative w-[100%] my-1">
                <label htmlFor="confirm-password">
                    Confirm Password
                    <input type="password" name='confirmPassword' id='confirm-password' value={inputs.confirmPassword} onChange={handleChange} className='w-[100%] rounded mt-1 outline-none border-[1px] border-[#cbd5e1] text-[#334155] py-1 px-2 min-h-[30px] bg-transparent focus:border-[#db2777]'/>
                </label>
                {/* <span  className={`absolute right-2 cursor-pointer ${errors.confirmPassword?'top-[37%]':'top-[55%]'}`} title='Disabled'><IoMdEyeOff size={23}/></span> */}
                {errors.confirmPassword?<ValidationError msg={errors.confirmPassword}/>:null}
            </div>
            <button className='w-[100%] h-[30px] bg-[#db2777] text-white flex justify-center font-medium items-center my-4 rounded outline-none border-none'>Register</button>
            <p className='text-center'>Already have an account? <Link to='/signin'><span className='text-[#db2777] text-base'>SignIn</span></Link></p>
         </form>
      </div>
   </section>
  )
}

export default SignUp