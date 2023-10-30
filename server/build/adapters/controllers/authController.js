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
const userAuth_1 = require("../../application/useCases/userAuth");
//authentication controllers
const authControllers = (authServiceInterface, authService, userDbInterface, userDbService) => {
    const authServices = authServiceInterface(authService());
    const dbUserREpository = userDbInterface(userDbService());
    const signupUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { firstName, lastName, email, userName, password } = req.body;
        console.log(req.body);
        const user = {
            firstName,
            lastName,
            userName,
            email,
            password
        };
        const userData = yield (0, userAuth_1.userSignUp)(user, authServices, dbUserREpository);
        res.json(userData);
    }));
    const loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userName, password } = req.body;
        const loginData = {
            userName,
            password
        };
        const Data = yield (0, userAuth_1.userLogin)(loginData, authServices, dbUserREpository);
        console.log("login data response", Data);
        res.json(Data);
    }));
    //signUpWithGoogle
    const signUpWithGoogle = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("mmmmmmmmmmmmmmmmmmmmm:", req.body.user);
            const response = yield (0, userAuth_1.googlesignup)(req.body.user, authServices, dbUserREpository);
            console.log("responseeeeeeeeeeeeeee", response);
            res.json(response);
        }
        catch (error) {
            console.log("error in controller", error);
        }
    }));
    return {
        signupUser,
        loginUser,
        signUpWithGoogle
    };
};
exports.default = authControllers;
