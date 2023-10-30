import {
  Avatar,
  Dialog,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { SetStateAction, useEffect, useRef, useState } from "react";
import {
  chatSearch,
  createChatRoom,
  sendMessage,
} from "../../../API/apiConnections/chatConnection";

import SingleChat from "./SingleChat";
import { User } from "../../../Interfaces/userInterfaces";
import { CLOUDINARY_DP_PATH } from "../../../constants/constant";
import { Socket, io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setOnlineUsers } from "../../../redux/Slices/chatSlice";

interface chatInterface {
  chatId: string;
  currentMessage: string;
  senderName?: string;
  _id: string;
  createdAt: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ChatHome(props: any) {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [chatMsg, setChatMsg] = useState({});
  const [chats, setChats] = useState<chatInterface[]>([]);

  //chat

  const socket = useRef<Socket | null>(null);
  const userName = useSelector(
    (store: { user: { items: { userName: string } } }) =>
      store.user.items.userName
  );
  const dispatch = useDispatch();
  //connection start
  useEffect(() => {
    socket.current = io("http://localhost:5000/", {
      transports: ["websocket"],
    });
    socket.current.on("connect",()=>{
console.log("connection start");

    })
    if (userName.length) {
      socket.current.emit("add-new-user", userName);
      socket.current.on("get-users", (onlineUsers) => {
        // console.log("onlineUsers",onlineUsers);

        dispatch(setOnlineUsers(onlineUsers));
      });
    }
  }, [dispatch, userName]);
  //msg send
  useEffect(() => {
    socket.current?.emit("send-message",  chatMsg );
    // console.log("chatMsgggggggggg:",chatMsg);
  }, [chatMsg]);
  //Receive msg
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recevieMsgHandler = (data:any) => {
      console.log("dataahhhhhhhhhhhhhhhhhhhhhhhhhh",data);
      //if gust user and username same
      // if(userName === data.guestUser){
        setChats((prev) => [...prev, data]);
        

      // }
    };
    socket.current?.on("receive-message",recevieMsgHandler)
  }, [])

  console.log("ddd", chats);

  const [query, setQuery] = useState("");
  const [searchResult, setSearchResults] = useState([]);
  const chatFocus = useRef<HTMLTextAreaElement | null>(null);
  const handleSearch = async (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setQuery(e.target.value);

    const response = await chatSearch(e.target.value as string);
    setSearchResults(response);
    // console.log("response search", response);
  };
  useEffect(() => {
    // Focus on the Textarea when the component mounts
    if (chatFocus.current) {
      chatFocus.current.focus();
    }
  }, []);

  const [guestUser, setGuestUser] = useState("");

  const [fName, setFName] = useState<string>("");
  const [Lname, setLName] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string>("");
  const handleChat = async (user: User) => {
    chatFocus.current?.focus();
    setFName(user?.firstName);
    setLName(user?.lastName);
    setProfilePic(user?.dp);
    setGuestUser(user?.userName);
    const chatData = await createChatRoom(user?.userName);
    console.log("chatData...........mmmmm", chatData);

    if (chatData) {
      setChats(chatData);
    }
  };
  //send msg api
  const handleSendMessage = async () => {
    console.log("chats000000", chats);

    const response = await sendMessage(chats[0]?.chatId, currentMessage);
    console.log("eeeeeeeeeeeeeeeeeeee", response);

    if (response) {
      setChats((prev) => [...prev, response]);
      setChatMsg({
        chatId: chats[0]?.chatId,
        guestUser,
        currentMessage,
        _id: response._id,
      });
      setCurrentMessage("");
      chatFocus.current?.focus();
    }
  };
  return (
    <Dialog
      size="lg"
      open={props.open}
      handler={props.handleOpen}

      //  style={{"height":"86vh","overflowY":"hidden"}}
    >
      {/* <div className=" "> */}
      <DialogHeader className="justify-between">
        <Typography variant="h4" color="blue-gray">
          Chat
        </Typography>
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={props.handleOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </DialogHeader>

      <div className="flex  ">
        <div className="bg-blue-gray-500 w-1/2 rounded-md">
          <div className=" p-2">
            <input
              type="search"
              value={query}
              onChange={handleSearch}
              placeholder="Search"
              className="h-14 placeholder:text-black bg-blue-gray-100 placeholder:p-2 rounded-3xl w-full cursor-padding-2"
            ></input>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-semibold opacity-70 p-1 ml-2"
          >
            Recent Chat
          </Typography>

          <div id="chatdiv" className="h-96 overflow-x-scroll ">
            {searchResult.length ? (
              searchResult.map((user: User) => (
                <SingleChat handleChat={handleChat} user={user} />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className=" w-1/2 flex flex-col rounded-lg">
          <div className="h-full">
            {fName ? (
              <div className="bg-deep-orange-500 h-20 flex gap-3 rounded-md">
                <div className="p-3 ml-2">
                  <Avatar
                    variant="circular"
                    size="lg"
                    alt="tania andrew"
                    className="border border-gray-900 p-0.5"
                    src={
                      profilePic
                        ? CLOUDINARY_DP_PATH + profilePic
                        : "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                    }
                  />
                </div>
                <div className="m-auto ml-0 ">
                  <Typography variant="h5" color="blue-gray">
                    {fName} {Lname ? Lname : ""}
                  </Typography>
                </div>
              </div>
            ) : (
              <div className="h-20"></div>
            )}

            <div className="flex flex-col overflow-y-scroll h-96 ref={chatMessagesRef}">
              {chats.length ? (
                chats.map((singleChatMsg) =>
                  singleChatMsg.senderName === userName ? (
                    <div
                      key={singleChatMsg._id}
                      className="self-end mr-2"
                    >
                      {/* Content to display when senderName matches userName */}
                      <p className="bg-white p-2 rounded-lg">
                        {singleChatMsg.currentMessage}
                      </p>
                    </div>
                  ) : (
                    <div key={singleChatMsg._id} className="self-start">
                      {/* Content to display when senderName doesn't match userName */}
                      <p className="p-3">{singleChatMsg.currentMessage}</p>
                    </div>
                  )
                )
              ) : (
                <p>No chat messages available</p>
              )}
            </div>
          </div>

          {/* <div className=""> */}
          <div className="flex w-full items-center gap-2 rounded-[99px] border border-gray-900/20 bg-gray-900/5">
            <div className="flex">
              <IconButton variant="text" className="rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </IconButton>
              <IconButton variant="text" className="rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                  />
                </svg>
              </IconButton>
            </div>
            <div className="flex mb-1">
              <textarea
                ref={chatFocus}
                className="no-resize rounded border-none max-w-screen-lg  placeholder:text-black placeholder:p-2  text-black focus:outline-none "
                style={{ marginRight: "-3px", cursor: "pointer" }} // Add margin-left and cursor style
                // rows={1}
                // Set the resize prop to "none"
                placeholder="Your Message"
                onChange={(event) => setCurrentMessage(event.target.value)}
                value={currentMessage}
              />

              <IconButton
                variant="text"
                className="rounded-full "
                onClick={handleSendMessage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="red"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5 mt-2 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </Dialog>
  );
}

export default ChatHome;
