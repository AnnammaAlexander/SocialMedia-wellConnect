import { toast } from "react-toastify";
import baseURL from "../api";
//  import { loginHandle } from "../../redux/handleRedux";
// import { Dispatch } from "@reduxjs/toolkit";
import { User, googlelogin } from "../../Interfaces/userInterfaces";


interface RegisterResponse {
  status?: string;
  message?: string;
  token?: string;
  user?: object;
}

interface LoginResponse {
  message: string;
  status: string;
  user: User;
  token: string;
}

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  conformPassword: string;
}

interface LoginFormValues {
  userName: string;
  password: string;
}

export const register = async (values: RegisterFormValues) => {
  try {
    const response = await baseURL.post<RegisterResponse>( "/auth/register",values );

    if (response.data.status === "success") {
      toast.success(`sign success !!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return "success";
    } else {
      toast.error("Registration failed");
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = async (values: LoginFormValues) => {
  try {
    const response = await baseURL.post<LoginResponse>("/auth/login", values);
    

    // Handle the success response
    if (response.data.status === "success") {
      toast.success(`login success !!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      response.data.user.token = response.data.token;

      
      //  loginHandle(response.data.user,dispatch);
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
//signup with google
export const googleSignUp = async(user:googlelogin)=>{
  const response = await baseURL.post("/auth/googlesignup",{user})
  return response?.data;
}
//admin SignIn{
export const adminSignIn=async(values:LoginFormValues)=>{
  try {
    const response= await baseURL.post("/adminauth/adminSignin",{values})
    return response.data;
  } catch (error) {
    console.log("error in api");
    
  }
}
