import { Schema, model } from "mongoose";
const messageSchema = new Schema({
  chatId: {
    type: String,
  },
  currentMessage: {
    type: String,
  },
  senderName: {
    type: String,
  },
 
},{timestamps:true});
 const Message = model("Message", messageSchema);
 export default Message;
