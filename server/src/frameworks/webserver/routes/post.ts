import express from 'express';
import postControllers from '../../../adapters/controllers/postController';
import {postRepositoryMongoDB} from '../../database/mongoDB/repositories/postHelperRepository';
import { postDbRepository } from '../../../application/repositories/postDbRepository';
import { uploadPost } from '../middlewares/cloudinaryConfig';
 const postRouter =()=>{
    const router =express.Router();
    const controllers = postControllers(
        postDbRepository ,
        postRepositoryMongoDB 
        
    );
    router.get('/getpost',controllers.getPost)
    router.post('/upload',uploadPost,controllers.uploadPost)
    router.post('/like',controllers.likePost)
    router.post('/unlike',controllers.unlikePost)
    router.post('/deletepost',controllers.deletePost)
    router.post('/report',controllers.postReport)
    router.post('/updatePost',controllers.postUpdate)
    router.post('/addComment',controllers.addComment)
    router.get('/getComment/:id',controllers.getComments)
    router.post('/cmtLike',controllers.commentLike)
    router.post('/cmtUnlike',controllers.cmtUnlike)
    router.post('/savepost',controllers.savepost)
    router.post('/unsavepost',controllers.postUnsave)
    router.post('/deletecmt',controllers.cmtDelete)
    router.post('/replycmt',controllers.replyComment)
return router;
};
export default postRouter;