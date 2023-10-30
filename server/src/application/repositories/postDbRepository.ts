import {postRepositoryMongoDB} from "../../frameworks/database/mongoDB/repositories/postHelperRepository";

export const postDbRepository = (repository : ReturnType<postRepositoryMongoDB>) =>{
 //add new post 
    const addNewPost = async(
        postedUser:string,
        image:string,
        descriptin:string
    ) =>{
        return await repository.addPost(postedUser,image,descriptin);
    }
//get all post
 const getpost = async(userName:string)=>{
        return await repository.getAllPostDb(userName)
    }
//like post
const likeRepo = async(
    postId:string,
    userName:string
)=>{
    return await repository.likePostHelper(postId,userName)    

}
//unlike post
const unlikeRepo = async(
    postId:string,
    userName:string
)=>{
    return await repository.unlikeHelper(postId,userName)
}

//delete post
const postDelete =async(postId:string,)=>{
    return await repository.deletePost(postId)
}
//report post
const PostReportRepo =async(selectedOption :String,postId :String, userName :String)=>{
    return await repository.reportPost(selectedOption,postId,userName)
}
//post update
    const updatePostRepo = async(editDiscription : string,postId : string) =>{
        return await repository.updatePostHelper(editDiscription,postId)
    }
//add comment
const addComment = async(comment : string,postId : string,userName : string) =>{
try {
    return await repository.addCommentHelper(comment,postId,userName)
} catch (error) {
    console.log(error);
    
}
}  
//get all comments
const getCommentRepo = async(postId:string)=>{
    try {
        return await repository.getCommentHelper(postId)
    } catch (error) {
        console.log(error);
        
    }

}
//comment like
const cmtLikeRepo = async(cmtId :string,userName : string)=>{
    try {
        return await repository.cmtLike(cmtId,userName)
    } catch (error) {
        
    }
}
//comment unlike
const cmuUnlikeRepo = async(cmtId :string,userName : string)=>{
    try {
        return await repository.cmtUnlike(cmtId,userName)
    } catch (error) {
       console.log("error in repository",error);
        
    }
}
//save post
const savePostRepo = async(userName : string,postID :string)=>{
    try {
        return await repository.savePost(userName,postID)
    } catch (error) {
        console.log("error in repository",error);
        
    }

}
//unsave post
const unsavePostRepo = async(userName : string,postID :string)=>{
try {
    return await repository.unsavePost(userName,postID)
} catch (error) {
    console.log("error in repo");
    
}
}
//delete comment
const deleteCommentRepo = async(cmtId:string)=>{
    try {
       return await repository.deleteComment(cmtId) 
    } catch (error) {
        console.log("error in repo");
    }
}
//replt comment
const commentReplyRepo = async(commentId:string,userName:string,comment:string)=>{
    try {
        return await repository.commentReply(commentId,userName,comment)
    } catch (error) {
        console.log("error in repo",error);
    }
}

//retun all functions
    return{
        addNewPost,
        getpost,
        likeRepo,
        unlikeRepo,
        postDelete,
        PostReportRepo,
        updatePostRepo ,
        addComment,
        getCommentRepo,
        cmtLikeRepo ,
        cmuUnlikeRepo ,
        savePostRepo ,
        unsavePostRepo ,
        deleteCommentRepo,
        commentReplyRepo
        
    }

}
export type postDbInterface = typeof postDbRepository