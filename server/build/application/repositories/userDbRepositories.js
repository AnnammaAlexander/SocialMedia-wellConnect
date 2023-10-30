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
exports.userDbRepository = void 0;
const userDbRepository = (repository) => {
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.addUser(user);
    });
    const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getUserByEmail(email);
    });
    const getUserByUserName = (userName) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getUserByUserName(userName);
    });
    //Add profile image
    const profileImageRepo = (userName, profileImage) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.addProfileImage(userName, profileImage);
    });
    //get profile image
    const getProImageRepo = (userName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.getProfileImage(userName);
        }
        catch (error) {
            console.log("error in repo", error);
        }
    });
    //update profile
    const profileDetailsRepo = (userName, firstName, lastName, email, phoneNumber, city, gender, bio) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.saveProfileDetails(userName, firstName, lastName, email, phoneNumber, city, gender, bio);
        }
        catch (error) {
            console.log("error in repo", error);
        }
    });
    //upload cover photo 
    const uploadCoverPicRepo = (userName, coverPhoto) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.updateCoverPic(userName, coverPhoto);
        }
        catch (error) {
            console.log("error in repo", error);
        }
    });
    //get saved
    const getSavedRepo = (userName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.getSaved(userName);
        }
        catch (error) {
            console.log("error in repo", error);
        }
    });
    //follow handler
    const followHanderRepo = (user, userName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.followHander(user, userName);
        }
        catch (error) {
            console.log("error in repo", error);
        }
    });
    //get followList
    const followersListRepo = (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.followersList(user);
        }
        catch (error) {
            console.log("error in repo", error);
        }
    });
    //get about
    const getAboutRepo = (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.getAbout(user);
        }
        catch (error) {
            console.log("error in repo", error);
        }
    });
    return {
        addUser,
        getUserByEmail,
        getUserByUserName,
        profileImageRepo,
        getProImageRepo,
        profileDetailsRepo,
        uploadCoverPicRepo,
        getSavedRepo,
        followHanderRepo,
        followersListRepo,
        getAboutRepo,
    };
};
exports.userDbRepository = userDbRepository;
