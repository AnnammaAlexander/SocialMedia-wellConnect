import { Schema,model } from "mongoose";
const chatSchema = new Schema(
{
    members:{
        type:Array,
        required:true,
        groupeName :String
    }

},{
    timestamps:true
}
)
const Chat = model("Chat",chatSchema)
export default Chat;