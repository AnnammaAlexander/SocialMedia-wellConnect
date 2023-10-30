import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Carousel,
  
  
} from "@material-tailwind/react";
import { CLOUDINARY_POST_PATH } from "../../../constants/constant";
import { useRef, useState } from "react";
import { addComment, commentReply } from "../../../API/apiConnections/postConnections";
import SingleComment from "./SingleComment";
import  {sngleCmt} from '../../../Interfaces/postInterfaces';
import { useSelector } from "react-redux";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Comment(props: any) {
  const userName = useSelector(
    (store: { user: { items: { userName: string } } }) =>
      store.user.items.userName
  );
  const[cmtId,setCmtId]=useState("")
  const cmtFocus = useRef<HTMLTextAreaElement | null>(null)

  const [comment, setComment] = useState<string>("");
  const {dp,firstName,lastName} = useSelector((store:{user:{items:{dp:string,firstName:string,lastName:string}}})=>store.user.items)

  // const [displayComment,setDisplayComment] = useState<string>("")

  const handleCommentClose = () => props.setCommentOpen(false);
  //add comment
  async function submitComment(comment: string, postId: string) {
    const response = await addComment(comment, postId);
    // console.log('response............',response)
    
    response.dp=dp;
    response.firstName=firstName;
    response.lastName=lastName
    if (response) {
      setComment("")
      props.setCommentData((prev: sngleCmt[])=> [...prev,response])
      
    }

  }
  
  const getAfterDelete =(cmtId:string) =>{
    const delResult =props.commentData.filter((singleComment:sngleCmt) =>{
      return singleComment._id !==cmtId
    })
    props.setCommentData(delResult)
  }
 const replyHandler=(singleCommentId:string) =>{
      cmtFocus.current?.focus();
      setCmtId(singleCommentId);
 }
 //reply comment
async function commentReplyHandler(cmtId:string,userName:string,comment:string) {
  const response = await commentReply(cmtId,userName,comment)
  // console.log("kkkkkkkkkkkkkkkkkkkkkk",response); 

  
  
  if(response){
    setComment("")
   response.reply.dp=dp
   response.reply.firstName=firstName
   response.reply.lastName=lastName
   response.reply.comment=comment

    const replydata=props.commentData.map((data: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reply: any; _id: string; 
})=>{
      if(data._id===cmtId){
        return{

          ...data,reply:[...data.reply,response.reply]
        }

      }
       return data;
    })
  
     props.setCommentData(replydata)
    
  }
  
}
  return (
    // dialog for comment
    <Dialog
    className="custom-button-with-bg"
      open={props.commentOpen}
      handler={handleCommentClose}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="md"
      
    >
      <DialogHeader className="flex justify-between items-center ">
        <div>
          <h5>comment</h5>
        </div>
        <div>
          <button onClick={handleCommentClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </DialogHeader>

      <DialogBody divider>
        {/* <div className="grid grid-cols-2 divide-x "> */}
        <div className="flex ">
          <div>
            <Carousel className="rounded-xl">
              <img
                src={CLOUDINARY_POST_PATH + props.postData.image}
                alt="image 1"
                className="h-full w-full object-cover"
              />
              
            </Carousel>
          </div>
          <div className="flex flex-col justify-between">
            <div className="overflow-y-scroll no-scrollbar h-96">
              {props.commentData.length > 0 ? (
                props.commentData.map((singleComment: sngleCmt) => (
                  <SingleComment 
                    cmtId={cmtId}
                    singleComment={singleComment}
                    replyHandler={replyHandler}
                    getAfterDelete={getAfterDelete}
                    key={singleComment._id} chatfocus={function (): unknown {
                      throw new Error("Function not implemented.");
                    } } _id={""} createdAt={""} updatedAt={""} reported={[]} />
                ))
              ) : (
                <h1 className="p-8">No comments yet..!</h1>
              )}
            </div>
            <div className="flex ml-auto mr-auto pt-2 p-3">
              <textarea
              ref={cmtFocus}
                onChange={(event) => {
                  setComment(event?.target.value);
                }}
                value={comment}
                className="rounded resize-none overflow-y-scroll no-scrollbar placeholder:text-center placeholder:pt-4 pl-1 bg-blue-gray-50"
                placeholder="Write a comment"
              ></textarea>
              
              {comment.trim() !== ""  ? 
              <button
              onClick={() => {
                {cmtId ?
                  commentReplyHandler(cmtId,userName,comment)
                :  submitComment(comment, props.postData._id);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 m-4 "
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
              :
              <button
               disabled={true}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 m-4 "
                >
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
              }
              
            </div>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
      
      </DialogFooter>
    </Dialog>

// end comment dialog 

  );
}

export default Comment;
