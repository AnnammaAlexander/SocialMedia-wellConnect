import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { userDbInterface } from "../../application/repositories/userDbRepositories";
import { userRepositoryMongoDB } from "../../frameworks/database/mongoDB/repositories/userRepository";
import {
  addProfileImage,
  getProfileDp,
  profileDetails,
  uploaCoverPic,
  getSavedImg ,
  followHander,
  getFollowersList,
  getAbout
} from "../../application/useCases/userAuth";

const userControllers = (
  userDbInterface: userDbInterface,
  userDbService: userRepositoryMongoDB
) => {
  const dbUserRepository = userDbInterface(userDbService());

  //add profile image
  const uploadProfileImage = asyncHandler(
    async (req: Request, res: Response) => {
      // console.log("profile photo....",req?.file);

      const profileImage = req.file?.path?.split("/profile-")[1] as string;
      const userName = req.headers["x-user"] as string;
      // console.log('profileimageggggggggggg:',profileImage);

      const response = await addProfileImage(
        userName,
        profileImage,
        dbUserRepository
      );
      if (response) {
        res.json({ profileImage: profileImage });
      }
    }
  );

  //get profile image
  const getImage = asyncHandler(async (req: Request, res: Response) => {
    const userName = req.params.user
    console.log("..............................",userName);
    
    const response = await getProfileDp(userName, dbUserRepository);
    console.log("response from get profile image ...............", response);
    // console.log("image....../:", response?.dp);

    res.json(response);
  });

  //update profile
  const updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const userName = req.headers["x-user"] as string;
    // const {firstName,lastName,email, phoneNumber,city,gender,bio} =req.body
    const response = await profileDetails(
      userName,
      req.body.values.firstName,
      req.body.values.lastName,
      req.body.values.email,
      req.body.values.phoneNumber,
      req.body.values.city,
      req.body.values.gender,
      req.body.values.bio,
      dbUserRepository
    );
    // console.log("response in controller.............",response);

    if (response) {
      res.json(response);
    }
    console.log(
      "firstName,lastName,email,gender,bio",
      req.body.values.firstName
    );
  });
  //uploadCoverPic
  const uploadCoverPic = asyncHandler(async(req: Request, res: Response) => {
    try {
      const userName = req.headers["x-user"] as string;
      // console.log("rrrrrrrrrrrrrrrrr",req.file);
      
      const coverPhoto =req.file?.path?.split("/profile-")[1] as string
      const response = await uploaCoverPic(userName,coverPhoto,dbUserRepository)
      if(response){
        console.log("response in controler............",response);
        res.json({response})
        
      }
      
    } catch (error) {
      console.log("error in controller...", error);
    }
  });
//get saved items
const getSavedImages=asyncHandler(async(req:Request,res:Response)=>{
  try {
    const userName = req.headers["x-user"] as string;
    const response = await getSavedImg(userName,dbUserRepository)
    if(response){
      console.log("responsellllllllllllll:",response);
      res.json(response)
    }
    
  } catch (error) {
    console.log("error in controller...", error);

  }

})
//follow
const followPeople= asyncHandler(async(req:Request,res:Response)=>{
  try {
  
  const userName = req.headers["x-user"] as string;
  const response = await followHander(req.body.user,userName,dbUserRepository)
    res.json(response)
  
} catch (error) {
  console.log("error in controller...", error);
}
})
//get followers
const getFollowers = asyncHandler(async(req:Request,res:Response)=>{
  try {
    const response = await getFollowersList(req.params.user,dbUserRepository)
    console.log("gggggggggggggg",response);
    
    res.json(response)
    
  } catch (error) {
    console.log("error in controller...", error);
  }
   
})
//get about
const getAboutController = asyncHandler(async(req:Request,res:Response)=>{
  try {
    const response = await getAbout(req.params.user,dbUserRepository)
    console.log("getAboutController...",getAboutController);
    
    res.json(response)
  } catch (error) {
    console.log("error in controller...", error);
  }
})


  return {
    uploadProfileImage,
    getImage,
    updateProfile,
    uploadCoverPic,
    getSavedImages,
    followPeople,
    getFollowers,
    getAboutController
  };
};
export default userControllers;
