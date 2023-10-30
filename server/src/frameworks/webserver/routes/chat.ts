import express from 'express';
import chatControllers from '../../../adapters/controllers/chatControllers';
import { chatDbRepository } from '../../../application/repositories/chatDbRepository';
import { chatRepositoryMongoDB } from '../../database/mongoDB/repositories/chatHelperRepository';

  
const chatRouter = ()=>{
    const router = express.Router();
    const controllers = chatControllers(
       chatDbRepository,
       chatRepositoryMongoDB 
    );

router.post('/chatsearch',controllers.search)
router.post('/createroom',controllers.singleChatRoom)
router.post('/sendmessage',controllers.sendChatMessage)
// router.get('/getChatHistory/:userName',controllers.chatHistory)

return router;
}
export default chatRouter