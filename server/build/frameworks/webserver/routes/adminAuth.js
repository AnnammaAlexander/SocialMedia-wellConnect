"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuthController_1 = __importDefault(require("../../../adapters/controllers/adminAuthController"));
const authService_1 = require("../../services/authService");
const authServiceInterface_1 = require("../../../application/services/authServiceInterface");
const adminHelperRepo_1 = require("../../database/mongoDB/repositories/adminHelperRepo");
const adminDbRepository_1 = require("../../../application/repositories/adminDbRepository");
const adminAuthRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, adminAuthController_1.default)(authServiceInterface_1.authServiceInterface, authService_1.authServices, adminDbRepository_1.adminDbRepository, adminHelperRepo_1.adminRepositoryMongoDB);
    router.post('/adminSignin', controller.signInAdmin);
    return router;
};
exports.default = adminAuthRouter;
