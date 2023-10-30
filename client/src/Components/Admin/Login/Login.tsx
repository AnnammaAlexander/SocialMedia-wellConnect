import '../Login/login.css'
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import {
    CardHeader,
    CardBody,
    CardFooter,
   
  } from "@material-tailwind/react";
  import * as Yup from 'yup';

import { useFormik } from 'formik';
import { adminSignIn } from '../../../API/apiConnections/authConnection';
import { toast } from 'react-toastify';
function Login() {
  const formik = useFormik({
    initialValues:{
      userName:'',
      password:''
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(20, 'Must be less than 20 characters')
        .required('Required'),
      password: Yup.string()
        .max(20, 'Must be less than 20 characters')
        .min(4,'Must be 4 characters or more')
        .required('Required')
    }),


    onSubmit:async (values) => {
    
    //  console.log("vvvvvvvvvvvvvvv",values);
     const response = await adminSignIn(values)
      if(response.status==="failed"){
        toast.success(response?.message)
      }
      console.log('inside login page',response)
    }
  })
  
  return (
<div className='flex justify-center w-screen items-center h-screen'>
<Card className='w-100  '>
<form className='m-auto' onSubmit={formik.handleSubmit}>

      <CardHeader
        variant="gradient"
        
        className="mb-4 grid h-28 place-items-center  bg-light-blue-200"
      >

        <Typography variant="h2" color="white" className="font-kaushan"
         style={{ color: '#9370DB', textShadow: '2px 3px royalblue', fontSize: '32px', fontWeight: 'bold' }}
        >
          WellConnect
        </Typography>
        Admin Login

      </CardHeader>
      <CardBody className="flex flex-col gap-2">
      <input className='border-[.1rem] border-gray-400 rounded-md p-2 placeholder:text-sm focus:border-blue-600' placeholder='User Name/E-mail/Mobile' id="userName"
                {...formik.getFieldProps('userName')} />
                <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.userName && formik.errors.userName ? 
                formik.errors.userName : null}</p>

<Input type="password" label="Password" size="lg" id="password"
                {...formik.getFieldProps('password')} />
                <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.password && formik.errors.password ?
                  formik.errors.password : null}</p>      </CardBody>
      <CardFooter className="pt-0">
        <Button
         className="rounded custom-button"
type="submit"

fullWidth
>
Sign In
</Button>


        
         

     


      </CardFooter>
    
</form>
</Card>
</div>




  )
}

export default Login
