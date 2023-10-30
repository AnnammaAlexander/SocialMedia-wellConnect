import express from "express"
import adminAuthControllers from "../../../adapters/controllers/adminAuthController"
import { authServices } from "../../services/authService"
import { authServiceInterface } from "../../../application/services/authServiceInterface"
import { adminRepositoryMongoDB } from "../../database/mongoDB/repositories/adminHelperRepo"
import { adminDbRepository } from "../../../application/repositories/adminDbRepository"

const adminAuthRouter = ()=>{
    const router = express.Router()
    const controller = adminAuthControllers(
        authServiceInterface,
        authServices,
        adminDbRepository,
        adminRepositoryMongoDB
    )
    router.post('/adminSignin',controller.signInAdmin)
    return router
}

export default adminAuthRouter