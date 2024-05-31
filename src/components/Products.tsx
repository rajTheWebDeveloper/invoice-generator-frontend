import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/Hooks'
import { ProductErrorsType, ProductsType } from '../interfaces/interface'
import { addProductRequest, downloadInvoiceRequest, getProductsRequest } from '../store/AccessSlice'
import ValidationError from './ValidationError'
import { Link } from 'react-router-dom'

const Products = () => {


  let {token,products}=useAppSelector(state=>state.Access)
  let dispatch=useAppDispatch()
  const [productData,setProductData]=useState<ProductsType>({
    productName:"",
    productQuantity:0,
    productRate:0
  })

  const [total,setTotal]=useState(0)
  const [errors,setErrors]=useState<ProductErrorsType>({productName:"",productQuantity:"",productRate:""})

  let handleChange=(e:ChangeEvent<HTMLInputElement>)=>
   {
     setProductData((prev)=>
    {
        if(e.target.name==='productQuantity' || e.target.name==='productRate')
        {
           return {...prev,[e.target.name]:parseInt(e.target.value)}
        }
        return {...prev,[e.target.name]:e.target.value}
    })
   }

   const handleErrors=()=>
    {
        const subErrors:ProductErrorsType={}
        if(!productData.productName)
        {
            subErrors.productName='Please enter a valid name'
        }
        if(productData.productQuantity===0)
        {
           subErrors.productQuantity="Product quantity cannot be zero"
        }
        if(!productData.productQuantity)
        {
           subErrors.productQuantity="Invalid product quantity"
        }
        if(productData.productRate===0)
        {
           subErrors.productRate="Product rate cannot be zero"
        }
        if(!productData.productRate)
        {
           subErrors.productRate="Invalid product rate"
        }
        return subErrors
    }


   let handleSubmit=async (e:FormEvent<HTMLFormElement>)=>
   {
      e.preventDefault()
      let validationErrors=handleErrors()
      setErrors(validationErrors)
      if(Object.keys(validationErrors).length===0)
      {
         await dispatch(addProductRequest({productData,token}))
         dispatch(getProductsRequest())
      }
      setProductData({
        productName:"",
        productQuantity:0,
        productRate:0
      })
   }



   useEffect(()=>
  {
      let aggregated=products && products.reduce((sum,agg)=>
      {
         return sum+(agg.productQuantity*(agg.productRate+0.18*agg.productRate))
      },0)
      setTotal(aggregated)
  },[products])

   useEffect(()=>
  {
    dispatch(getProductsRequest())
  },[])

  return (
    <section className='w-auto min-h-[100vh] overflow-x-hidden bg-gray-200'>
      <div className='container mx-auto w-[90%] max-w-[1120px] min-h-[100%] grid grid-cols-1 gap-4 lg:grid-cols-2 items-start'>
        <div className="portside rounded-sm bg-[#f3f4f6] text-black mx-auto mt-[4rem] w-[100%] px-4 py-6 max-w-[500px] flex flex-col">
           <form action="" onSubmit={handleSubmit}>
            <div className="productName">
              <label htmlFor="productName" className='my-2 text-md font-semibold'>
                Product Name
                <input type="text" id="productName" name='productName' className='w-[100%] h-[30px] mt-1 rounded-md outline-none border-none py-2 px-2 text-white' onChange={handleChange} value={productData.productName}/>
              </label>
              {errors.productName && <ValidationError msg={errors.productName || "Invalid Product Name"}/>}
            </div>
           <div className="productQuantity">
              <label htmlFor="productQuantity" className='my-2 text-md font-semibold'>
                Product Quantity
                <input type="number" id='productQuantity' name='productQuantity' className='w-[100%] h-[30px] mt-1 rounded-md outline-none border-none py-2 px-2 text-white' onChange={handleChange} value={productData.productQuantity.toString()}/>
              </label>
              {errors.productQuantity && <ValidationError msg={errors.productQuantity || "Invalid Product Quantity"}/>}
           </div>
          <div className="productRate">
              <label htmlFor="productRate" className='my-2 text-md font-semibold'>
                Product Rate
                <input type="number" id="productRate" name='productRate' className='w-[100%] h-[30px] mt-1 rounded-md outline-none border-none py-2 px-2 text-white' onChange={handleChange} value={productData.productRate.toString()}/>
              </label>
              {errors.productRate && <ValidationError msg={errors.productRate || "Invalid Product Rate"}/>}
          </div>
            <div className="misc mt-2">
              <h2 className='text-md font-semibold'>Product Total <span className='text-lg'>{(productData.productQuantity || 0) * (productData.productRate || 0)}</span></h2>
              <p className='text-sm font-semibold'>Product GST (18%)</p>
            </div>
            <button className='text-white py-2 font-normal rounded-md h-[35px] mt-4 flex justify-center items-center'>Add Product</button>
           </form>
        </div>
        <div className="starboard rounded-sm bg-white text-black mx-auto mt-[4rem] w-[100%] px-4 py-6 max-w-[500px] flex flex-col">
          {/* <table>
            <tr className='my-2'>
              <th className='text-center'>Product Name</th>
              <th className='text-center'>Quantity</th>
              <th className='text-center'>Rate</th>
              <th className='text-center'>Total</th>
              <th className='text-center'>GST</th>
            </tr>
            {products && products.map((items,idx:number)=>
            {
              return <tr key={idx} className={`${idx%2===0?'bg-gray-400':null}`}>
                <td className='text-left'>{items.productName}</td>
                <td className='text-center'>{items.productQuantity}</td>
                <td className='text-center'>{items.productRate}</td>
                <td className='text-center'>{items.productQuantity * items.productRate}</td>
                <td className='text-center'>18%</td>
              </tr>
            })}
          </table> */}

          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
  <thead className="bg-gray-200">
    <tr>
      <th className="text-center py-2 px-4 border-b border-gray-300">Product Name</th>
      <th className="text-center py-2 px-4 border-b border-gray-300">Quantity</th>
      <th className="text-center py-2 px-4 border-b border-gray-300">Rate</th>
      <th className="text-center py-2 px-4 border-b border-gray-300">Total</th>
      <th className="text-center py-2 px-4 border-b border-gray-300">GST</th>
    </tr>
  </thead>
  <tbody>
    {products && products.map((items, idx: number) => (
      <tr key={idx} className={`${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
        <td className="text-left py-2 px-4 border-b border-gray-300">{items.productName}</td>
        <td className="text-center py-2 px-4 border-b border-gray-300">{items.productQuantity}</td>
        <td className="text-center py-2 px-4 border-b border-gray-300">{items.productRate}</td>
        <td className="text-center py-2 px-4 border-b border-gray-300">{items.productQuantity * items.productRate}</td>
        <td className="text-center py-2 px-4 border-b border-gray-300">18%</td>
      </tr>
    ))}
  </tbody>
</table>


          <h2 className='text-right my-4'>Total : {products && total} (Inclusive of GST)</h2>
          <Link to='/invoice' className='text-white ml-auto w-[100%] lg:w-[80px] hover:text-white'><button className='text-white hover w-[100%] h-[40px] flex justify-center items-center'>Next</button></Link>
        </div>
      </div>
    </section>
    
  )
}

export default Products