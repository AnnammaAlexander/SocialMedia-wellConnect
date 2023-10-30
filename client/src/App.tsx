
import {BrowserRouter , Routes ,Route} from 'react-router-dom'
import './App.css'
import LoginPage from './Pages/AdminPage/Login'



// user pages

import UserSignup from './Pages/UserPage/Signup'
import UserLogin from './Pages/UserPage/Login';

import UserHome from './Pages/UserPage/UserHome'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';

import Profile from './Pages/UserPage/Profile';



function App() {
  // const token=localStorage.getItem("token")
  // const userDetails:{items:User} = useSelector<{ user:{items:User}}>((store)=>store.user)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userToken = useSelector((store:{user:{token:string}}) => store.user.token);




  return ( 
    <>
  <ToastContainer/>
   <BrowserRouter>
     <Routes>
      <Route path='/adminLogin' element={<LoginPage/>}></Route>
    


    {/* user route */}
      <Route path='/signup' element={<UserSignup/>}></Route>

      <Route path='/' element={ userToken ? <UserHome/>:<UserLogin/>}></Route>
      <Route path='/:user' element={<Profile/>}></Route>

      
    
    </Routes>
   </BrowserRouter>
   </>

  
 
  )
}

export default App
