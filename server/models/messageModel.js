const mongoose=require('mongoose');
const messageSchema=new mongoose.Schema({
    message:{
        text:{
            type:String,
            required:true,
        },
    },
    users:Array,//This property is an Array type and is intended to store information about the users involved in the conversation. It may contain multiple user IDs or other relevant data about the users.
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
    }

},
{
    timestamps:true,
})
const messageModel=mongoose.model("messages",messageSchema);
module.exports={messageModel};