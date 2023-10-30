


import {Link} from "react-router-dom"
import  './Signup.css'
import { useFormik } from "formik";
import * as Yup from 'yup'
import {
    // Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { register } from "../../../API/apiConnections/authConnection";
 import { useNavigate } from "react-router-dom";  
  export function SignupForm() {
    const navigate = useNavigate();

    const formik = useFormik({
      initialValues:{
        firstName:'',
        lastName:'',
        userName:'',
        email:'',
        password:'',
        conformPassword:''
      },
      validationSchema: Yup.object({

        firstName: Yup.string()
          .max(20, 'Must be less than 20 characters')
          .required('Required'),

          lastName: Yup.string()
          .max(20, 'Must be less than 20 characters')
          .required('Required'),

        userName: Yup.string()
          .max(20, 'Must be less than 20 characters')
          .required('Required'),



          email: Yup.string()
          .email('Invalid email address')
          .required('Required'),


        password: Yup.string()
          .max(20, 'Must be less than 20 characters')
          .min(4,'Must be 4 characters or more')
          .required('Required'),

          conformPassword: Yup.string()
          .oneOf([Yup.ref('password'), ''], 'Password not match')
          .required('Required'),



      }),
      onSubmit:async (values) => {
        // interface resp{
        //   status:string,
        //   message:string,
        //   token:string,
        //   user:object
        // }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const signupResponse:any=await register(values)
      if(signupResponse==="success"){
        navigate("/")
      }
        console.log(signupResponse)
      }
    })

   
    return (
       <div className='h-screen w-screen flex justify-center ite'>
      {/* <Card  className='flex justify-center items-center' color="" shadow={false} > */}
        <div className='shadow-2xl w-fit p-5 bg-white h-fit m-auto rounded-lg' >
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <div className='flex justify-center rounded '>


        <form onSubmit={formik.handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 ">
          <div className="mb-4 flex flex-col gap-0.5">
               <input className='border-[.1rem] border-gray-400 rounded-md p-2 placeholder:text-sm focus:border-blue-600' placeholder='firstName' id="firstName"
                {...formik.getFieldProps('firstName')} />
                <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.firstName && formik.errors.firstName ? 
                formik.errors.firstName : null}</p>

              <input className='border-[.1rem] border-gray-400 rounded-md p-2 placeholder:text-sm focus:border-blue-600' placeholder='lastName' id="lastName"
                {...formik.getFieldProps('lastName')} />
                <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.lastName && formik.errors.lastName ? 
                formik.errors.lastName : null}</p>

              <input className='border-[.1rem] border-gray-400 rounded-md p-2 placeholder:text-sm focus:border-blue-600' placeholder='User Name/E-mail/Mobile' id="userName"
                {...formik.getFieldProps('userName')} />
                <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.userName && formik.errors.userName ? 
                formik.errors.userName : null}</p>


             <input className='border-[.1rem] border-gray-400 rounded-md p-2 placeholder:text-sm focus:border-blue-600' placeholder='email' id="email"
                {...formik.getFieldProps('email')} />
                <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.email && formik.errors.email ? 
                formik.errors.email : null}</p>

<Input type="password" label="password" size="lg" id="password"
                {...formik.getFieldProps('password')} />
                <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.password && formik.errors.password ?
                  formik.errors.password : null}</p>

<Input type="password" label="conform Password" size="lg" id="conformPassword"
                {...formik.getFieldProps('conformPassword')} />
                <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.conformPassword && formik.errors.conformPassword ?
                  formik.errors.conformPassword : null}</p>


          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className=" rounded custom-button   shadow-lg" fullWidth>
            Signup
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/"> Sign In </Link>
             
            
          </Typography>
        </form>
        </div>
      </div>
      {/* </Card> */}
      </div>
    );
  }