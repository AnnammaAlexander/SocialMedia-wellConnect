"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const post_1 = __importDefault(require("./post"));
const user_1 = __importDefault(require("./user"));
const chat_1 = __importDefault(require("./chat"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const adminAuth_1 = __importDefault(require("./adminAuth"));
// import userRouter from './user';
const routes = (app) => {
    app.use('/api/auth', (0, auth_1.default)()),
        app.use('/api/post', authMiddleware_1.default, (0, post_1.default)());
    app.use('/api/profile', authMiddleware_1.default, (0, user_1.default)());
    app.use('/api/chat', authMiddleware_1.default, (0, chat_1.default)());
    app.use('/api/adminauth', (0, adminAuth_1.default)());
};
exports.default = routes;
