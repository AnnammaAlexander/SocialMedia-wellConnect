import { Server ,Socket} from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface User{
    userName:string,
    socketId:string
}
let activeUsers:User[] = []
const socketConfig = (
    io:Server<DefaultEventsMap>
)=>{

    io.on('connection',(socket)=>{

        socket.emit('me',socket.id)
        // Socket.IO connection event: This function is executed when a new client connects to the server.
        socket.on('add-new-user',(newUserName:string)=>{
            // Event handler for "add-new-user" event: Adds a new user to the list of active users.
            if(!activeUsers.some((user)=>user.userName===newUserName)){
                activeUsers.push({userName:newUserName,socketId:socket.id})
                console.log(`new user connected: ${newUserName}, ${socket.id}`)
            }
            io.emit('get-users',activeUsers)
        }) 
        socket.on('send-message',(data)=>{
            const {guestUser} = data
            console.log("data.......................",data,activeUsers);
            
            const user = activeUsers.find((user)=>user.userName===data?.guestUser)
            console.log(`Sending message to ${user?.socketId}`)
            if(user){
                // io.to(user.socketId).emit('notification',data)
                io.to(user.socketId).emit('receive-message',data)   
            }
        })
    })
}
 export default socketConfig
    