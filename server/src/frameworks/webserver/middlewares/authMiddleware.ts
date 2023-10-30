import { Request,Response,NextFunction } from "express";
import { authServices } from "../../services/authService";



const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("usermiddleware");
    
    let token: string | null = null;
    // console.log(req.headers);
    
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];

        

    }
    try {
        if (typeof token === "string") {
            const tokenResult = authServices().verifyToken(token); // Use a different variable name
            // console.log('tokenresulr',tokenResult);
            
            if (tokenResult) {
                
                next();
            } else {
                res.status(401).json({ message: "Unauthorized" });
            }
        }
    } catch (error) {
        res.status(401).json({ message: "Token expired" });
    }
};
export default userMiddleware;
