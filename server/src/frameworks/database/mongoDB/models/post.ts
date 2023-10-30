import mongoose, {Schema ,SchemaType ,model} from "mongoose";
const postSchema = new Schema({
    postedUser :{
        type :String,
        required:true
        
    },
    image :{
        type :String,
        required :true
    },
    description:{
        type:String,
    },
    like:[] ,
    listed :Boolean ,
    reported :[],


},{timestamps :true});

const Post = model("Post",postSchema);
export default Post;