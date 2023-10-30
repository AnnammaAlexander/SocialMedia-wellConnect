import axios from "axios";
const baseURL=axios.create({
    baseURL : "http://localhost:5000/api/"
})

baseURL.interceptors.request.use(
    (config) =>{
        
        const state = localStorage.getItem("persist:root");
        
        
        if(state){
            const userData = JSON.parse(state)
            
            
            const item = JSON.parse(userData.items)
            
            const token=item.token;
            const userName= item.userName;
             
             
             
            if(token){
                
                
                config.headers["Authorization"] = `Bearer ${token}`;
                config.headers["x-user"] = userName;
                
                
            }else{
                delete config.headers["Authorization"]
                delete config.headers["x-user"]
            }   
            
            
        }
        return config;
    },
    (error) => {
        console.log('Error in interceptor');    
        return Promise.reject(error);
      }

);
export default baseURL;