import asyncHandler from "express-async-handler";
import { Request,Response } from "express";
import { postDbInterface } from "../../application/repositories/postDbRepository"; 
import { postRepositoryMongoDB } from "../../frameworks/database/mongoDB/repositories/postHelperRepository";
import { addPost ,getAllPost,likeUseCase,unlikeUsecase ,
    postDelete,reportPost,updatePost,comment,getAllComment,
    likeSingleCmt,unlikeComment,savePst,unsavepost, deleteComment, commentReply} from "../../application/useCases/postAuth";
const postControllers = (
    postDbRepository:postDbInterface,
    postDbService:postRepositoryMongoDB
)  =>{
    const dbPostRepository = postDbRepository(postDbService())

//upload new post
    const uploadPost = asyncHandler (async(req:Request,res:Response)=>{
        // console.log("header..................",req.headers)
        // const postedUser =req.headers["x-user"] as string;
        
            //  console.log("fileeeeeeeeeee",req.file?.path);
            const cloudinaryPost = req.file?.path?.split("/post-")[1] as string
            // console.log("req.body:",req.body.description);

            const postResponse =await addPost(req.body.postedUser,cloudinaryPost ,req.body.description,dbPostRepository)              
            res.json(postResponse)    
    })
//get post
const getPost = asyncHandler(async(req:Request,res:Response)=>{
    
    const userName= req.headers['x-user'] as string
     console.log("mmmmmmmmmmmmmmmmm",userName);
    
     const response = await getAllPost(userName,dbPostRepository)
      console.log("get all post from db .....:",response);
     
     res.json(response)

})
//like post
const likePost = asyncHandler(async(req:Request,res:Response)=>{
    await likeUseCase(req.body.postId,req.body.userName,dbPostRepository)
    res.json({status:true})
})
//unlike post 
const unlikePost = asyncHandler(async(req:Request,res:Response)=>{
    await unlikeUsecase(req.body.postId,req.body.userName,dbPostRepository)
    res.json({status:false})
})
//delete post
const deletePost =asyncHandler(async(req:Request,res:Response)=>{
    
    await postDelete(req.body.postId,dbPostRepository)
    res.json({status:true}) 
})
//report post
const postReport = asyncHandler(async(req:Request,res:Response)=>{
    const userName = req.headers['x-user'] as string;
    
    await reportPost(req.body.selectedOption, req.body.postId,userName,dbPostRepository)
    res.json({status :true})
})
//update post
const postUpdate = asyncHandler(async(req:Request,res:Response)=>{
    await updatePost(req.body.editDiscription ,req.body.postId,dbPostRepository)
    res.json({status:true})

    
})
//add comment
const addComment = asyncHandler(async(req :Request,res :Response)=>{
    const userName= req.headers['x-user'] as string;
     const data =await comment(req.body.comment,req.body.postId,userName,dbPostRepository)
     res.json(data)
})
//get comment 
const getComments = asyncHandler(async(req:Request,res:Response)=>{
    const data = await getAllComment(req.params.id, dbPostRepository)
    
    res.json(data)
}) 

//
const commentLike = asyncHandler(async(req :Request,res:Response)=>{
    try {
        console.log("controller...",req.body.cmtId,req.body.userName);
        
        const response = await likeSingleCmt(req.body.cmtId,req.body.userName,dbPostRepository)
        console.log("cmmt like....",response);
        res.json({status:true}) ;
        
    } catch (error) {
        console.log("error in controller",error);
        
    }
})
//comment unlike
const cmtUnlike = asyncHandler(async(req:Request,res: Response)=>{
    try {
        const response = await unlikeComment(req.body.cmtId,req.body.userName,dbPostRepository)
        
        res.json({status:true})
        
    } catch (error) {
        console.log("error in controller",error);
        
    }
})
//save post
const savepost = asyncHandler(async(req:Request,res :Response)=>{
    try {
        console.log("req.body.userName,req.body.postID",req.body.userName,req.body.postID);
        
        const response = await savePst(req.body.userName,req.body.postID,dbPostRepository)
        
        res.json(response)
    } catch (error) {
        console.log("error in controller",error);
        
    }
})
//unsavepost 
const postUnsave = asyncHandler(async(req:Request,res:Response)=>{
    try {
        
        const response= await unsavepost(req.body.userName,req.body.postID,dbPostRepository)
        
        res.json(response)
    } catch (error) {
      console.log("error in controller ",error);
        
    }
})
//delete comment
const cmtDelete = asyncHandler(async(req:Request,res:Response)=>{
    
    const response = await deleteComment(req.body.cmtId,dbPostRepository)
    
    res.json(response)
})
//comment Reply
const replyComment= asyncHandler(async(req:Request,res:Response)=>{
    try {
        const response = await commentReply(req.body.commentId,req.body.userName,req.body.comment,dbPostRepository)
        res.json(response)
    } catch (error) {
        console.log("error in controller ",error);   
    }
})
    return{
        uploadPost,
        getPost,
        likePost,
        unlikePost,
        deletePost ,
        postReport,
        postUpdate,
        addComment,
        getComments,
        commentLike,
        cmtUnlike ,
        savepost ,
        postUnsave ,
        cmtDelete,
        replyComment
    }
}






export default postControllers;