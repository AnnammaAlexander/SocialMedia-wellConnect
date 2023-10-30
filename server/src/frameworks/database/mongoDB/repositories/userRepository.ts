import { UpdateWriteOpResult } from "mongoose";
import User from "../models/user";
import Post from "../models/post";
 export const userRepositoryMongoDB= ()=>{
    const addUser = async (user:{
        firstName:string,
        lastName:string,
        userName:string,
        email:string,
        password:string

    }) =>{
        const newUser = new User(user);

        return await newUser.save();
    };

const getUserByEmail = async(email:string) =>{
    return await User.findOne({email})
}
const getUserByUserName = async(userName:string) =>{
   
    return await User.findOne({userName})
}
//add profile picture
const addProfileImage = async(userName:string ,profileImage: string) =>{
    console.log("userName,profileImage",userName,profileImage);
    
    const response= await User.updateOne({userName:userName},{$set:{dp:profileImage}})
    return response;
}
//get profile image
const getProfileImage = async(userName:string)=>{
    try {
        
        
        const response = await User.findOne({userName})
        console.log("tttttttttttttttttttttttttt",response);
        
        return response;
        
    } catch (error) {
       console.log("error in userHelper",error);
        
    }
}
//save edit profile
const saveProfileDetails = async(
    userName:string,
    firstName:string ,
    lastName:string ,
    email:string ,
    phoneNumber:number,
    city:string,
    gender:string,
    bio:string
    )=>{
    try {
        const response = await User.findOneAndUpdate({userName:userName},
            {$set:{firstName:firstName,
                lastName:lastName,
                email:email,
                phoneNumber:phoneNumber,
                city:city,
                gender:gender,
                bio:bio,
            }
        })
        // console.log("response........................",response);
        return response;
        
    } catch (error) {
        console.log("error in userHelper",error);
    }
}

//update cover photo
const updateCoverPic = async(userName:string,coverPhoto:string)=>{
    try {
    const response = await User.findOneAndUpdate({userName:userName},{$set:{coverImag:coverPhoto}})
    return response;
    } catch (error) {
        console.log("error in userHelper",error);

    }
}
//get saved images
const getSaved = async(userName:string)=>{
    const response= await User.aggregate([
        {
            $match:{
                userName:userName
            }
        },
        {
            $unwind:{
                path:"$savedItems"
            }
        },
        {
            $addFields:{
                objectId:{
                  $toObjectId:"$savedItems" 
                }
            }
        },
        {
            $lookup:{
                from:"posts",
                localField:"objectId",
                foreignField:"_id",
                as:"postdata"
            }
        },
        {
           $unwind:{
            path:"$postdata"
           }

        },
        {
            $match:{
                "postdata.listed":true
            }
        },
        {
            $lookup:{
                from: "users",
                localField: "postdata.postedUser",
                foreignField: "userName",
                as: "postedUserData"
            }
        },
        {
            $unwind:{
                path: "$postedUserData", 
            }
        },{
            $project:{
                "postdata.image":1,
                 "postdata.description":1,
                 "postdata.like":1,
                 "postdata.listed":1,
                 "postdata.createdAt":1,
                 "postdata.updatedAt":1,
                 "postedUserData.firstName":1,
                 "postedUserData.lastName":1,
                 "postedUserData.userName":1,
                 "postedUserData.dp":1
            }
        }
    ])
    return response;
}

//follow handler
const followHander = async(user:string,userName:string)=>{
    const session = await User.startSession()
    session.startTransaction()
    try {
        const followStatus = await User.findOne({userName:userName,following:{$elemMatch:{$eq:user}}})
        const operation: Array<Promise<UpdateWriteOpResult>> = []; // Specify the type of the operation array
        if(followStatus ===null){
            operation.push(
                User.updateOne({userName},{$addToSet:{following:user}}) ,
                User.updateOne({userName:user},{$addToSet:{followers:userName}})
            )
        }else{
            operation.push(
                User.updateOne({userName:userName},{$pull:{following:user}}) ,
                User.updateOne({userName:user},{$pull:{followers:userName}})
            )
        }
        const result = await Promise.allSettled(operation)
        const isSuccess = result.every((result)=>result.status==='fulfilled')
        if(isSuccess){
        await session.commitTransaction()
        await session.endSession()
        return true
        }else{
            await session.abortTransaction()
            await session.endSession()
            return false
        }
    } catch (error) {
       console.log("errorn in heper",error);
        
    }
}
//get followList
const followersList =async(user:string)=>{
    const res = await User.aggregate([
        {
            $match:{
                userName:user
            }
        },
        {
            $unwind:{
                path:"$followers"
            }
        },
        {
            $lookup:{
                from: "users",
                localField: "followers",
                foreignField: "userName",
                as:"userData"
            }
        },
        {
          $unwind:{
            path: "$userData",
          }  
        },
        {
            $project:{
                firstName:"$userData.firstName",
                lastName:"$userData.lastName",
                dp:"$userData.dp",
                id:"$userData._id",
                following:"$userData.following"
            }
        }
    
    ])
    console.log("ddddddddddddd",res);
    
    return res;
}

//get about
const getAbout = async(user:string)=>{
    try {
        const response = await User.findOne({userName:user})
        return response;
    } catch (error) {
        console.log("errorn in heper",error);
    }
}




// //get post 
// const getPosts =async(user:string)=>{
//     try {
//     const res = await Post.find({postedUser:user})
//     return res;
//     } catch (error) {
//         console.log("errorn in heper",error);
  
//     }    
// }



    return {
        addUser,
        getUserByEmail,
        getUserByUserName,
        addProfileImage,
        getProfileImage ,
        saveProfileDetails ,
        updateCoverPic,
        getSaved,
        followHander,
        followersList,
        getAbout
    };
 }
 export type userRepositoryMongoDB  = typeof userRepositoryMongoDB;