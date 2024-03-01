const express=require("express");
const { addMessage, AllMessage } = require("../controllers/MessageController");
const messageRoute=express.Router();
messageRoute.post("/addMessage",addMessage);
messageRoute.post("/allMessage",AllMessage)
module.exports={messageRoute};