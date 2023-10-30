import mongoose from "mongoose";
import Post from "../models/post";
import User from "../models/user";
import Chat from "../models/chat";
import Message from "../models/message";
export const chatRepositoryMongoDB = () => {
  //search people for chat
  const searchPeople = async (query: string) => {
    try {
      console.log("helper,....", query);

      const regex = new RegExp(query, "i");
      return await User.find(
        {
          $or: [
            { firstName: { $regex: regex } },
            { lastName: { $regex: regex } },
            { userName: { $regex: regex } },
          ],
        }
        // {firstName:1,lastName:1,userName:1,profilePic:1,followers:1}
      ).limit(10);
    } catch (error) {
      console.log("error in helper", error);
    }
  };

//create chat room
const createChatRoom = async(userName:string,guestUser:string)=>{
    try {
      const response:any = await Chat.find({members:{$all:[userName,guestUser]}})
      // console.log("createChatRoom...response",response);
      if(!response.length){
        const createChatRoom ={
          members:[userName,guestUser]
        }
        const NewChat =new Chat(createChatRoom);
        const res= await NewChat.save();
        return [{chatId:res._id}];
      }else{

        const messages= await Message.find({chatId:response[0]._id}) 
        if(messages.length){
          return messages
        }else{
          return [{chatId:response[0]._id}];
        }
      }
            
    } catch (error) {
      console.log("error in helper", error);

    }
}
//create message
 const createChatMessage = async(chatId:string,currentMessage:string,senderName:string)=>{
  try {
    console.log(",,,,,,,,,,,,,,,,,,,",chatId,currentMessage,senderName );
    
    const chatMsg={
      chatId,
      currentMessage,
      senderName
    }
    const newChat =new Message(chatMsg);
    console.log("newChat....",newChat);
    
    return newChat.save()
  } catch (error) {
    console.log("error in helper", error);
 
  }
 }





  //get chat history for a single user
  // const getchathistory = async(userName:string)=>{
  //   try {
  //       const response = await User.find
  //   } catch (error) {
  //       console.log("error in helper", error);
  
  //   }
  // }

  return {
    searchPeople,
    createChatRoom ,
    createChatMessage

  };
};
export type chatRepositoryMongoDB = typeof chatRepositoryMongoDB;
