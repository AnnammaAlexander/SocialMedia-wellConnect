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
exports.commentReply = exports.deleteComment = exports.unsavepost = exports.savePst = exports.unlikeComment = exports.likeSingleCmt = exports.getAllComment = exports.comment = exports.updatePost = exports.reportPost = exports.postDelete = exports.unlikeUsecase = exports.likeUseCase = exports.getAllPost = exports.addPost = void 0;
const addPost = (postedUser, image, description, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield dbPostRepository.addNewPost(postedUser, image, description);
    // console.log("data:",data);
    if (data) {
        const responseData = {
            status: "success",
            message: "Upload post successfully",
            userData: data
        };
        return responseData;
    }
});
exports.addPost = addPost;
//get all post
const getAllPost = (userName, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield dbPostRepository.getpost(userName);
    if (data) {
        return data;
    }
});
exports.getAllPost = getAllPost;
//like post
const likeUseCase = (postId, userName, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield dbPostRepository.likeRepo(postId, userName);
    if (data) {
        return data;
    }
});
exports.likeUseCase = likeUseCase;
//unlike post
const unlikeUsecase = (postId, userName, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield dbPostRepository.unlikeRepo(postId, userName);
    console.log("unlike data:", data);
    return data;
});
exports.unlikeUsecase = unlikeUsecase;
//delete post
const postDelete = (postId, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield dbPostRepository.postDelete(postId);
    return status;
});
exports.postDelete = postDelete;
//report post
const reportPost = (selectedOption, postId, userName, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield dbPostRepository.PostReportRepo(selectedOption, postId, userName);
    return response;
});
exports.reportPost = reportPost;
const updatePost = (editDiscription, postId, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield dbPostRepository.updatePostRepo(editDiscription, postId);
    return response;
});
exports.updatePost = updatePost;
//add comment
const comment = (comment, postId, userName, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield dbPostRepository.addComment(comment, postId, userName);
    return response;
});
exports.comment = comment;
//get All comment
const getAllComment = (postId, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield dbPostRepository.getCommentRepo(postId);
        return response;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllComment = getAllComment;
//like single comment
const likeSingleCmt = (cmtId, userName, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield dbPostRepository.cmtLikeRepo(cmtId, userName);
        return response;
    }
    catch (error) {
        console.log("error in userauth", error);
    }
});
exports.likeSingleCmt = likeSingleCmt;
//unlike comment
const unlikeComment = (cmtId, userName, dbPostRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield dbPostRepository.cmuUnlikeRepo(cmtId, userName);
        return response;
    }
    catch (error) {
        console.log("error in usecase", error);
    }
});
exports.unlikeComment = unlikeComment;
//savepost
const savePst = (userName, postID, postDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield postDbRepository.savePostRepo(userName, postID);
        return response;
    }
    catch (error) {
        console.log("error in usecase..", error);
    }
});
exports.savePst = savePst;
//unsave post 
const unsavepost = (userName, postID, postDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield postDbRepository.unsavePostRepo(userName, postID);
        return response;
    }
    catch (error) {
        console.log("error in usecase", error);
    }
});
exports.unsavepost = unsavepost;
//delete comment
const deleteComment = (cmtId, postDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield postDbRepository.deleteCommentRepo(cmtId);
        return response;
    }
    catch (error) {
        console.log("error in usecase", error);
    }
});
exports.deleteComment = deleteComment;
//comment reply
const commentReply = (commentId, userName, comment, postDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield postDbRepository.commentReplyRepo(commentId, userName, comment);
        return response;
    }
    catch (error) {
        console.log("error in usecase", error);
    }
});
exports.commentReply = commentReply;
