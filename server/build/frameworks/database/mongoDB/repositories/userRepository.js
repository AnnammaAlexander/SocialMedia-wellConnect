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
exports.userRepositoryMongoDB = void 0;
const user_1 = __importDefault(require("../models/user"));
const userRepositoryMongoDB = () => {
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = new user_1.default(user);
        return yield newUser.save();
    });
    const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.default.findOne({ email });
    });
    const getUserByUserName = (userName) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.default.findOne({ userName });
    });
    //add profile picture
    const addProfileImage = (userName, profileImage) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("userName,profileImage", userName, profileImage);
        const response = yield user_1.default.updateOne({ userName: userName }, { $set: { dp: profileImage } });
        return response;
    });
    //get profile image
    const getProfileImage = (userName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield user_1.default.findOne({ userName });
            console.log("tttttttttttttttttttttttttt", response);
            return response;
        }
        catch (error) {
            console.log("error in userHelper", error);
        }
    });
    //save edit profile
    const saveProfileDetails = (userName, firstName, lastName, email, phoneNumber, city, gender, bio) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield user_1.default.findOneAndUpdate({ userName: userName }, { $set: { firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber,
                    city: city,
                    gender: gender,
                    bio: bio,
                }
            });
            // console.log("response........................",response);
            return response;
        }
        catch (error) {
            console.log("error in userHelper", error);
        }
    });
    //update cover photo
    const updateCoverPic = (userName, coverPhoto) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield user_1.default.findOneAndUpdate({ userName: userName }, { $set: { coverImag: coverPhoto } });
            return response;
        }
        catch (error) {
            console.log("error in userHelper", error);
        }
    });
    //get saved images
    const getSaved = (userName) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield user_1.default.aggregate([
            {
                $match: {
                    userName: userName
                }
            },
            {
                $unwind: {
                    path: "$savedItems"
                }
            },
            {
                $addFields: {
                    objectId: {
                        $toObjectId: "$savedItems"
                    }
                }
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "objectId",
                    foreignField: "_id",
                    as: "postdata"
                }
            },
            {
                $unwind: {
                    path: "$postdata"
                }
            },
            {
                $match: {
                    "postdata.listed": true
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "postdata.postedUser",
                    foreignField: "userName",
                    as: "postedUserData"
                }
            },
            {
                $unwind: {
                    path: "$postedUserData",
                }
            }, {
                $project: {
                    "postdata.image": 1,
                    "postdata.description": 1,
                    "postdata.like": 1,
                    "postdata.listed": 1,
                    "postdata.createdAt": 1,
                    "postdata.updatedAt": 1,
                    "postedUserData.firstName": 1,
                    "postedUserData.lastName": 1,
                    "postedUserData.userName": 1,
                    "postedUserData.dp": 1
                }
            }
        ]);
        return response;
    });
    //follow handler
    const followHander = (user, userName) => __awaiter(void 0, void 0, void 0, function* () {
        const session = yield user_1.default.startSession();
        session.startTransaction();
        try {
            const followStatus = yield user_1.default.findOne({ userName: userName, following: { $elemMatch: { $eq: user } } });
            const operation = []; // Specify the type of the operation array
            if (followStatus === null) {
                operation.push(user_1.default.updateOne({ userName }, { $addToSet: { following: user } }), user_1.default.updateOne({ userName: user }, { $addToSet: { followers: userName } }));
            }
            else {
                operation.push(user_1.default.updateOne({ userName: userName }, { $pull: { following: user } }), user_1.default.updateOne({ userName: user }, { $pull: { followers: userName } }));
            }
            const result = yield Promise.allSettled(operation);
            const isSuccess = result.every((result) => result.status === 'fulfilled');
            if (isSuccess) {
                yield session.commitTransaction();
                yield session.endSession();
                return true;
            }
            else {
                yield session.abortTransaction();
                yield session.endSession();
                return false;
            }
        }
        catch (error) {
            console.log("errorn in heper", error);
        }
    });
    //get followList
    const followersList = (user) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user_1.default.aggregate([
            {
                $match: {
                    userName: user
                }
            },
            {
                $unwind: {
                    path: "$followers"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "followers",
                    foreignField: "userName",
                    as: "userData"
                }
            },
            {
                $unwind: {
                    path: "$userData",
                }
            },
            {
                $project: {
                    firstName: "$userData.firstName",
                    lastName: "$userData.lastName",
                    dp: "$userData.dp",
                    id: "$userData._id",
                    following: "$userData.following"
                }
            }
        ]);
        console.log("ddddddddddddd", res);
        return res;
    });
    //get about
    const getAbout = (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield user_1.default.findOne({ userName: user });
            return response;
        }
        catch (error) {
            console.log("errorn in heper", error);
        }
    });
    // //get post 
    // const getPosts =async(user:string)=>{
    //     try {
    //     const res = await Post.find({postedUser:user})
    //     return res;
    //     } catch (error) {
    //         console.log("errorn in heper",error);
    //     }    
    // }
    return {
        addUser,
        getUserByEmail,
        getUserByUserName,
        addProfileImage,
        getProfileImage,
        saveProfileDetails,
        updateCoverPic,
        getSaved,
        followHander,
        followersList,
        getAbout
    };
};
exports.userRepositoryMongoDB = userRepositoryMongoDB;
