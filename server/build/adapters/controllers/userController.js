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
const userAuth_1 = require("../../application/useCases/userAuth");
const userControllers = (userDbInterface, userDbService) => {
    const dbUserRepository = userDbInterface(userDbService());
    //add profile image
    const uploadProfileImage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log("profile photo....",req?.file);
        var _a, _b;
        const profileImage = (_b = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path) === null || _b === void 0 ? void 0 : _b.split("/profile-")[1];
        const userName = req.headers["x-user"];
        // console.log('profileimageggggggggggg:',profileImage);
        const response = yield (0, userAuth_1.addProfileImage)(userName, profileImage, dbUserRepository);
        if (response) {
            res.json({ profileImage: profileImage });
        }
    }));
    //get profile image
    const getImage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userName = req.params.user;
        console.log("..............................", userName);
        const response = yield (0, userAuth_1.getProfileDp)(userName, dbUserRepository);
        console.log("response from get profile image ...............", response);
        // console.log("image....../:", response?.dp);
        res.json(response);
    }));
    //update profile
    const updateProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userName = req.headers["x-user"];
        // const {firstName,lastName,email, phoneNumber,city,gender,bio} =req.body
        const response = yield (0, userAuth_1.profileDetails)(userName, req.body.values.firstName, req.body.values.lastName, req.body.values.email, req.body.values.phoneNumber, req.body.values.city, req.body.values.gender, req.body.values.bio, dbUserRepository);
        // console.log("response in controller.............",response);
        if (response) {
            res.json(response);
        }
        console.log("firstName,lastName,email,gender,bio", req.body.values.firstName);
    }));
    //uploadCoverPic
    const uploadCoverPic = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d;
        try {
            const userName = req.headers["x-user"];
            // console.log("rrrrrrrrrrrrrrrrr",req.file);
            const coverPhoto = (_d = (_c = req.file) === null || _c === void 0 ? void 0 : _c.path) === null || _d === void 0 ? void 0 : _d.split("/profile-")[1];
            const response = yield (0, userAuth_1.uploaCoverPic)(userName, coverPhoto, dbUserRepository);
            if (response) {
                console.log("response in controler............", response);
                res.json({ response });
            }
        }
        catch (error) {
            console.log("error in controller...", error);
        }
    }));
    //get saved items
    const getSavedImages = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userName = req.headers["x-user"];
            const response = yield (0, userAuth_1.getSavedImg)(userName, dbUserRepository);
            if (response) {
                console.log("responsellllllllllllll:", response);
                res.json(response);
            }
        }
        catch (error) {
            console.log("error in controller...", error);
        }
    }));
    //follow
    const followPeople = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userName = req.headers["x-user"];
            const response = yield (0, userAuth_1.followHander)(req.body.user, userName, dbUserRepository);
            res.json(response);
        }
        catch (error) {
            console.log("error in controller...", error);
        }
    }));
    //get followers
    const getFollowers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, userAuth_1.getFollowersList)(req.params.user, dbUserRepository);
            console.log("gggggggggggggg", response);
            res.json(response);
        }
        catch (error) {
            console.log("error in controller...", error);
        }
    }));
    //get about
    const getAboutController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, userAuth_1.getAbout)(req.params.user, dbUserRepository);
            console.log("getAboutController...", getAboutController);
            res.json(response);
        }
        catch (error) {
            console.log("error in controller...", error);
        }
    }));
    return {
        uploadProfileImage,
        getImage,
        updateProfile,
        uploadCoverPic,
        getSavedImages,
        followPeople,
        getFollowers,
        getAboutController
    };
};
exports.default = userControllers;
