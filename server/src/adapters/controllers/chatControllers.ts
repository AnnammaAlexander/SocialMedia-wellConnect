import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { chatDbInterface } from "../../application/repositories/chatDbRepository";
import { chatRepositoryMongoDB } from "../../frameworks/database/mongoDB/repositories/chatHelperRepository";
import {
  searchForChat,
  chatRoom,
  createMsg,
} from "../../application/useCases/chatAuth";
const chatControllers = (
  chatDbRepository: chatDbInterface,
  chatDbService: chatRepositoryMongoDB
) => {
  const dbChatRepository = chatDbRepository(chatDbService());

  //search people for chat
  const search = asyncHandler(async (req: Request, res: Response) => {
    try {
      console.log("connnnnnnnnn....", req.body.value);
      const response = await searchForChat(req.body.value, dbChatRepository);
      res.json(response);
    } catch (error) {
      console.log("errror in controllers", error);
    }
  });

  //create chat room
  const singleChatRoom = asyncHandler(async (req: Request, res: Response) => {
    try {
      const userName = req.headers["x-user"] as string;
      const response = await chatRoom(
        userName,
        req.body.guestUser,
        dbChatRepository
      );
      // console.log("rrrrrrrrrrrrrrrr",response);
      res.json(response);
    } catch (error) {
      console.log("errror in controllers", error);
    }
  });
  //send message
  const sendChatMessage = asyncHandler(async (req: Request, res: Response) => {
    try {
      const senderName = req.headers["x-user"] as string;
console.log("chatid ,,,,,",req.body.chatId);

      const response= await createMsg(
        req.body.chatId,
        req.body.currentMessage,
        senderName,
        dbChatRepository
      );
    //   console.log("sendMessage.........",response);
      
     res.json(response) 
    } catch (error) {
      console.log("errror in controllers", error);
    }
  });
  //get chethistory for single user
  // const chatHistory=asyncHandler((req:Request,res:Response)=>{
  //     try {

  //         console.log("rqr.params......",req.params.userName);
  //         const response= await

  //     } catch (error) {
  //         console.log("errror in controllers",error);
  //     }
  // })

  return {
    search,
    singleChatRoom,
    sendChatMessage,
    // chatHistory
  };
};
export default chatControllers;
