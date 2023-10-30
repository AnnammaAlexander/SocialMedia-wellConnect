import { Carousel } from "@material-tailwind/react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Radio,
} from "@material-tailwind/react";
import {
  Card,
  CardHeader,
  // CardBody,
  CardFooter,
  Typography,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  // Button,
  // Tooltip,
  // IconButton,
} from "@material-tailwind/react";
import { CLOUDINARY_DP_PATH, CLOUDINARY_POST_PATH } from "../../../constants/constant";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import {
  like,
  Unlike,
  deletePost,
  reportSinglePost,
  editpostApi,
  commentList,
  savePost ,
  unSavePost
} from "../../../API/apiConnections/postConnections";
// import { post } from "../../../Interfaces/postInterfaces";

import moment from "moment";
import {  EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import Comment from "./Comment";
import { useSelector } from "react-redux";




// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PostCard(props: any) {
  const {  savedItems } = props.userData;
 
  const {userName,} = useSelector((store:{user:{items:{userName:string }}})=>store.user.items)
  
 
    
const [savedstatus,setSavedStatus] = useState<boolean>()
const savePostHandler = async(userName : string,postID :string)=>{
  if(savedstatus){
    await unSavePost(userName,postID).then(()=>{
      savedItems.splice(savedItems.indexOf(postID))
    })
  }else{
    
    await savePost(userName,postID).then(()=>{
      savedItems.push(props.postData?._id)
    })
  }
//update local storage
localStorage.setItem(`post_${postID}` ,savedstatus ? 'unsaved' : 'saved')
  setSavedStatus(!savedstatus)   
}
// Check local storage to set the saved status on component load
useEffect(() => {
  const postStatus = localStorage.getItem(`post_${props.postData?._id}`);
  if (postStatus === 'saved') {
    setSavedStatus(true);
  } else if (postStatus === 'unsaved') {
    setSavedStatus(false);
  }
}, []);



  
  const reportedStatus = props.postData?.reported?.some(
    (user: { userName: string }) => user.userName === userName
  );
  const [reportStatus, setReportStatus] = useState(reportedStatus);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const [selectedOption, setSelectedOption] = useState("False information"); // State to track the selected radio option
  //post edit
  const [edit, setEdit] = useState(false);
  const [editDiscription, setEditDiscription] = useState<string>("");
  //comment
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentData, setCommentData] = useState<[]>([]);
//get comments
  const commentHandler = async () => {
    const postId = props.postData._id;

    const response = await commentList(postId);
console.log("setCommentData",response);

    setCommentData(response);
    setCommentOpen(!commentOpen);
  };

  const editPostHandle = () => {
    setEdit(!edit);
  };
  async function updatePostHandler(editDiscription: string, postId: string) {
    try {
      // console.log("editDiscription,postId.....",editDiscription,postId);

      const response = await editpostApi(editDiscription, postId);
      if (response) {
        setEdit(!edit);
        props.postData.description = editDiscription;
      }
    } catch (error) {
      return error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRadioChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  //handle report
  async function handleOkClick(selectedOption: string, postId: string) {
    try {
      const response = await reportSinglePost(selectedOption, postId);
      if (response) {
        setReportStatus(response);
        setSelectedOption("False information");
      }
    } catch (error) {
      return error;
    }
    // Handle the selected option here
    setOpen(false);
  }

  const likeStatus = props.postData?.like?.includes(userName);
  const [liked, setLiked] = useState<boolean>(likeStatus);

  async function likeHandler(postId: string) {
    if (liked) {
      const response = await Unlike(postId, userName);
      console.log("response:", response);
    } else {
      const response = await like(postId, userName);
      console.log("response", response);
    }
    setLiked(!liked);
  }

  const handleDelete = async (postId: string) => {
    // console.log("postId",postId)

    const response = await deletePost(postId);
    if (response) {
      toast.success(`post deleted !!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      props.getAfterDelete(postId);
    }

    // You can perform any actions or navigate to another page based on the item clicked.
  };
// console.log("kkkkkkknnnnnnnmmmmmmmmmmmmmm",props.data);
// console.log("postdataaaa",props.postData);


  return (
    // <div className=" overflow-x-hidden">
    <Card
      key={props.postData._id}
      // className="lg:w-[calc(100vw-60rem)] max-h-screen shadow-lg sm:w-screen"
      className="max-h-screen max-w-[50rem] shadow-lg sm:w-screen mt-10 "
    >
      <div className=" flex justify-between">
        <div className="flex m-3">
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 m-2 "
            src={props.postData.dp? CLOUDINARY_DP_PATH + props.postData.dp :"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"}
          />
          <div>
            {/* <h3 className="mt-3">{props.postData.postedUser}</h3> */}
            <h3 className="mt-3">{props.postData?.firstName } { props.postData.lastName ? props.postData?.lastName:""}</h3>

            <h4>
              {moment(props.postData.createdAt).startOf("minute").fromNow()}
            </h4>
          </div>
        </div>

        <div className=" mr-6 mt-5">
          {/* Options menu of post */}
          <Menu placement="bottom-end">
            <MenuHandler className="ml-auto mb-auto">
              <button>
                <EllipsisHorizontalIcon className="w-8 h-8" />
              </button>
            </MenuHandler>
            <MenuList className="flex flex-col gap-1 p-1 z-0">
              {userName === props.postData.postedUser ? (
                <>
                  <MenuItem onClick={editPostHandle}>Edit</MenuItem>
                  <MenuItem
                    onClick={() => handleDelete(props.postData._id)}
                    className="text-red-900"
                  >
                    {" "}
                    Delete
                  </MenuItem>
                </>
              ) : reportStatus ? (
                <MenuItem disabled={true}> Reported </MenuItem>
              ) : (
                <MenuItem onClick={handleOpen} className="text-red-900">
                  Report
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </div>
      </div>

      {/* card items */}
      <CardHeader floated={false} color="blue-gray" className="mt-0">
        <img
          className="w-full "
          src={ CLOUDINARY_POST_PATH + props.postData.image}
          alt="ui/ux review check"
        />
        
        <Dialog
          open={open}
          handler={handleOpen}
          className="flex justify-center items-center flex-col p-4"
        >
          <DialogHeader>
            <Typography variant="h4" color="blue-gray">
              Reson for Report
            </Typography>
          </DialogHeader>
          <DialogBody divider className="grid place-items-center gap-4">
            {/* <Typography color="red" variant="h4">
            You should read this!
          </Typography>
           */}

            {/* Radio Buttons */}
            <div className=" flex flex-col">
              <Radio
                id="false"
                value="False information"
                onChange={handleRadioChange}
                name="reason"
                defaultChecked
                label={
                  <Typography
                    color="blue-gray"
                    className="flex font-medium text-lg"
                  >
                    False information
                  </Typography>
                }
              ></Radio>
              <Radio
                id="spam"
                value="It's spam"
                onChange={handleRadioChange}
                name="reason"
                label={
                  <Typography
                    color="blue-gray"
                    className="flex font-medium text-lg"
                  >
                    It's spam
                  </Typography>
                }
              ></Radio>
              <Radio
                id="scam"
                value="Scam or fraud"
                onChange={handleRadioChange}
                name="reason"
                label={
                  <Typography
                    color="blue-gray"
                    className="flex font-medium text-lg"
                  >
                    Scam or fraud
                  </Typography>
                }
              ></Radio>
              <Radio
                id="sexual"
                value="Nudity or sexual activity"
                onChange={handleRadioChange}
                name="reason"
                label={
                  <Typography
                    color="blue-gray"
                    className="flex font-medium text-lg"
                  >
                    Nudity or sexual activity
                  </Typography>
                }
              ></Radio>
              <Radio
                id="hateSpeech"
                value="Hate speech or Symbol"
                onChange={handleRadioChange}
                name="reason"
                label={
                  <Typography
                    color="blue-gray"
                    className="flex font-medium text-lg"
                  >
                    Hate speech or Symbol
                  </Typography>
                }
              ></Radio>
              <Radio
                id="bullying"
                value="Bullying or Harassment"
                onChange={handleRadioChange}
                name="reason"
                label={
                  <Typography
                    color="blue-gray"
                    className="flex font-medium text-lg"
                  >
                    Bullying or Harassment
                  </Typography>
                }
              ></Radio>
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button variant="text" color="blue-gray" onClick={handleOpen}>
              Close
            </Button>
            <Button
              variant="gradient"
              color="red"
              onClick={() => {
                handleOkClick(selectedOption, props.postData._id);
              }}
            >
              Submit
            </Button>
          </DialogFooter>
        </Dialog>
        
        <Dialog
          open={edit}
          handler={editPostHandle}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader className="flex flex-col justify-center mt-2">
            Edit Post
          </DialogHeader>
          <DialogBody divider>
            <div className="grid grid-cols-2 divide-x">
              <div>
                <Carousel className="rounded-xl">
                  <img
                    src={CLOUDINARY_POST_PATH + props.postData.image}
                    alt="image 1"
                    className="h-full w-full object-cover"
                  />
                  {/* <img
        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        alt="image 2"
        className="h-full w-full object-cover"
      /> */}
                  {/* <img
        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
        alt="image 3"
        className="h-full w-full object-cover"
      /> */}
                </Carousel>
              </div>
              <div>
                <textarea
                  className=" p-3  text-black rounded resize-none overflow-y-scroll no-scrollbar focus:outline-none placeholder:text-center"
                  placeholder="Write a caption"
                  onChange={(event) => {
                    setEditDiscription(event.target.value);
                  }}
                  value={editDiscription}
                ></textarea>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={editPostHandle}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={() => {
                updatePostHandler(editDiscription, props.postData._id);
              }}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </CardHeader>

      <CardFooter className="pt-4">
        {" "}
        <div className="flex justify-between">
        <div className="flex gap-4">
          <button
            onClick={() => {
              likeHandler(props.postData._id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={liked ? "red" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 "
              aria-label="Like"
            >
              <title>Like</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
          <Comment
            setCommentOpen={setCommentOpen}
            commentOpen={commentOpen}
            postData={props.postData}
            commentData={commentData}
            setCommentData = {setCommentData}
          />
          <button onClick={commentHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <title>comment</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
          </button>
        </div>


        <div>
          <button 
                  onClick={()=>{savePostHandler(userName,props.postData._id)}}

          >
        {savedstatus ?
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
          </svg>
          :

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
          </svg>
        }


          </button>
        
        </div>

      </div>
        {props.postData.description && (
          <Typography
            variant="h5"
            color="blue-gray"
            className="font-medium text-start "
          >
            {props.postData.description}
          </Typography>
        )}
      </CardFooter>
    </Card>
    // </div>
  );
}

export default PostCard;
