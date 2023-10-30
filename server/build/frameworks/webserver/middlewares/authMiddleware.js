"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = require("../../services/authService");
const userMiddleware = (req, res, next) => {
    console.log("usermiddleware");
    let token = null;
    // console.log(req.headers);
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }
    try {
        if (typeof token === "string") {
            const tokenResult = (0, authService_1.authServices)().verifyToken(token); // Use a different variable name
            // console.log('tokenresulr',tokenResult);
            if (tokenResult) {
                next();
            }
            else {
                res.status(401).json({ message: "Unauthorized" });
            }
        }
    }
    catch (error) {
        res.status(401).json({ message: "Token expired" });
    }
};
exports.default = userMiddleware;
