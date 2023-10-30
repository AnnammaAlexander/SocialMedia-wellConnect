import { postDbInterface, postDbRepository } from "../repositories/postDbRepository";


export const addPost = async (
    postedUser :string,
    image :string ,
    description :string,

dbPostRepository:ReturnType<postDbInterface>

)=>{
    
    const data= await dbPostRepository.addNewPost(postedUser,image,description)
    // console.log("data:",data);
    
    if(data){
        const responseData = {
            status: "success",
            message: "Upload post successfully",
            userData: data
        }
        return responseData;
    }
}
//get all post
export const getAllPost = async(
    userName:string,
    dbPostRepository:ReturnType<postDbInterface>
)=>{
    const data= await dbPostRepository.getpost(userName)
    if(data){
        return data;
    }
}
//like post
export const likeUseCase = async(
    postId:string ,
    userName:string,
    dbPostRepository:ReturnType<postDbInterface>
)=>{
    const data = await dbPostRepository.likeRepo(postId,userName)

    if(data){
        return data;
    }
}
//unlike post
export const unlikeUsecase =async (
    postId:string ,
    userName:string,
    dbPostRepository:ReturnType<postDbInterface>
) => {
   const data = await dbPostRepository.unlikeRepo(postId,userName) 
   console.log("unlike data:",data);
   return data;
   
}
//delete post
 export const postDelete = async(
    postId :string,
    dbPostRepository:ReturnType<postDbInterface>
 )=>{
    const status = await dbPostRepository.postDelete(postId)
    return status;
 }

//report post
export const reportPost = async(
    selectedOption: String,
    postId : String,
    userName :String ,
    dbPostRepository:ReturnType<postDbInterface>
    )=>{
        const response=await dbPostRepository.PostReportRepo(selectedOption,postId,userName)
    return response; 
}
export const updatePost = async(
    editDiscription:string,
    postId : string,
    dbPostRepository:ReturnType<postDbInterface>
)=>{
    const response = await dbPostRepository.updatePostRepo(editDiscription,postId)
    return response;
}
//add comment
export const comment = async(
    comment :string,
    postId : string,
    userName : string ,
    dbPostRepository :ReturnType<postDbInterface>
)=>{
    const response = await dbPostRepository.addComment(comment,postId,userName)
    return response;
}
//get All comment
export const getAllComment = async(
    postId : string,
    dbPostRepository :ReturnType<postDbInterface> 
)=>{
    try {
        const response = await dbPostRepository.getCommentRepo(postId);
        return response;
    } catch (error) {
       console.log(error);
        
    }
}
//like single comment
export const  likeSingleCmt = async(
    cmtId : string,
    userName : string ,
    dbPostRepository :ReturnType<postDbInterface>
)=>{
    try {
        const response = await dbPostRepository.cmtLikeRepo(cmtId,userName)
        return response;
        } catch (error) {
        console.log("error in userauth",error);
        
    }
}
//unlike comment
export const unlikeComment = async(
    cmtId : string,
    userName : string ,
    dbPostRepository :ReturnType<postDbInterface>
)=>{
    try {
        const response = await dbPostRepository.cmuUnlikeRepo(cmtId,userName)
        return response
    } catch (error) {
        console.log("error in usecase",error);
        
    }
}
//savepost
export const savePst = async(
    userName : string,
    postID :string ,
    postDbRepository:ReturnType<postDbInterface>
)=>{
    try {
        const response =await postDbRepository.savePostRepo(userName,postID)
        return response;
    } catch (error) {
        console.log("error in usecase..",error);
        
    }
}
//unsave post 
 export const unsavepost = async(
    userName : string,
    postID :string ,
    postDbRepository:ReturnType<postDbInterface>
 )=>{
try {
    const response = await postDbRepository.unsavePostRepo(userName,postID)
    return response;
} catch (error) {
    console.log("error in usecase",error);
    
}
 }
 //delete comment
 export const deleteComment =   async(
    cmtId:string,
    postDbRepository:ReturnType<postDbInterface>
    )=>{
    try {
        const response = await postDbRepository.deleteCommentRepo(cmtId)
        return response;
    } catch (error) {
        console.log("error in usecase",error);

    }
 }
 //comment reply
 export const commentReply =async(commentId:string,
    userName:string,
    comment:string,
    postDbRepository:ReturnType<postDbInterface>
    )=>{
try {
    const response = await postDbRepository.commentReplyRepo(commentId,userName,comment)
    return response;
} catch (error) {
    console.log("error in usecase",error);
}
 }
