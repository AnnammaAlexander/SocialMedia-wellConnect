"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../../../adapters/controllers/userController"));
const userDbRepositories_1 = require("../../../application/repositories/userDbRepositories");
const userRepository_1 = require("../../database/mongoDB/repositories/userRepository");
const cloudinaryConfig_1 = require("../middlewares/cloudinaryConfig");
const userRouter = () => {
    const router = express_1.default.Router();
    const controllers = (0, userController_1.default)(userDbRepositories_1.userDbRepository, userRepository_1.userRepositoryMongoDB);
    router.post('/uploadProfile', cloudinaryConfig_1.uploadProImage, controllers.uploadProfileImage);
    router.get('/getdp/:user', controllers.getImage);
    router.post('/updateProfile', controllers.updateProfile);
    router.post('/uploadCoverpic', cloudinaryConfig_1.uploadCoverPic, controllers.uploadCoverPic);
    router.get('/getsaved', controllers.getSavedImages);
    router.post('/follow', controllers.followPeople);
    router.get('/follow/:user', controllers.getFollowers);
    router.get('/about/:user', controllers.getAboutController);
    return router;
};
exports.default = userRouter;
