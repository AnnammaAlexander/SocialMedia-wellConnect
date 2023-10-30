import React from "react";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
 
  Avatar,
} from "@material-tailwind/react";
import {
  
  Cog6ToothIcon,
  
  ArrowUpIcon,
  EnvelopeOpenIcon,
} from "@heroicons/react/24/solid";
// import {
//   ChevronRightIcon,
//   ChevronDownIcon,
// } from "@heroicons/react/24/outline";
// import { Link } from "react-router-dom";

// import { LinkIcon } from "@heroicons/react/24/outline";
import {DialogCustomAnimation} from "./UploadPost";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CLOUDINARY_DP_PATH } from "../../../constants/constant";

import  ChatHome from '../Chat/ChatHome';
import { post } from "../../../Interfaces/postInterfaces";
interface postInterface {
  setData:(value:post[])=>void,
  data:post[]
}
export const SidebarWithCta:React.FC<postInterface> =({setData,data})=> {
  // const [open, setOpen] = React.useState(0);
  // const [openAlert, setOpenAlert] = React.useState(true);
  const [isUpload, setIsUpload] = useState<boolean>(false);
  // const handleOpen = (value:number) => {
  //   setOpen(open === value ? 0 : value);
  // };
  function uploadPost() {
    setIsUpload(!isUpload);
  }
  const { userName,firstName, lastName, dp } = useSelector(
    (store: {
      user: { items: { userName:string,firstName: string; lastName: string; dp: string } };
    }) => store.user.items
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
const navigate = useNavigate()
const getProfileHandle =()=>{
  navigate(`/${userName}`)
}
  return (
    <>
      <Card className="h-[calc(100vh-2rem)] w-[20rem] left-0 shadow-xl shadow-blue-gray-900/5 top-20 fixed lg:block hidden ">
        {/* <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div> */}
        <List>
              
          <ListItem>
            <div className=" flex flex-col items-center">
              <div className="">
            <ListItemPrefix>
              <Avatar
                variant="circular"
                
                alt="tania andrew"
                className="border border-gray-900 m-2  w-36 h-36 ml-9"
                src={dp ? CLOUDINARY_DP_PATH + dp  :"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"}
              />
            </ListItemPrefix>
              </div>
              <div>

            <button 
            style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Add text shadow
              fontWeight: 'bold', // Add font weight (e.g., bold)
              fontSize: '20px', // Increase font size
              color: 'black', // Change text color
              // Add underline effect
              fontStyle: 'italic', // Apply italic style
            }}
            onClick={getProfileHandle}>{firstName + " " + lastName} </button>
             </div>
             </div>
          </ListItem>
          
          <div onClick={handleOpen}>
            <ListItem>
              <ListItemPrefix>
                <EnvelopeOpenIcon className="h-6 w-6 text-gray-500" />
              </ListItemPrefix>
              Inbox
            </ListItem>
          </div>
          <div>


          <ChatHome handleOpen={handleOpen} open={open} />

            {/* <ChatHome handleOpen={handleOpen}/> */}
          
          </div>


          {/* dialog for singlr chat */}

          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <div onClick={uploadPost}>
            <ListItem>
              <ListItemPrefix>
                {/* <PowerIcon className="h-5 w-5" /> */}
                <ArrowUpIcon className="h-5 w-5" />
              </ListItemPrefix>
              Upload Post
            </ListItem>
          </div>
          {/* <div>
  <h2 style={{ color: '#9370DB', textShadow: '1px 2px royalblue', fontSize: '20px', fontWeight: 'bold' }}>
    People you may know
  </h2>
</div> */}

 
        </List>
      </Card>
      {isUpload ? <DialogCustomAnimation data={data} setData={setData} uploadPost={uploadPost} /> : null}
    
    </>
    

  );
}
