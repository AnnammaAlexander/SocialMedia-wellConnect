import { userRepositoryMongoDB } from "../../frameworks/database/mongoDB/repositories/userRepository";

export const userDbRepository = (repository: ReturnType<userRepositoryMongoDB>) =>{
    const addUser= async(user:{
        firstName:string,
        lastName:string,
        userName:string,
        email:string,
        password:string
    }) =>{
        return await repository.addUser(user);
    }


    const getUserByEmail = async(email:string) =>{
        return await repository.getUserByEmail(email)
    }
    const getUserByUserName = async(userName:string) =>{
        
        return await repository.getUserByUserName(userName)
    }
//Add profile image
const profileImageRepo = async(userName:string , profileImage:string) =>{
    return await repository.addProfileImage(userName ,profileImage)

}
 //get profile image
const getProImageRepo = async(userName: string)=>{
    try {
        return await repository.getProfileImage(userName)
    } catch (error) {
      console.log("error in repo",error);
        
    }
}
//update profile
const profileDetailsRepo = async(
    userName: string,
    firstName:string ,
    lastName:string ,
    email:string ,
    phoneNumber:number,
    city:string,
    gender:string,
    bio:string
    )=>{
    try {
        return await repository.saveProfileDetails(
            userName,firstName,lastName,email,phoneNumber,city,gender,bio)
    } catch (error) {
        console.log("error in repo",error);  
    }
}

//upload cover photo 
const uploadCoverPicRepo =async(userName:string,coverPhoto:string)=>{
    try {
       return await repository.updateCoverPic(userName,coverPhoto)
    } catch (error) {
        console.log("error in repo",error);  
  
    }
}
//get saved
const getSavedRepo = async(userName:string)=>{
    try {
        return await repository.getSaved(userName)
        
    } catch (error) {
        console.log("error in repo",error);  

    }
}
//follow handler
const followHanderRepo = async(user:string,userName:string)=>{
    try {
        return await repository.followHander(user,userName)
        
    } catch (error) {
        console.log("error in repo",error);  
  
    }
}
//get followList
const followersListRepo = async(user:string)=>{
    try {
        return await repository.followersList(user)
    } catch (error) {
        console.log("error in repo",error);    
    }
}
//get about
const getAboutRepo = async(user:string)=>{
    try {
        return await repository.getAbout(user)
    } catch (error) {
        console.log("error in repo",error);      
    }
}
    return {
        addUser,
        getUserByEmail,
        getUserByUserName,
        profileImageRepo ,
        getProImageRepo,
        profileDetailsRepo,
        uploadCoverPicRepo,
        getSavedRepo,
        followHanderRepo,
        followersListRepo,
        getAboutRepo ,
        


    }

};

export  type userDbInterface = typeof userDbRepository;