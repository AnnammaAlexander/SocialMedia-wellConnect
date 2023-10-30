import baseURL from "../api";
import {toast} from 'react-toastify';
import { PostResponse } from "../../Interfaces/postInterfaces";

//upload post

export const imageUpload = async (inputFile:File |null,description:string,userName:string)=>{
    try{
        console.log('in api inputFile',inputFile);
        
        const formData = new FormData();
        
                if(inputFile !==null){

                    formData.append("uploadPost",inputFile);
                    formData.append("description",description);
                    formData.append("postedUser",userName)
                    
                    
                  
                    const response= await baseURL.post<PostResponse>("/post/upload",formData,{
                        headers: {
                            "Content-Type" : "multipart/form-data",
                        }
                        })
                            if(response.data.status==="success") {
                            toast.success(`Upload post successfully !!`, {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                              });
                              return response.data.userData
                                
                            } else {
                              toast.error(" failed");
                              return false;
                            }
                        
                         
                       
                }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch (error:any) {
        throw new Error(error.message)
    }
}

//get all post
export const getAllPost = async()=>{
    try {
        
        
        
        const response = await baseURL.get("/post/getpost")
        
        
        return response?.data

    } catch (error) {
        console.log('error in get all post',error);
        
    }
}
//like post
export const like =async(postId: string,userName: string)=>{
    try {
       const response= await baseURL.post("/post/like",{postId,userName})
        // console.log("like response.....:",response.data.status);
        if(response.data.status===true){

            return response.data.status;
        }
    } catch (error) {
       return error; 
    }
}
//unlike the post
export const Unlike= async(postId: string ,userName :string)=>{
    try {
        const response = await baseURL.post("/post/unlike",{postId ,userName})
        return response.data.status;
    } catch (error) {
        return error;
    }
}
//delete post
export const deletePost= async(postId : string) =>{
    try {
        const response = await baseURL.post("/post/deletepost",{postId})
        return response?.data?.status
    } catch (error) {
        return error;
    }
}
//report post
export const reportSinglePost = async(selectedOption :string, postId :string) =>{
    try {
        
        
        
        const response = await baseURL.post("/post/report",{selectedOption,postId})
        // console.log("response.....",response.data.status);
        
        return response?.data?.status
    } catch (error) {
        return error
    }
    
}
//update post
export const editpostApi = async(editDiscription:string,postId: string)=>{
    try {
        const response = await baseURL.post("/post/updatePost",{editDiscription , postId})
        // console.log("responsse..............",response.data.status);
        
        return response?.data?.status;
    } catch (error) {
        return error
    }
} 
//add comment
export const addComment = async(comment : string ,postId : string ) =>{
    try {
        
      const response= await baseURL.post("/post/addComment",{comment,postId}) 
      console.log("response.data.....",response.data);
      return response?.data;
      
    } catch (error) {
       console.log(error);
        
    }
}
export const commentList = async(postId :string) =>{

    
    const response = await baseURL.get(`/post/getComment/${postId}`)
    return response?.data
} 

export const commentLike = async(cmtId :string,userName :string ) =>{
    const response = await baseURL.post("/post/cmtLike",{cmtId,userName})
    return response;
}
//unlike comment
export const commentUnlike = async(cmtId :string,userName :string) =>{
    const response = await baseURL.post("/post/cmtUnlike",{cmtId,userName})
    console.log("comment unlike..../;",response);
    
    return response;
}
//save post
export const savePost = async(userName : string,postID :string)=>{
    console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
    
    const response =await baseURL.post("/post/savepost",{userName,postID})
    return response;
}
//unSave post
export const unSavePost = async(userName:string,postID: string)=>{
    try {
       const response = await baseURL.post("/post/unsavepost",{userName,postID})
       console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
       
       return response ;
    } catch (error) {
       console.log("error in api");
        
    }
}
//delete comment
export const cmtdelete =async(cmtId:string)=>{
    try {
        // console.log("commentid.......2222",cmtId);
        
        const response = await baseURL.post("/post/deletecmt",{cmtId})
        console.log("response////",response);
        
        return response;
    } catch (error) {
console.log("error in api",error);

    }
}
//reply comment
export const commentReply= async(commentId:string,userName:string,comment:string)=>{
    try {
        
        const response = await baseURL.post("/post/replycmt",{commentId,userName,comment})
        return response.data;        
    } catch (error) {
        console.log("error in api",error);  
    }}
