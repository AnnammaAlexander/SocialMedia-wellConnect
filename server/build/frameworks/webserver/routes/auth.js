"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../../../adapters/controllers/authController"));
const authServiceInterface_1 = require("../../../application/services/authServiceInterface");
const authService_1 = require("../../services/authService");
const userDbRepositories_1 = require("../../../application/repositories/userDbRepositories");
const userRepository_1 = require("../../database/mongoDB/repositories/userRepository");
const authRouter = () => {
    const router = express_1.default.Router();
    const controllers = (0, authController_1.default)(authServiceInterface_1.authServiceInterface, authService_1.authServices, userDbRepositories_1.userDbRepository, userRepository_1.userRepositoryMongoDB);
    router.post('/register', controllers.signupUser);
    router.post('/login', controllers.loginUser);
    router.post('/googlesignup', controllers.signUpWithGoogle);
    return router;
};
exports.default = authRouter;
