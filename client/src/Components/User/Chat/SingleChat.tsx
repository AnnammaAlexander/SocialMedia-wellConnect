import { Avatar, MenuItem, Typography } from "@material-tailwind/react"
import { CLOUDINARY_DP_PATH } from "../../../constants/constant"
import { User } from "../../../Interfaces/userInterfaces"


interface SingleChatProps{
    handleChat:(user:User)=>void,
    user:User
}
const SingleChat:React.FC<SingleChatProps> = ({handleChat,user})=> {
   

  

  return (
    
       <MenuItem className="flex items-center gap-3" onClick={()=>handleChat(user)}>
                    <Avatar
                      variant="circular"
                      size="sm"
                      alt="tania andrew"
                      className="border border-gray-900 p-0.5"
                      src={CLOUDINARY_DP_PATH + user.dp}
                    />
                    <div className="">
                      
                        <Typography color="blue-gray" variant="h6">
                          {user.firstName}  {user.lastName? user.lastName :""}
                        </Typography>
                      
                      <Typography color="blue-gray" variant="h6">
                        message time
                      </Typography>
                    </div>
                  </MenuItem>
    
  )
}

export default SingleChat
