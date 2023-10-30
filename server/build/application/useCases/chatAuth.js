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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMsg = exports.chatRoom = exports.searchForChat = void 0;
//search people for chat
const searchForChat = (query, dbChatRRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield dbChatRRepository.searchChat(query);
        return response;
    }
    catch (error) {
        console.log("error in useCase", error);
    }
});
exports.searchForChat = searchForChat;
//create chat room
const chatRoom = (userName, guestUser, dbChatRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield dbChatRepository.createChatRoomRepo(userName, guestUser);
        return response;
    }
    catch (error) {
        console.log("error in usecase", error);
    }
});
exports.chatRoom = chatRoom;
//create message
const createMsg = (chatId, currentMessage, senderName, dbChatRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield dbChatRepository.createChatMsgRepo(chatId, currentMessage, senderName);
        return res;
    }
    catch (error) {
        console.log("error in usecase", error);
    }
});
exports.createMsg = createMsg;
