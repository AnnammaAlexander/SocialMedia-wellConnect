import baseURL from "../api";

//seach people for chat
export const chatSearch = async(value:string)=>{
    try {
        
        
        const response= await baseURL.post("/chat/chatsearch",{value})
        
        return response.data;
    } catch (error) {
        console.log("error in api..",error);
    }

}
//create chat room
export const createChatRoom = async(guestUser:string)=>{
    try {
        
        const response = await baseURL.post("/chat/createroom",{guestUser})
        // console.log("createChatRoom",response);
        
        return response.data;
        
    } catch (error) {
        console.log("error in api..",error);
  
    }
}
//send message
export const sendMessage= async(chatId:string,currentMessage:string)=>{
    try {
        console.log(chatId,currentMessage,"chatId,guestUser,currentMessage",);
        
        const response = await baseURL.post("/chat/sendmessage",{chatId,currentMessage})
        // console.log("hiiiiiiiiiiiiiiiiii,,,,,",response);
        
        return response.data;
    } catch (error) {
        console.log("error in api..",error);
  
    }
}

//get chatHistory
// export const getChatHistory = async(userName:string) =>{
//     console.log(",,,,,,,,,,,",userName);
    
//     const response = baseURL.get(`/chat/getChatHistory/${userName}`)
//     return response;
// }