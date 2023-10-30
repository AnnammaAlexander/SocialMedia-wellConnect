import {v2 as cloudinary }  from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage} from 'multer-storage-cloudinary';

const postImage = {
    cloudinary :cloudinary,
    params: {
        folder:'postImage',
        allowed_formats : ['jpg' ,'jpeg' , 'png' , 'svg' , 'webp' ,'gif' , 'jfif' , 'mp4' , 'mpeg' ] ,
        public_id : (req:any , file:any) =>{
            console.log('original name',file);
            
            const originalName = file.originalname.split('.')
            return `post-${Date.now()}-${originalName[0]}`
        }
    }
}
const ProfileImage = {
    cloudinary : cloudinary,
    params : {
        folder : 'profileImages' ,
        allowed_formats :['jpg' ,'jpeg' , 'png' , 'svg' , 'webp' ,'gif' , 'jfif' , 'mp4' , 'mpeg' ] ,
        public_id :(req:any,file:any) =>{
            // console.log('original name.....................',file);
            
            const originalName = file.originalname.split('.')
            return `profile-${Date.now()}-${originalName[0]}`
        }
    }
}

//upload coverimage
const coverPhoto = {
    cloudinary:cloudinary,
    params:{
        folder :'coverPhotos',
        allowed_formats :['jpg' ,'jpeg' , 'png' , 'svg' , 'webp' ,'gif' , 'jfif' , 'mp4' , 'mpeg' ] ,
        public_id :(req:any,file:any) =>{
            console.log("..............................",file);
            const originalName =file.originalname.split('.')
            return `profile-${Date.now()}-${originalName[0]}`


        }
    }
}


const profileImageStorage = new CloudinaryStorage(ProfileImage);
export const uploadProImage = multer({storage:profileImageStorage}).single('uploadProImage')

const postStorage = new CloudinaryStorage(postImage);
export const uploadPost = multer({storage:postStorage}).single('uploadPost');

const coverPhotoStorage = new CloudinaryStorage(coverPhoto);
export const uploadCoverPic = multer({storage:coverPhotoStorage}).single('uploadCover')
