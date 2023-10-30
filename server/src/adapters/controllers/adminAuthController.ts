import { Request,Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthServices } from "../../frameworks/services/authService";
import { AuthServiceInterface } from "../../application/services/authServiceInterface";
import { AdminDbInterface } from "../../application/repositories/adminDbRepository";
import { adminRepositoryMongoDB } from "../../frameworks/database/mongoDB/repositories/adminHelperRepo";
import { adminSignIn } from "../../application/useCases/adminAuth";

const adminAuthControllers = (
    authServiceInterface :AuthServiceInterface,
    authServices:AuthServices,
    adminDbInterface:AdminDbInterface,
    adminDbService:adminRepositoryMongoDB

)=>{
    const adminDbRepository= adminDbInterface(adminDbService())  
    const authService = authServiceInterface(authServices())


    const signInAdmin = asyncHandler(async(req:Request,res:Response)=>{
        
        const {userName,password}:{userName:string,password:string} = req.body.values
        const userData = await adminSignIn(userName,password,adminDbRepository,authService)
        console.log("userData................",userData);
        
        res.json(userData)

    })

return{
    signInAdmin 
}

}
export default adminAuthControllers