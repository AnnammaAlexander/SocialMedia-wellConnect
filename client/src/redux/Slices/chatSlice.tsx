import { createSlice } from "@reduxjs/toolkit";

const chatslice = createSlice({
    name:"chatMsg",
    initialState:{
        onlineUsers:[]
    },
    reducers :{
        setOnlineUsers:(state,action) =>{
            state.onlineUsers=action.payload
        }
    }
})
export const {setOnlineUsers} = chatslice.actions;
export default chatslice.reducer;
