import React, { useState , } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { imageUpload } from "../../../API/apiConnections/postConnections";
import { useSelector ,} from "react-redux";

import { post } from "../../../Interfaces/postInterfaces";

interface postInterface {
  data:post[] ,
  setData:(value:post[])=>void ,
  uploadPost:(value:boolean)=>void,
}

export const DialogCustomAnimation:React.FC<postInterface> =({data,setData}) =>{
  const [open, setOpen] = React.useState(true);
  const [imgUrl,setImgUrl] = useState<string | null>()
  const [file,setFile] =useState<File |null>(null)
  const [description,setDescription] =useState<string>("")
  const {userName,dp,firstName,lastName} = useSelector((store:{user:{items:{userName:string ,dp:string,firstName:string,lastName:string}}})=>store.user.items)
 
  const handleOpen = () => {
    setOpen(!open);
    // uploadPost()
  }
//add post
  function uploadPostHandle(){
    if(file){
    handlePostUpload();
    setOpen(false)
    }
  }

  
  const handlePostUpload = async()=>{
    // console.log("description:,,,,,,,,,",description);
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const response:any =  await imageUpload(file,description,userName)
   console.log("lllllllllllllllllllllllll",response);
   
   
   if(response){
    response.dp=dp
    response.firstName=firstName
    response.lastName=lastName
    setData([response,...data])
   }
    
   
  }

 
  
  function uploadfile( event :React.ChangeEvent<HTMLInputElement>){
    const file: File | null |undefined = event.target.files?.[0]
   if(file){
    // console.log("typeof file : ",typeof file);
    
    setFile(file)
    const url = URL.createObjectURL(file)
    setImgUrl(url)
   }
   
  }
  
  return (
    <>
      {/* <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button> */}
      <Dialog
        open={open}
        size="xs"
        className="flex flex-col justify-center items-center"
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Create new post</DialogHeader>
        <DialogBody divider>
        {imgUrl ?
        <div className=" w-40 h-42 mt-3  m-auto gap-2 flex flex-col items-center">
      <div className="">
        <img src={imgUrl} className="object-cover"></img>
      </div>
        <textarea className="w-96 p-1 text-black rounded resize-none overflow-y-scroll no-scrollbar focus:outline-none placeholder:text-center" placeholder="Write a caption" onChange={(event)=>setDescription(event.target.value)} value={description} ></textarea>
        </div> 
        :
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-40 h-40 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
</svg>
}
        
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>

         {imgUrl ? (
          <div>
        
             <Button variant="gradient" color="green" onClick={uploadPostHandle} >
            <span>Upload Image</span>
          </Button> 
          </div>
          ) :
        
          <label htmlFor="dropzone-file">
        <div className="bg-deep-purple-800 p-2 rounded-xl">
          UploadPost
            </div>
            <input type="file" name="uploadPost"  id="dropzone-file" className="hidden" onChange={uploadfile}></input>
          </label>
}
        </DialogFooter>
      </Dialog>
    </>
  );
}