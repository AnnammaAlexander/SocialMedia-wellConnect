"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatControllers_1 = __importDefault(require("../../../adapters/controllers/chatControllers"));
const chatDbRepository_1 = require("../../../application/repositories/chatDbRepository");
const chatHelperRepository_1 = require("../../database/mongoDB/repositories/chatHelperRepository");
const chatRouter = () => {
    const router = express_1.default.Router();
    const controllers = (0, chatControllers_1.default)(chatDbRepository_1.chatDbRepository, chatHelperRepository_1.chatRepositoryMongoDB);
    router.post('/chatsearch', controllers.search);
    router.post('/createroom', controllers.singleChatRoom);
    router.post('/sendmessage', controllers.sendChatMessage);
    // router.get('/getChatHistory/:userName',controllers.chatHistory)
    return router;
};
exports.default = chatRouter;
