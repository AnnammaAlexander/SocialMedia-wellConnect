import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import Post from "../models/post";
import Comment from "../models/comment";
import User from "../models/user";
export const postRepositoryMongoDB = () =>{


  
  //add new post
    const addPost = async(
    postedUser:string,
    image:string,
    description:string
  ) =>{
    const singlePost={
        postedUser,
        image,
        description,
        like:[] ,
        listed :true ,
        reported :[]
    }
    const newPost = new Post(singlePost);
    return await newPost.save();
  }

  //get all post
  const getAllPostDb = async(userName:string)=>{
    const post= await User.aggregate([
      {
        $match:{
          userName:userName
        }
      },
      {
        $unwind:{
          path: "$following"      
            }
      },
      {
        $lookup:{
          from: "users",
          localField: "following",
          foreignField: "userName",
          as: "userData"
        }
      },
      {
        $unwind:{
          path:"$userData"
        }
      },
      {
        $project:{
          firstName:"$userData.firstName",
          lastName:"$userData.lastName",
          userName:"$userData.userName",
          dp:"$userData.dp",
          
        }
      },
      {
$lookup:{
  from: "posts",
  localField: "userName",
  foreignField: "postedUser",
  as: "postData"
}
      },
      {
$unwind:{
  path: "$postData",
}
      },
      {
$project:{
  firstName:1,
  lastName:1,
  dp:1,
  image:"$postData.image",
  description:"$postData.description",
  like:"$postData.like",
  listed:"$postData.listed",
  createdAt:"$postData.createdAt",
  postedUser:"$postData.postedUser"
}
      },
      {
        $match:{
          listed:true
        }
      },
      {
        $sort:{
          createdAt:-1
        }
      }
      
    ])
    if(post.length ===0){
      return await Post.aggregate([
        {
          $match:{
            listed:true
          }
        },
        {
          $sort:{
            createdAt:-1
          }
        },
        {
          $lookup:{
            from:"users",
            localField:"postedUser",
            foreignField:"userName",
            as:"userData"
          }
        },
        {
          $unwind:{
            path:"$userData"
          }
        },
        {
          $limit:3
        },
        {
          $project:{
            postedUser:1 ,
            description:1 ,
            image:1 ,
            dp:"$userData.dp" ,
            firstName:"$userData.firstName",
            lastName:"$userData.lastName",
            like:1 ,
            createdAt:1,
            reported:1
          }
        }
        
      ])
    }else{
      return post;
    }
      
  }
  //like post
  const likePostHelper =async(postId:string,userName:string) =>{
    return await Post.findOneAndUpdate({_id:postId},{$addToSet:{like:userName}})

  }
  //unlike post
  const unlikeHelper = async(postId:string,userName:string) =>{
    return await Post.findOneAndUpdate({_id:postId},{$pull:{like:userName}})
  }
  //delete post
  const deletePost = async(postId:string)=>{
    return await Post.updateOne({_id:postId},{$set:{listed:false}})
  }
//report post
const reportPost =async(selectedOption :String, postId : String, userName : String)=>{
  try {
    
  //  const Id =new mongoose.Types.ObjectId(postId)
  const data={
      userName,selectedOption
    }
    return await Post.updateOne({_id:postId},{$addToSet:{reported:data}})
  } catch (error) {
    console.log(error)
  }
}
//post update
const updatePostHelper= async(editDiscription : string,postId : string)=>{
 try {
  return await Post.updateOne({_id:postId},{description:editDiscription})
 } catch (error) {
  console.log(error);
  
 }
}
//add comment 
const addCommentHelper = async(comment :string, postId : string, commentedUesr : string)=>{
try {
  const singleComment = {
    comment,
    postId,
    commentedUesr 
  }
  const  newComment = new Comment(singleComment);
  return newComment.save()
  // return data

} catch (error) {
  console.log(error);
  
  }
}
//get all comment
const getCommentHelper = async(postId: string) =>{
  try {
    // const response = await Comment.find({postId:postId});
    const response = await Comment.aggregate([
      {
        $match:{postId:new ObjectId(postId)}
      },
      {
        $lookup:{
          from: "users",
          localField: "commentedUesr",
          foreignField: "userName",
          as: "commentdata"
        }
      },
      {
        $unwind:{ path: "$commentdata"}
      },
      {
        $project:{
          commentedUesr:1,
          postId:1,
          comment:1,
          liked:1,
          reply:1,
          createdAt:1,
          firstName:"$commentdata.firstName",
          lastName:"$commentdata.lastName",
          dp:"$commentdata.dp"
        }
      },
      {
        $unwind:{
          path: "$reply"
        }
      },
      {
        $lookup:{
          from: "users",
          localField: "reply.userName",
          foreignField: "userName",
          as: "replyData",
        }
      },
      {
        $unwind:{
          path: "$replyData"
        }
      },
      {
        $project:{
          _id: 1,
          commentedUesr: 1,
          firstName: 1,
          lastName: 1,
          postId: 1,
          dp: 1,
          comment: 1,
          liked: 1,
          createdAt: 1,
          reply: {
            _id:1,
            userName: 1,
            comment: 1,
            createdAt: 1,
            firstName: "$replyData.firstName",
            lastName: "$replyData.lastName",
            dp: "$replyData.dp",
            time: "$replyData.createdAt",
          }
        }
      },
      {
        $group:{
          _id: "$_id",
  commentedUesr: {
    $first: "$commentedUesr",
  },
  dp: {
    $first: "$dp",
  },
  firstName: {
    $first: "$firstName",
  },
  lastName: {
    $first: "$lastName",
  },
  liked: {
    $first: "$liked",
  },
  comment: {
    $first: "$comment",
  },
  createdAt: {
    $first: "$createdAt",
  },
  reply: {
    $push: "$reply",
  },
        }
      }
    ])
    //  console.log("getCommentHelper..............",response);
    
    return response;
  } catch (error) {
    console.log(error);
    
  }
}
//Like comment
const cmtLike = async(cmtId :string,userName : string) =>{
  try {
    const response = await Comment.findOneAndUpdate({_id:cmtId},{$addToSet:{liked:userName}})
     console.log("response helper..Like..." ,response);
    
    return response;
  } catch (error) {
    console.log("error in helper",error);
    
  }
}
//unlike comment
const cmtUnlike = async(cmtId :string,userName : string)=>{
  try {
    const response = await Comment.updateOne({_id:cmtId},{$pull:{liked:userName}})
    console.log("response in helper unlike...",response);
    
    return response;
  } catch (error) {
    
  }
}
//save post
const savePost = async(userName : string,postID :string)=>{
try {
  const response = await User.findOneAndUpdate({userName:userName},{$addToSet:{savedItems:postID}})
  return response;
} catch (error) {
  console.log("error in helper",error);
  
}
}
//unsave post
const unsavePost = async(userName : string,postID :string)=>{
try {
  const response = await User.updateOne({userName:userName},{$pull:{savedItems:postID}})
  console.log("response helper.unsave..",response);
  
  return response;
} catch (error) {
  console.log("error in helper");
  
}
}
//delete comment
const deleteComment = async(cmtId: string)=>{
  try {
    
   const response= await Comment.findOneAndDelete({_id:cmtId})
  //  console.log("helper...",response);
   
   return response;
  } catch (error) {
    console.log("error in helper");
    
  }
}
//comment reply
const commentReply =async(commentId:string,userName:string,comment:string)=>{
  try {
    const replyData={
      userName,
      comment,
      _id:new ObjectId()
    }
    const response = await Comment.findByIdAndUpdate({_id:commentId},{$push:{reply:replyData}},{ new: true } )
   console.log("ggggggggggggggggg",response);
   
    return response;
    
  } catch (error) {
    console.log("error in helper");
  }
}

  return{
    addPost,
    getAllPostDb,
    likePostHelper,
    unlikeHelper,
    deletePost,
    reportPost,
    updatePostHelper,
    addCommentHelper,
    getCommentHelper,
    cmtLike ,
    cmtUnlike ,
    savePost,
    unsavePost ,
    deleteComment,
    commentReply
  }
}
export type postRepositoryMongoDB= typeof postRepositoryMongoDB;