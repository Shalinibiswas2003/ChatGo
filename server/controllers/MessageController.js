const { errorHandler } = require("../handler/errorHandler");
const { messageModel } = require("../models/messageModel");
const {mongoose}=require('mongoose');


module.exports.addMessage=async(req,res,next)=>{
    try{
        const{to,from,message}=req.body;
        const{data}=await messageModel.create({
            message:{text:message},
            users:[from,to],
            sender:from,
        });
        res.status(200).json({
            status: true,
            message: 'message added successfully',
            
          });

    }catch(e)
    {
        next(e);
    }
}
module.exports.AllMessage=async(req,res,next)=>
{
    const {from,to}=req.body;
    const messages=await messageModel.find({
        users:{
            $all:[from,to]
        }
    }).sort({updateAt:1});
    const projectedMessage=messages.map((msg)=>{
        return{
            fromSelf:msg.sender.toString()===from,
            message:msg.message.text
        }
    
    })
    res.json(projectedMessage);

}