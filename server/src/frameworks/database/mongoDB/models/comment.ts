import { Schema,model } from "mongoose";
import Post from "./post";

const commentSchema = new Schema(
    {
        commentedUesr:{
            type: String,
            required:true
        },
    
    
        listed:{
          type : Boolean  
        },
        postId :{
            type :Schema.Types.ObjectId,
            ref:Post,
            required:true
        },
        comment :{
            type:String
        },
        liked:[],
        reply :[],
        reported :[],
    
    },
    {timestamps:true}
)
const Comment = model("Comment",commentSchema)
export default Comment;