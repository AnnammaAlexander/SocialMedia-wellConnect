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
exports.chatDbRepository = void 0;
const chatDbRepository = (repository) => {
    //search people for chat
    const searchChat = (query) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.searchPeople(query);
        }
        catch (error) {
            console.log("error in repository", error);
        }
    });
    //create chat room
    const createChatRoomRepo = (userName, guestUser) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.createChatRoom(userName, guestUser);
        }
        catch (error) {
            console.log("error in repository", error);
        }
    });
    //create message
    const createChatMsgRepo = (chatId, currentMessage, senderName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.createChatMessage(chatId, currentMessage, senderName);
        }
        catch (error) {
            console.log("error in repository", error);
        }
    });
    return {
        searchChat,
        createChatRoomRepo,
        createChatMsgRepo
    };
};
exports.chatDbRepository = chatDbRepository;
