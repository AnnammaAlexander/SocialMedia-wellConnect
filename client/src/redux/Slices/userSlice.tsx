import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Interfaces/userInterfaces";


const getToken = ()=>{
    const token = localStorage.getItem('token')
    if(token) return token
}

interface UserState {
    items:  User,
    token?: string
    
}

const initialState:UserState = {
    token:getToken(),
    items:{
        firstName:'',
        lastName:'',
        userName:'',
        email:'',
        phoneNumber:0,
        dp:'',
        coverImag:'',
        bio:null,
        gender:null,
        city:null,
        isBlock:null,
        blockedUsers:null,
        followers:null,
        following:null,
        requests:null,
        requested:null,
        savedItems:[] ,
        token:null,

    }
}
//create userslice
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers :{
        setToken:(state,action)=>{
            state.token = action.payload
        },
        setProfileImages :(state,action)=>{
            state.items.dp =action.payload;
        },
        setCoverPhoto:(state,action)=>{
            state.items.coverImag = action.payload;
        },
        setUser :(state,action :PayloadAction<User>) =>{
            state.items = action.payload
        
          
            // state.items.firstName =action.payload.firstName
            // state.items.lastName = action.payload.lastName
            // state.items.userName = action.payload.userName
            // state.items.email = action.payload.email
            // state.items.phoneNumber = action.payload.phoneNumber
            // state.items.dp = action.payload.dp
            // state.items.bio = action.payload.bio
            // state.items.gender = action.payload.gender
            // state.items.city = action.payload.city
            // state.items.isBlock = action.payload.isBlock
            // state.items.blockedUsers= action.payload.blockedUsers
            // state.items.followers = action.payload.followers
            // state.items.following = action.payload.following
            // state.items.requests = action.payload.requests
            // state.items.requested = action.payload.requested
            // state.items.token = action.payload.token

            // console.log('username....',state.items.userName);
            
        },
        clearUserDetails :(state) =>{
            state.token = '',
            state.items ={
                firstName:'',
                lastName:'',
                userName:'',
                email:'',
                phoneNumber:0,
                dp:'',
                coverImag:'',
                bio:null,
                gender:null,
                city:null,
                isBlock:null,
                blockedUsers:null,
                followers:null,
                following:null,
                requests:null,
                requested:null,
                savedItems:[],
                token :null
            }
        }
    }
})
export default userSlice.reducer;
export const {setUser,setToken ,clearUserDetails,setProfileImages,setCoverPhoto } = userSlice.actions
 