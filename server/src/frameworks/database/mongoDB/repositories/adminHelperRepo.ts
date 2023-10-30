import Admin from "../models/admin"


export const adminRepositoryMongoDB = ()=>{
    const getAdminByEmail = async(email:string)=>{
        return await Admin.findOne({email})
    }



    return{
        getAdminByEmail
    }
}
export type adminRepositoryMongoDB = typeof adminRepositoryMongoDB