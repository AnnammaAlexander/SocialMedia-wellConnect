// import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
// import { Avatar, List, ListItem } from "@material-tailwind/react";
import { useState } from "react";

// import { Avatar, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
// import { useSelector } from "react-redux";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
import {

  Card,
  List,
  ListItem,
} from "@material-tailwind/react";

import { commentLike ,commentUnlike ,cmtdelete,} from "../../../API/apiConnections/postConnections";
import { useSelector } from "react-redux";
import { Avatar, } from "@material-tailwind/react";
import {cmtReply, sngleCmt} from '../../../Interfaces/postInterfaces';
import { CLOUDINARY_DP_PATH } from "../../../constants/constant";
import CommentReply from "./CommentReply";

import moment from "moment";

function SingleComment(props: sngleCmt) {
   console.log("........sngleCmt.....",props.singleComment);
  
  // const userName = useSelector((store:{user:{items:{userName:string}}}) =>store.user.items.userName)
  const [open, setOpen] = useState(false);

  const userName = useSelector(
    (store: { user: { items: { userName: string } } }) =>
      store.user.items.userName
  );
  const cmtLikestatus = props.singleComment.liked.includes(userName)
  const [likeStatus, setLikeStatus] = useState<boolean>(cmtLikestatus);
  // const [deleteCmt,setDeleteCmt]= useState<boolean>(false)
  // const deleteCmtHandler =()=>{
  //   setDeleteCmt(!deleteCmt)
  // }
async function deleteComment(cmtId:string){
  const response = await cmtdelete(cmtId)
  
  if(response){
    props.getAfterDelete(cmtId)
  }
  setOpen(!open)
}
  const handleOpen = () => setOpen(!open);
  

  //comment like
  async function commentLikeHandler(cmtId: string, userName: string) {
    if(likeStatus){
      const cmtUnlike = await commentUnlike(cmtId, userName)
      console.log(cmtUnlike);
      
    }else{
      const cmtLike = await commentLike(cmtId, userName);
     console.log("like...",cmtLike);
        
    }
  
    setLikeStatus(!likeStatus)
  }

 

  return (
    <div className="flex justify-between">
      <div className="flex flex-col">
      <div className="ms-2 flex">
        <div className="w-10">
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 m-2 "
            src={CLOUDINARY_DP_PATH +props.singleComment.dp}
          />
        </div>

        <div>
          <div className="w-60">
            <p className="p-2">{props.singleComment.firstName} {props.singleComment.lastName}</p>
            <p className="break-words">{props.singleComment.comment}</p>
          </div>

          <div className="flex gap-4">
             
            <button
            onClick={() => {
              commentLikeHandler(props.singleComment._id, userName)}}
            >
              {likeStatus ? 

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
<path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
</svg>


              :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
              </svg>
      
             
              }
           
           
            </button>
            
           
            <button onClick={()=>props.replyHandler(props.singleComment._id)}>Reply</button>
            <p className="">
            <p>{moment(props.singleComment.createdAt).format('HH:mm')}</p>
            </p>          
          </div>
        </div>
      </div>
      <div className=" ml-16">
              {props.singleComment.reply?.length  >0?(
                props.singleComment.reply.map((singleReply:cmtReply)=>(

                  <CommentReply 
                  key={singleReply._id}
                  singleReply={singleReply}
                   />
                ))
              )

              :
              <></>}
       </div>
       </div>
      <div className="group">
        <div className="relative ">
          
            <button onClick={handleOpen} >
            <EllipsisVerticalIcon className="h-6 w-6 text-gray-500" />
          </button>
        {open && (

        <Card className="w-28 ">
      <List>
        <div className="flex items-end">
          <button onClick={handleOpen}>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4" >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"/>
            </svg>
            </button> 
            </div>  
  {props.singleComment.commentedUesr === userName ?

    <div className="">
      <ListItem><button onClick={()=>deleteComment(props.singleComment._id)}>Delete</button></ListItem>
       {/* <ListItem><button>Edit</button></ListItem>  */}

        </div>
        :
        
        <ListItem>Report</ListItem>
  }
      </List>
    </Card>
        )}
        
      
        </div>
      </div>
    </div>
  );
}

export default SingleComment;
