import { createSlice, } from "@reduxjs/toolkit";


//create slice
const postSlice = createSlice({
    name:"posts",
    initialState :{
        allPosts:[]
    },
    reducers :{
        setPost:(state,action)=>{
            state.allPosts = action.payload
        }
    }
})
export const {setPost} = postSlice.actions;
export default postSlice.reducer;