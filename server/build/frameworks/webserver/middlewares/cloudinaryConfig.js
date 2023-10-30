"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCoverPic = exports.uploadPost = exports.uploadProImage = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const postImage = {
    cloudinary: cloudinary_1.v2,
    params: {
        folder: 'postImage',
        allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif', 'jfif', 'mp4', 'mpeg'],
        public_id: (req, file) => {
            console.log('original name', file);
            const originalName = file.originalname.split('.');
            return `post-${Date.now()}-${originalName[0]}`;
        }
    }
};
const ProfileImage = {
    cloudinary: cloudinary_1.v2,
    params: {
        folder: 'profileImages',
        allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif', 'jfif', 'mp4', 'mpeg'],
        public_id: (req, file) => {
            // console.log('original name.....................',file);
            const originalName = file.originalname.split('.');
            return `profile-${Date.now()}-${originalName[0]}`;
        }
    }
};
//upload coverimage
const coverPhoto = {
    cloudinary: cloudinary_1.v2,
    params: {
        folder: 'coverPhotos',
        allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif', 'jfif', 'mp4', 'mpeg'],
        public_id: (req, file) => {
            console.log("..............................", file);
            const originalName = file.originalname.split('.');
            return `profile-${Date.now()}-${originalName[0]}`;
        }
    }
};
const profileImageStorage = new multer_storage_cloudinary_1.CloudinaryStorage(ProfileImage);
exports.uploadProImage = (0, multer_1.default)({ storage: profileImageStorage }).single('uploadProImage');
const postStorage = new multer_storage_cloudinary_1.CloudinaryStorage(postImage);
exports.uploadPost = (0, multer_1.default)({ storage: postStorage }).single('uploadPost');
const coverPhotoStorage = new multer_storage_cloudinary_1.CloudinaryStorage(coverPhoto);
exports.uploadCoverPic = (0, multer_1.default)({ storage: coverPhotoStorage }).single('uploadCover');
