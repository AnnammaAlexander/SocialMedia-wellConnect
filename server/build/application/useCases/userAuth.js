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
exports.getAbout = exports.getFollowersList = exports.followHander = exports.getSavedImg = exports.uploaCoverPic = exports.profileDetails = exports.googlesignup = exports.getProfileDp = exports.addProfileImage = exports.userLogin = exports.userSignUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSignUp = (user, authServices, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //  user.email = user.email.toLowerCase();
    const isEmailExist = yield dbUserRepository.getUserByEmail(user.email);
    if (isEmailExist) {
        const userData = {
            status: "failed",
            message: "Email already exist",
            user: {},
            token: "",
        };
        return userData;
    }
    const usernameExist = yield dbUserRepository.getUserByUserName(user.userName);
    if (usernameExist) {
        const userData = {
            status: "failed",
            message: "username already exist",
            user: {},
            token: "",
        };
        return userData;
    }
    const encryptPassword = yield authServices.encryptPassword(user.password);
    user.password = encryptPassword;
    const data = yield dbUserRepository.addUser(user);
    const jwtatoken = yield authServices.generateToken((_a = data._id) === null || _a === void 0 ? void 0 : _a.toString());
    data.password = "";
    const userData = {
        status: "success",
        message: "User Registered",
        user: data,
        token: jwtatoken,
    };
    return userData;
});
exports.userSignUp = userSignUp;
const userLogin = (loginData, authServices, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const usernameExist = yield dbUserRepository.getUserByUserName(loginData.userName);
    console.log("user name exist...", usernameExist);
    if (usernameExist === null || usernameExist === void 0 ? void 0 : usernameExist.password) {
        const validPassword = yield bcryptjs_1.default.compare(loginData.password, usernameExist.password);
        if (validPassword) {
            if (usernameExist.isBlock) {
                const userData = {
                    status: "failed",
                    message: "user is blocked",
                    user: {},
                    token: "",
                };
                return userData;
            }
            else {
                const jwtatoken = yield authServices.generateToken((_b = usernameExist._id) === null || _b === void 0 ? void 0 : _b.toString());
                usernameExist.password = "";
                const userData = {
                    status: "success",
                    message: "login success",
                    user: usernameExist,
                    token: jwtatoken,
                };
                return userData;
            }
        }
        else {
            const userData = {
                status: "failed",
                message: "password inncorret",
                user: {},
                token: "",
            };
            return userData;
        }
    }
    else {
        const userData = {
            status: "failed",
            message: "invalid creidentials",
            user: {},
            token: "",
        };
        return userData;
    }
});
exports.userLogin = userLogin;
//add profile image
const addProfileImage = (userName, profileImage, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield dbUserRepository.profileImageRepo(userName, profileImage);
    return response;
});
exports.addProfileImage = addProfileImage;
//get profile image
const getProfileDp = (userName, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ppppppppppppppppppppppppppp", userName);
    const response = yield dbUserRepository.getProImageRepo(userName);
    return response;
});
exports.getProfileDp = getProfileDp;
//signup with google
const googlesignup = (user, authServices, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const isEmailExist = yield dbUserRepository.getUserByEmail(user.email);
        if (isEmailExist) {
            const jwtatoken = yield authServices.generateToken((_c = isEmailExist._id) === null || _c === void 0 ? void 0 : _c.toString());
            isEmailExist.password = "";
            const userData = {
                status: "success",
                message: "login success",
                user: isEmailExist,
                token: jwtatoken,
            };
            return userData;
        }
        const data = yield dbUserRepository.addUser(user);
        const jwtatoken = yield authServices.generateToken((_d = data._id) === null || _d === void 0 ? void 0 : _d.toString());
        data.password = "";
        const userData = {
            status: "success",
            message: "User Registered",
            user: data,
            token: jwtatoken,
        };
        return userData;
    }
    catch (error) {
        console.log("error in usecase..", error);
    }
});
exports.googlesignup = googlesignup;
//update profile
const profileDetails = (userName, firstName, lastName, email, phoneNumber, city, gender, bio, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield dbUserRepository.profileDetailsRepo(userName, firstName, lastName, email, phoneNumber, city, gender, bio);
        return response;
    }
    catch (error) {
        console.log("error in usecase..", error);
    }
});
exports.profileDetails = profileDetails;
//upload cover photo
const uploaCoverPic = (userName, coverPhoto, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield dbUserRepository.uploadCoverPicRepo(userName, coverPhoto);
        return response;
    }
    catch (error) {
        console.log("error in usecase..", error);
    }
});
exports.uploaCoverPic = uploaCoverPic;
//getSaved images
const getSavedImg = (userName, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield dbUserRepository.getSavedRepo(userName);
        return response;
    }
    catch (error) {
        console.log("error in usecase..", error);
    }
});
exports.getSavedImg = getSavedImg;
//follow Handler
const followHander = (user, userName, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield dbUserRepository.followHanderRepo(user, userName);
        return res;
    }
    catch (error) {
        console.log("error in usecase..", error);
    }
});
exports.followHander = followHander;
//get followers list
const getFollowersList = (user, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield dbUserRepository.followersListRepo(user);
        return res;
    }
    catch (error) {
        console.log("error in usecase..", error);
    }
});
exports.getFollowersList = getFollowersList;
//get about
const getAbout = (user, dbUserRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield dbUserRepository.getAboutRepo(user);
        return response;
    }
    catch (error) {
        console.log("error in usecase..", error);
    }
});
exports.getAbout = getAbout;
