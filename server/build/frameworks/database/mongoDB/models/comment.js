"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const post_1 = __importDefault(require("./post"));
const commentSchema = new mongoose_1.Schema({
    commentedUesr: {
        type: String,
        required: true
    },
    listed: {
        type: Boolean
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: post_1.default,
        required: true
    },
    comment: {
        type: String
    },
    liked: [],
    reply: [],
    reported: [],
}, { timestamps: true });
const Comment = (0, mongoose_1.model)("Comment", commentSchema);
exports.default = Comment;
