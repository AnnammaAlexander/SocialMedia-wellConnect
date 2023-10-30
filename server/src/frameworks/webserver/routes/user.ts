import express from 'express'
import userControllers from '../../../adapters/controllers/userController';
import { userDbRepository } from '../../../application/repositories/userDbRepositories';
import { userRepositoryMongoDB } from '../../database/mongoDB/repositories/userRepository';
import { uploadCoverPic, uploadProImage } from '../middlewares/cloudinaryConfig';

const userRouter = ()=>{
    const router = express.Router();
    const controllers = userControllers(
        userDbRepository,
        userRepositoryMongoDB
    );
    router.post('/uploadProfile',uploadProImage,controllers.uploadProfileImage)
    router.get('/getdp/:user',controllers.getImage)
    router.post('/updateProfile',controllers.updateProfile)
    router.post('/uploadCoverpic',uploadCoverPic,controllers.uploadCoverPic)
    router.get('/getsaved',controllers.getSavedImages)
    router.post('/follow',controllers.followPeople)
    router.get('/follow/:user',controllers.getFollowers)
    router.get('/about/:user',controllers.getAboutController)
    return router;
};
export default userRouter