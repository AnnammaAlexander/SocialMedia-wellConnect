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
exports.postRepositoryMongoDB = void 0;
const mongodb_1 = require("mongodb");
const post_1 = __importDefault(require("../models/post"));
const comment_1 = __importDefault(require("../models/comment"));
const user_1 = __importDefault(require("../models/user"));
const postRepositoryMongoDB = () => {
    //add new post
    const addPost = (postedUser, image, description) => __awaiter(void 0, void 0, void 0, function* () {
        const singlePost = {
            postedUser,
            image,
            description,
            like: [],
            listed: true,
            reported: []
        };
        const newPost = new post_1.default(singlePost);
        return yield newPost.save();
    });
    //get all post
    const getAllPostDb = (userName) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield user_1.default.aggregate([
            {
                $match: {
                    userName: userName
                }
            },
            {
                $unwind: {
                    path: "$following"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "following",
                    foreignField: "userName",
                    as: "userData"
                }
            },
            {
                $unwind: {
                    path: "$userData"
                }
            },
            {
                $project: {
                    firstName: "$userData.firstName",
                    lastName: "$userData.lastName",
                    userName: "$userData.userName",
                    dp: "$userData.dp",
                }
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "userName",
                    foreignField: "postedUser",
                    as: "postData"
                }
            },
            {
                $unwind: {
                    path: "$postData",
                }
            },
            {
                $project: {
                    firstName: 1,
                    lastName: 1,
                    dp: 1,
                    image: "$postData.image",
                    description: "$postData.description",
                    like: "$postData.like",
                    listed: "$postData.listed",
                    createdAt: "$postData.createdAt",
                    postedUser: "$postData.postedUser"
                }
            },
            {
                $match: {
                    listed: true
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ]);
        if (post.length === 0) {
            return yield post_1.default.aggregate([
                {
                    $match: {
                        listed: true
                    }
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "postedUser",
                        foreignField: "userName",
                        as: "userData"
                    }
                },
                {
                    $unwind: {
                        path: "$userData"
                    }
                },
                {
                    $limit: 3
                },
                {
                    $project: {
                        postedUser: 1,
                        description: 1,
                        image: 1,
                        dp: "$userData.dp",
                        firstName: "$userData.firstName",
                        lastName: "$userData.lastName",
                        like: 1,
                        createdAt: 1,
                        reported: 1
                    }
                }
            ]);
        }
        else {
            return post;
        }
    });
    //like post
    const likePostHelper = (postId, userName) => __awaiter(void 0, void 0, void 0, function* () {
        return yield post_1.default.findOneAndUpdate({ _id: postId }, { $addToSet: { like: userName } });
    });
    //unlike post
    const unlikeHelper = (postId, userName) => __awaiter(void 0, void 0, void 0, function* () {
        return yield post_1.default.findOneAndUpdate({ _id: postId }, { $pull: { like: userName } });
    });
    //delete post
    const deletePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield post_1.default.updateOne({ _id: postId }, { $set: { listed: false } });
    });
    //report post
    const reportPost = (selectedOption, postId, userName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //  const Id =new mongoose.Types.ObjectId(postId)
            const data = {
                userName, selectedOption
            };
            return yield post_1.default.updateOne({ _id: postId }, { $addToSet: { reported: data } });
        }
        catch (error) {
            console.log(error);
        }
    });
    //post update
    const updatePostHelper = (editDiscription, postId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield post_1.default.updateOne({ _id: postId }, { description: editDiscription });
        }
        catch (error) {
            console.log(error);
        }
    });
    //add comment 
    const addCommentHelper = (comment, postId, commentedUesr) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const singleComment = {
                comment,
                postId,
                commentedUesr
            };
            const newComment = new comment_1.default(singleComment);
            return newComment.save();
            // return data
        }
        catch (error) {
            console.log(error);
        }
    });
    //get all comment
    const getCommentHelper = (postId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // const response = await Comment.find({postId:postId});
            const response = yield comment_1.default.aggregate([
                {
                    $match: { postId: new mongodb_1.ObjectId(postId) }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "commentedUesr",
                        foreignField: "userName",
                        as: "commentdata"
                    }
                },
                {
                    $unwind: { path: "$commentdata" }
                },
                {
                    $project: {
                        commentedUesr: 1,
                        postId: 1,
                        comment: 1,
                        liked: 1,
                        reply: 1,
                        createdAt: 1,
                        firstName: "$commentdata.firstName",
                        lastName: "$commentdata.lastName",
                        dp: "$commentdata.dp"
                    }
                },
                {
                    $unwind: {
                        path: "$reply"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "reply.userName",
                        foreignField: "userName",
                        as: "replyData",
                    }
                },
                {
                    $unwind: {
                        path: "$replyData"
                    }
                },
                {
                    $project: {
                        _id: 1,
                        commentedUesr: 1,
                        firstName: 1,
                        lastName: 1,
                        postId: 1,
                        dp: 1,
                        comment: 1,
                        liked: 1,
                        createdAt: 1,
                        reply: {
                            _id: 1,
                            userName: 1,
                            comment: 1,
                            createdAt: 1,
                            firstName: "$replyData.firstName",
                            lastName: "$replyData.lastName",
                            dp: "$replyData.dp",
                            time: "$replyData.createdAt",
                        }
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        commentedUesr: {
                            $first: "$commentedUesr",
                        },
                        dp: {
                            $first: "$dp",
                        },
                        firstName: {
                            $first: "$firstName",
                        },
                        lastName: {
                            $first: "$lastName",
                        },
                        liked: {
                            $first: "$liked",
                        },
                        comment: {
                            $first: "$comment",
                        },
                        createdAt: {
                            $first: "$createdAt",
                        },
                        reply: {
                            $push: "$reply",
                        },
                    }
                }
            ]);
            //  console.log("getCommentHelper..............",response);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    });
    //Like comment
    const cmtLike = (cmtId, userName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield comment_1.default.findOneAndUpdate({ _id: cmtId }, { $addToSet: { liked: userName } });
            console.log("response helper..Like...", response);
            return response;
        }
        catch (error) {
            console.log("error in helper", error);
        }
    });
    //unlike comment
    const cmtUnlike = (cmtId, userName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield comment_1.default.updateOne({ _id: cmtId }, { $pull: { liked: userName } });
            console.log("response in helper unlike...", response);
            return response;
        }
        catch (error) {
        }
    });
    //save post
    const savePost = (userName, postID) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield user_1.default.findOneAndUpdate({ userName: userName }, { $addToSet: { savedItems: postID } });
            return response;
        }
        catch (error) {
            console.log("error in helper", error);
        }
    });
    //unsave post
    const unsavePost = (userName, postID) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield user_1.default.updateOne({ userName: userName }, { $pull: { savedItems: postID } });
            console.log("response helper.unsave..", response);
            return response;
        }
        catch (error) {
            console.log("error in helper");
        }
    });
    //delete comment
    const deleteComment = (cmtId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield comment_1.default.findOneAndDelete({ _id: cmtId });
            //  console.log("helper...",response);
            return response;
        }
        catch (error) {
            console.log("error in helper");
        }
    });
    //comment reply
    const commentReply = (commentId, userName, comment) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const replyData = {
                userName,
                comment,
                _id: new mongodb_1.ObjectId()
            };
            const response = yield comment_1.default.findByIdAndUpdate({ _id: commentId }, { $push: { reply: replyData } }, { new: true });
            console.log("ggggggggggggggggg", response);
            return response;
        }
        catch (error) {
            console.log("error in helper");
        }
    });
    return {
        addPost,
        getAllPostDb,
        likePostHelper,
        unlikeHelper,
        deletePost,
        reportPost,
        updatePostHelper,
        addCommentHelper,
        getCommentHelper,
        cmtLike,
        cmtUnlike,
        savePost,
        unsavePost,
        deleteComment,
        commentReply
    };
};
exports.postRepositoryMongoDB = postRepositoryMongoDB;
