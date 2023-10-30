import dotenv from 'dotenv';
dotenv.config();


const configKeys={
    MONGO_URL : process.env.MONGODB_URL as string ,
    PORT :process.env.PORT as any ,
    JWT_SECRET : process.env.JWT_TOKEN_KEY as string ,
    CLIENT_URL : process.env.CLIENT_URL as string,
    SOCKET_SERVER:process.env.SOCKET_SERVER as string

}
export default configKeys;
