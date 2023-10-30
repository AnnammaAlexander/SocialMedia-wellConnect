import express from 'express';
import authControllers from '../../../adapters/controllers/authController';
import { authServiceInterface } from '../../../application/services/authServiceInterface';
import { authServices } from '../../services/authService';
import { userDbRepository } from '../../../application/repositories/userDbRepositories';
import { userRepositoryMongoDB } from '../../database/mongoDB/repositories/userRepository';


 const authRouter =()=>{
    const router=express.Router();
    const controllers = authControllers(
        authServiceInterface,
        authServices,
        userDbRepository,
        userRepositoryMongoDB,
    );
        router.post('/register',controllers.signupUser);
        router.post('/login',controllers.loginUser)
        router.post('/googlesignup',controllers.signUpWithGoogle)

    return router;

};
 export default authRouter;