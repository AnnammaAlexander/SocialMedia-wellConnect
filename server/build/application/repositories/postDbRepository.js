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
exports.postDbRepository = void 0;
const postDbRepository = (repository) => {
    //add new post 
    const addNewPost = (postedUser, image, descriptin) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.addPost(postedUser, image, descriptin);
    });
    //get all post
    const getpost = (userName) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getAllPostDb(userName);
    });
    //like post
    const likeRepo = (postId, userName) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.likePostHelper(postId, userName);
    });
    //unlike post
    const unlikeRepo = (postId, userName) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.unlikeHelper(postId, userName);
    });
    //delete post
    const postDelete = (postId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.deletePost(postId);
    });
    //report post
    const PostReportRepo = (selectedOption, postId, userName) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.reportPost(selectedOption, postId, userName);
    });
    //post update
    const updatePostRepo = (editDiscription, postId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.updatePostHelper(editDiscription, postId);
    });
    //add comment
    const addComment = (comment, postId, userName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.addCommentHelper(comment, postId, userName);
        }
        catch (error) {
            console.log(error);
        }
    });
    //get all comments
    const getCommentRepo = (postId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.getCommentHelper(postId);
        }
        catch (error) {
            console.log(error);
        }
    });
    //comment like
    const cmtLikeRepo = (cmtId, userName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.cmtLike(cmtId, userName);
        }
        catch (error) {
        }
    });
    //comment unlike
    const cmuUnlikeRepo = (cmtId, userName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.cmtUnlike(cmtId, userName);
        }
        catch (error) {
            console.log("error in repository", error);
        }
    });
    //save post
    const savePostRepo = (userName, postID) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.savePost(userName, postID);
        }
        catch (error) {
            console.log("error in repository", error);
        }
    });
    //unsave post
    const unsavePostRepo = (userName, postID) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.unsavePost(userName, postID);
        }
        catch (error) {
            console.log("error in repo");
        }
    });
    //delete comment
    const deleteCommentRepo = (cmtId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.deleteComment(cmtId);
        }
        catch (error) {
            console.log("error in repo");
        }
    });
    //replt comment
    const commentReplyRepo = (commentId, userName, comment) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield repository.commentReply(commentId, userName, comment);
        }
        catch (error) {
            console.log("error in repo", error);
        }
    });
    //retun all functions
    return {
        addNewPost,
        getpost,
        likeRepo,
        unlikeRepo,
        postDelete,
        PostReportRepo,
        updatePostRepo,
        addComment,
        getCommentRepo,
        cmtLikeRepo,
        cmuUnlikeRepo,
        savePostRepo,
        unsavePostRepo,
        deleteCommentRepo,
        commentReplyRepo
    };
};
exports.postDbRepository = postDbRepository;
