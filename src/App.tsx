import { useEffect,} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import { Route, Routes,useNavigate } from 'react-router'
import SignUp from './components/SignUp'
import Login from './components/Login'
import { useAppSelector } from './store/Hooks'
import Products from './components/Products'
import Store from './store/Store';
import Invoice from './components/Invoice';


function App() {

  let {token,msg}=useAppSelector(state=>state.Access)

  let navigate=useNavigate()

  const notify = (msg:string) => toast(msg);

  useEffect(()=>
  {
    if(token && token.length>0 && msg.length>0)
    {
      notify(msg)
      navigate('/products')
      return
    }
    else if(msg && msg.length>0 && msg==='Account created successfully')
    {
      navigate('/login')
      notify(msg+"\n Login Now")
      return
    }
    else if(msg && msg.length>0) 
    {
      notify(msg)
      return
    }
    
  },[token,msg])

  // useEffect(()=>
  // {
  //   if(token.length===0)
  //   {
  //     navigate('/login')
  //   }
  // },[])

  return (
    <main className='w-[100vw] h-[100%] min-h-[100vh] overflow-x-hidden bg-gray-200'>
       <ToastContainer />
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route index path='/products' element={<Products/>}/>
        <Route path='/invoice' element={<Invoice/>}/>
      </Routes>
    </main>
  )
}

export default App
