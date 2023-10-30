import mongoose from "mongoose";
import configKeys from '../../../../config/config';


const connectDB=async () =>{
    try {
        await mongoose.connect(configKeys.MONGO_URL).then(()=>{
            console.log('database connected succesfully');
            
        })
    } catch (error) {
       console.log(`Database connection error :${error}`);
       process.exit(1)
        
    }
}
export default connectDB