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
exports.chatRepositoryMongoDB = void 0;
const user_1 = __importDefault(require("../models/user"));
const chat_1 = __importDefault(require("../models/chat"));
const message_1 = __importDefault(require("../models/message"));
const chatRepositoryMongoDB = () => {
    //search people for chat
    const searchPeople = (query) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("helper,....", query);
            const regex = new RegExp(query, "i");
            return yield user_1.default.find({
                $or: [
                    { firstName: { $regex: regex } },
                    { lastName: { $regex: regex } },
                    { userName: { $regex: regex } },
                ],
            }
            // {firstName:1,lastName:1,userName:1,profilePic:1,followers:1}
            ).limit(10);
        }
        catch (error) {
            console.log("error in helper", error);
        }
    });
    //create chat room
    const createChatRoom = (userName, guestUser) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield chat_1.default.find({ members: { $all: [userName, guestUser] } });
            // console.log("createChatRoom...response",response);
            if (!response.length) {
                const createChatRoom = {
                    members: [userName, guestUser]
                };
                const NewChat = new chat_1.default(createChatRoom);
                const res = yield NewChat.save();
                return [{ chatId: res._id }];
            }
            else {
                const messages = yield message_1.default.find({ chatId: response[0]._id });
                if (messages.length) {
                    return messages;
                }
                else {
                    return [{ chatId: response[0]._id }];
                }
            }
        }
        catch (error) {
            console.log("error in helper", error);
        }
    });
    //create message
    const createChatMessage = (chatId, currentMessage, senderName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(",,,,,,,,,,,,,,,,,,,", chatId, currentMessage, senderName);
            const chatMsg = {
                chatId,
                currentMessage,
                senderName
            };
            const newChat = new message_1.default(chatMsg);
            console.log("newChat....", newChat);
            return newChat.save();
        }
        catch (error) {
            console.log("error in helper", error);
        }
    });
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
        createChatRoom,
        createChatMessage
    };
};
exports.chatRepositoryMongoDB = chatRepositoryMongoDB;
