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
const postAuth_1 = require("../../application/useCases/postAuth");
const postControllers = (postDbRepository, postDbService) => {
    const dbPostRepository = postDbRepository(postDbService());
    //upload new post
    const uploadPost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log("header..................",req.headers)
        // const postedUser =req.headers["x-user"] as string;
        var _a, _b;
        //  console.log("fileeeeeeeeeee",req.file?.path);
        const cloudinaryPost = (_b = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path) === null || _b === void 0 ? void 0 : _b.split("/post-")[1];
        // console.log("req.body:",req.body.description);
        const postResponse = yield (0, postAuth_1.addPost)(req.body.postedUser, cloudinaryPost, req.body.description, dbPostRepository);
        res.json(postResponse);
    }));
    //get post
    const getPost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userName = req.headers['x-user'];
        console.log("mmmmmmmmmmmmmmmmm", userName);
        const response = yield (0, postAuth_1.getAllPost)(userName, dbPostRepository);
        console.log("get all post from db .....:", response);
        res.json(response);
    }));
    //like post
    const likePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, postAuth_1.likeUseCase)(req.body.postId, req.body.userName, dbPostRepository);
        res.json({ status: true });
    }));
    //unlike post 
    const unlikePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, postAuth_1.unlikeUsecase)(req.body.postId, req.body.userName, dbPostRepository);
        res.json({ status: false });
    }));
    //delete post
    const deletePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, postAuth_1.postDelete)(req.body.postId, dbPostRepository);
        res.json({ status: true });
    }));
    //report post
    const postReport = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userName = req.headers['x-user'];
        yield (0, postAuth_1.reportPost)(req.body.selectedOption, req.body.postId, userName, dbPostRepository);
        res.json({ status: true });
    }));
    //update post
    const postUpdate = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, postAuth_1.updatePost)(req.body.editDiscription, req.body.postId, dbPostRepository);
        res.json({ status: true });
    }));
    //add comment
    const addComment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userName = req.headers['x-user'];
        const data = yield (0, postAuth_1.comment)(req.body.comment, req.body.postId, userName, dbPostRepository);
        res.json(data);
    }));
    //get comment 
    const getComments = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, postAuth_1.getAllComment)(req.params.id, dbPostRepository);
        res.json(data);
    }));
    //
    const commentLike = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("controller...", req.body.cmtId, req.body.userName);
            const response = yield (0, postAuth_1.likeSingleCmt)(req.body.cmtId, req.body.userName, dbPostRepository);
            console.log("cmmt like....", response);
            res.json({ status: true });
        }
        catch (error) {
            console.log("error in controller", error);
        }
    }));
    //comment unlike
    const cmtUnlike = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, postAuth_1.unlikeComment)(req.body.cmtId, req.body.userName, dbPostRepository);
            res.json({ status: true });
        }
        catch (error) {
            console.log("error in controller", error);
        }
    }));
    //save post
    const savepost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("req.body.userName,req.body.postID", req.body.userName, req.body.postID);
            const response = yield (0, postAuth_1.savePst)(req.body.userName, req.body.postID, dbPostRepository);
            res.json(response);
        }
        catch (error) {
            console.log("error in controller", error);
        }
    }));
    //unsavepost 
    const postUnsave = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, postAuth_1.unsavepost)(req.body.userName, req.body.postID, dbPostRepository);
            res.json(response);
        }
        catch (error) {
            console.log("error in controller ", error);
        }
    }));
    //delete comment
    const cmtDelete = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, postAuth_1.deleteComment)(req.body.cmtId, dbPostRepository);
        res.json(response);
    }));
    //comment Reply
    const replyComment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, postAuth_1.commentReply)(req.body.commentId, req.body.userName, req.body.comment, dbPostRepository);
            res.json(response);
        }
        catch (error) {
            console.log("error in controller ", error);
        }
    }));
    return {
        uploadPost,
        getPost,
        likePost,
        unlikePost,
        deletePost,
        postReport,
        postUpdate,
        addComment,
        getComments,
        commentLike,
        cmtUnlike,
        savepost,
        postUnsave,
        cmtDelete,
        replyComment
    };
};
exports.default = postControllers;
