
import { auth,provider } from "../../../firebase/confic";
import{signInWithPopup} from 'firebase/auth';
import {useFormik} from 'formik';

import * as Yup from 'yup';
import { login ,googleSignUp} from '../../../API/apiConnections/authConnection';
import { useDispatch  } from 'react-redux';
import {
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Card,
    // Checkbox,
    Button,
  } from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { setToken, setUser } from '../../../redux/Slices/userSlice';
import { resp} from '../../../Interfaces/userInterfaces';




const LoginForm = ()=>{
  // const [isSignInClicked,setIsSignInClicked] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const [values,setValues] = useState<any>()
  const navigate=useNavigate();
  const dispatch =useDispatch()


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
    
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const loginResponse:resp |any = await login(values);

      

        if (loginResponse.status==='success') {
          const token=loginResponse.token;
          if(typeof token==='string'){

            localStorage.setItem("token", token)
            dispatch(setUser(loginResponse.user))
            dispatch(setToken(token))
            navigate('/')
          }
         
        } 

      console.log('inside login page',loginResponse)
    }
  })
 


const loginWithGoogle   =()=>{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signInWithPopup(auth,provider).then(async(data:any)=>{
    // console.log("dataaaaaaaaaa:",data);
    const user = {
      firstName:data?._tokenResponse.firstName ,
      lastName :data?._tokenResponse.lastName  ,
      userName:data?._tokenResponse.email,
      email:data?._tokenResponse.email
    }
    const response :resp   = await googleSignUp(user)
    // console.log("responseeeeeeeeeee:",response);
    
    if(response.status === 'success'){
      
        const token=response?.token;
        if(typeof token==='string'){

          localStorage.setItem("token", token)
          dispatch(setUser(response.user))
          dispatch(setToken(token))
          navigate('/')
        
       
      } 
    }

  })
}

    return(
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

              </CardHeader>
              <CardBody className="flex flex-col gap-2">
                <input className='border-[.1rem] border-gray-400 rounded-md p-2 placeholder:text-sm focus:border-blue-600' placeholder='User Name/E-mail/Mobile' id="userName"
                {...formik.getFieldProps('userName')} />
                <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.userName && formik.errors.userName ? 
                formik.errors.userName : null}</p>

                <Input type="password" label="Password" size="lg" id="password"
                {...formik.getFieldProps('password')} />
                <p className="h-4 ml-2 text-sm text-red-800">{formik.touched.password && formik.errors.password ?
                  formik.errors.password : null}</p>
                {/* <div className="-ml-2.5"> */}
                  {/* <Checkbox label="Remember Me" /> */}
                {/* </div> */}
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                 className="rounded custom-button"
  type="submit"
  // color='green'
  // variant="gradient"
  fullWidth
>
  Sign In
</Button>


                <div className="flex justify-center items-center gap-3 p-4">
                  <div className="w-full border-t-2 border-blue-gray-200 "></div>
                  <p className="text-blue-gray-300">OR</p>
                  <div className="w-full border-t-2 border-blue-gray-200 "></div>
                </div>
                
                <div className="flex justify-center">
                
                  <Button
                  onClick={loginWithGoogle}
                    size="lg"
                    variant="outlined"
                    color="blue"
                    className="flex items-center gap-3"
                    >
                      
                    <img src="https://www.material-tailwind.com/icons/google.svg" alt="metamask" className="h-6 w-6" />
                      Sign in WITH GOOGLE
                    </Button>
                </div>

                <button className="mt-2">
              Don't have an account ?
              <Link  to="/signup" className="ml-1 text-blue-500 transition-colors hover:text-blue-700">Sign up</Link>
            </button>


              </CardFooter>
            
        </form>
        </Card>
        </div>
    )
}

export default  LoginForm