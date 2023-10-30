import expres,{Application  } from "express";
import morgan from 'morgan';
import CORS from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";

const expressConfig=(app:Application) =>{
    const corsEnable = {
        origin:"*",
        exposeHeader : ['Cross-Origin-Opener-Policy','Cross-Origin-Resourse-Policy']
    };
    //express middleware configuration
    
    app.use(CORS(corsEnable));
    app.use(morgan('dev'));
    app.use(expres.json());
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(expres.urlencoded({extended:true}))

}
export default expressConfig;

