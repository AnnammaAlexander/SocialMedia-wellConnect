import mongoose ,{Schema ,SchemaType,model } from "mongoose";


//user schema
const userSchema=new Schema({
    firstName:{
        type:String,
        required:true,
        
    },
    lastName:{
        type:String,
        
    },

   
    userName:{
        type:String,
        // required:true,
        // unique:true
    },
    email:{
        type:String,
        required :true
    },
    phoneNumber:{
        type:Number,
        default:""
    },
    password:{
        type:String,
        
    },
    dp:{
        type:String,
        default:"",
    },
    bio:{
        type:String,
        default:"",
    },
    gender:{
        type:String,
        default:"",
    },
    city:{
        type:String,
        default:"",
    },
    isBlock:{
        type:Boolean,
        default :false
    },
    coverImag:{
        type:String,
        default:""
    },
    blockedUsers: [],
    followers :[],
    following :[],
    requests: [],
    requested: [],
    savedItems :[]


    
},{timestamps: true});

const User = model("User",userSchema);
export default User;
