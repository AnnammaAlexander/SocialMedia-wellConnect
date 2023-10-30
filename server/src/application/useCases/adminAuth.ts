
import { AdminDbInterface } from "../repositories/adminDbRepository";
import { AuthServiceInterface } from "../services/authServiceInterface";

export const adminSignIn = async(
    email:string,
    password:string,
    adminRepository:ReturnType<AdminDbInterface>,
    authServices:ReturnType<AuthServiceInterface>
)=>{
    const data:any = await adminRepository.getAdminByEmail(email)
        if(!data){
        const adminData = {
            status:"failed",
            message:"Admin does not exist"
        }
        return adminData
    }
    const isPassword = await authServices.comparePassword(password,data?.password)
    if(!isPassword){
        const adminData ={
            status:"failed",
            message:"Password incorrect",
        }
        return adminData;
    }
    const jwtToken = await authServices.generateToken(data?._id?.toString())

    data.password = '';
    const adminData = {
        status:"success",
        message:"Sign in Success",
        admin:data,
        token:jwtToken
    }
    return adminData
}