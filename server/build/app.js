"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const express_2 = __importDefault(require("./frameworks/webserver/express"));
const routes_1 = __importDefault(require("./frameworks/webserver/routes"));
const connection_1 = __importDefault(require("./frameworks/database/mongoDB/connection/connection"));
const server_1 = __importDefault(require("./frameworks/webserver/server"));
const socket_1 = __importDefault(require("./frameworks/webSocket/socket"));
const config_1 = __importDefault(require("./config/config"));
const cloudinary_1 = require("cloudinary");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: config_1.default.SOCKET_SERVER,
        methods: ["Get", "POST"]
    }
});
// //connect socket.io
(0, socket_1.default)(io);
(0, express_2.default)(app);
//cloudinary config
cloudinary_1.v2.config({
    cloud_name: 'wellconnect',
    api_key: '138536567916474',
    api_secret: 'jiUmsc3jRdUECBSXAM-QOdjmeE8'
});
(0, routes_1.default)(app);
//Atlas connection
(0, connection_1.default)();
(0, server_1.default)(server).startServer();
