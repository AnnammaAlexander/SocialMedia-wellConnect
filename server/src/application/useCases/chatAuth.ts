import { chatDbInterface } from "../repositories/chatDbRepository";



//search people for chat
export const searchForChat = async(
    query:string ,
    dbChatRRepository :ReturnType<chatDbInterface>
)=>{
try {
    const response = await dbChatRRepository.searchChat(query)
    return response;
} catch (error) {
    console.log("error in useCase",error);
    
}
}
 //create chat room
 export const chatRoom  = async(
    userName:string,
    guestUser:string,
    dbChatRepository :ReturnType<chatDbInterface>

 )=>{
    try {
       const response = await  dbChatRepository.createChatRoomRepo(userName,guestUser)
       return response;
    } catch (error) {
        console.log("error in usecase",error); 
    }
 }
 //create message
 export const createMsg = async(
    chatId:string,
    currentMessage:string,
    senderName:string,
    dbChatRepository :ReturnType<chatDbInterface>
   )=>{
    try {
        const res = await dbChatRepository.createChatMsgRepo(chatId,currentMessage,senderName)
        return res;
    } catch (error) {
        console.log("error in usecase",error);  
    }
 }
