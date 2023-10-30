

import express,{Request, Response, Application ,NextFunction} from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import expressConfig from './frameworks/webserver/express';
import routes from './frameworks/webserver/routes';
import connectDB from './frameworks/database/mongoDB/connection/connection';
import serverConfig from './frameworks/webserver/server';
import socketConfig from './frameworks/webSocket/socket';
import configKeys from './config/config';
import {v2 as cloudinary} from 'cloudinary';

const app: Application = express();
const server = http.createServer(app);

const io=new Server(server ,{
    cors:{
        origin : configKeys.SOCKET_SERVER ,
        methods:["Get" ,"POST"]
    }
})

// //connect socket.io
 socketConfig(io);

expressConfig(app);
//cloudinary config
cloudinary.config({
    cloud_name : 'wellconnect'  ,
    api_key : '138536567916474',
    api_secret :'jiUmsc3jRdUECBSXAM-QOdjmeE8'
})

routes(app)
//Atlas connection
connectDB();


serverConfig(server).startServer()

