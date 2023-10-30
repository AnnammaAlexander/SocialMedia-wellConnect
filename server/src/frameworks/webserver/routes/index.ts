import { Application } from "express";
import authRouter from './auth';
import postRouter from './post';
import userRouter  from './user';
import chatRouter from "./chat";
import userMiddleware from "../middlewares/authMiddleware";
import adminAuthRouter from "./adminAuth";
// import userRouter from './user';


const routes = (app:Application) =>{
    app.use('/api/auth', authRouter()),
    app.use('/api/post',userMiddleware, postRouter())
    app.use('/api/profile',userMiddleware, userRouter())
    app.use('/api/chat',userMiddleware,chatRouter())
    app.use('/api/adminauth',adminAuthRouter())

}
export default routes;