import { adminRepositoryMongoDB } from "../../frameworks/database/mongoDB/repositories/adminHelperRepo";
export const adminDbRepository = (repository:ReturnType<adminRepositoryMongoDB>) =>{
    const getAdminByEmail = async(email:string)=>{
        return await repository.getAdminByEmail(email)
    }




    return{
        getAdminByEmail 
    }
}
export type AdminDbInterface = typeof adminDbRepository;