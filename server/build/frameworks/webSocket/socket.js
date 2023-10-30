"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let activeUsers = [];
const socketConfig = (io) => {
    io.on('connection', (socket) => {
        socket.emit('me', socket.id);
        // Socket.IO connection event: This function is executed when a new client connects to the server.
        socket.on('add-new-user', (newUserName) => {
            // Event handler for "add-new-user" event: Adds a new user to the list of active users.
            if (!activeUsers.some((user) => user.userName === newUserName)) {
                activeUsers.push({ userName: newUserName, socketId: socket.id });
                console.log(`new user connected: ${newUserName}, ${socket.id}`);
            }
            io.emit('get-users', activeUsers);
        });
        socket.on('send-message', (data) => {
            const { guestUser } = data;
            console.log("data.......................", data, activeUsers);
            const user = activeUsers.find((user) => user.userName === (data === null || data === void 0 ? void 0 : data.guestUser));
            console.log(`Sending message to ${user === null || user === void 0 ? void 0 : user.socketId}`);
            if (user) {
                // io.to(user.socketId).emit('notification',data)
                io.to(user.socketId).emit('receive-message', data);
            }
        });
    });
};
exports.default = socketConfig;
