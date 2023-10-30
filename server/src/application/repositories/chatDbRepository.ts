import { chatRepositoryMongoDB } from "../../frameworks/database/mongoDB/repositories/chatHelperRepository";

export const chatDbRepository = (repository :ReturnType<chatRepositoryMongoDB>) =>{


//search people for chat
    const searchChat = async(query:string)=>{
        try {
            return await  repository.searchPeople(query)
        } catch (error) {
           console.log("error in repository",error);
            
        }
    } 
//create chat room
    const createChatRoomRepo = async(userName:string,guestUser:string)=>{
        try {
           return await repository.createChatRoom(userName,guestUser) 
        } catch (error) {
            console.log("error in repository",error);
        }
    }
//create message
const createChatMsgRepo =async(chatId:string,currentMessage:string,senderName:string) =>{
    try {
        return await repository.createChatMessage(chatId,currentMessage,senderName)
    } catch (error) {
        console.log("error in repository",error);
    }
}
    return{
        searchChat ,
        createChatRoomRepo ,
        createChatMsgRepo
    }
}
export type chatDbInterface = typeof chatDbRepository