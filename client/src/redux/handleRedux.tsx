/* eslint-disable @typescript-eslint/no-explicit-any */
import { setUser } from "./Slices/userSlice";
import { User } from "../Interfaces/userInterfaces";

 export const loginHandle = (userDetails:User,dispatch:any)=>{
    dispatch(setUser(userDetails))
 }
