import { Request,Response } from "express";

import asyncHandler from 'express-async-handler';
import { AuthServiceInterface } from "../../application/services/authServiceInterface";
import { AuthServices } from "../../frameworks/services/authService";
import { userDbInterface } from "../../application/repositories/userDbRepositories";
import { userRepositoryMongoDB } from "../../frameworks/database/mongoDB/repositories/userRepository";
import { userSignUp,userLogin ,googlesignup} from "../../application/useCases/userAuth";


//authentication controllers
const authControllers =(
    authServiceInterface:AuthServiceInterface ,
    authService :AuthServices ,
    userDbInterface:userDbInterface,
    userDbService: userRepositoryMongoDB

) =>{
const authServices =authServiceInterface(authService())

const dbUserREpository =userDbInterface(userDbService())

const signupUser = asyncHandler(async(req:Request,res:Response) =>{
   const{firstName,lastName,email,userName,password} =req.body
   console.log(req.body);
 const user= {
    firstName,
    lastName,
    userName,
    email,
    password
   }
   const userData = await userSignUp(user,authServices,dbUserREpository)
   res.json(userData)

})
const loginUser =  asyncHandler(async(req:Request,res:Response) =>{
    const{userName,password}:{userName:string ; password:string} =req.body
    const loginData ={
        userName,
        password
    }
const Data:any = await userLogin(loginData,authServices,dbUserREpository)
console.log("login data response",Data);

res.json(Data)
})

//signUpWithGoogle
const signUpWithGoogle= asyncHandler(async(req:Request,res:Response)=>{
try {
     console.log("mmmmmmmmmmmmmmmmmmmmm:",req.body.user);
    const response = await googlesignup(req.body.user,authServices,dbUserREpository)
    console.log("responseeeeeeeeeeeeeee",response);
    
    res.json(response)
    
} catch (error) {
    console.log("error in controller",error);
    
}
})


return {
    signupUser,
    loginUser,
    signUpWithGoogle
}

};
export default authControllers;

