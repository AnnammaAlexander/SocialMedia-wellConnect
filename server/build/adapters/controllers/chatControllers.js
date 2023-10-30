"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const chatAuth_1 = require("../../application/useCases/chatAuth");
const chatControllers = (chatDbRepository, chatDbService) => {
    const dbChatRepository = chatDbRepository(chatDbService());
    //search people for chat
    const search = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("connnnnnnnnn....", req.body.value);
            const response = yield (0, chatAuth_1.searchForChat)(req.body.value, dbChatRepository);
            res.json(response);
        }
        catch (error) {
            console.log("errror in controllers", error);
        }
    }));
    //create chat room
    const singleChatRoom = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userName = req.headers["x-user"];
            const response = yield (0, chatAuth_1.chatRoom)(userName, req.body.guestUser, dbChatRepository);
            // console.log("rrrrrrrrrrrrrrrr",response);
            res.json(response);
        }
        catch (error) {
            console.log("errror in controllers", error);
        }
    }));
    //send message
    const sendChatMessage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const senderName = req.headers["x-user"];
            console.log("chatid ,,,,,", req.body.chatId);
            const response = yield (0, chatAuth_1.createMsg)(req.body.chatId, req.body.currentMessage, senderName, dbChatRepository);
            //   console.log("sendMessage.........",response);
            res.json(response);
        }
        catch (error) {
            console.log("errror in controllers", error);
        }
    }));
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
exports.default = chatControllers;
