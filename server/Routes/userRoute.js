const express=require("express");
const { register, login, setAvatar, getAllUsers } = require("../controllers/userController");
const userRouter=express.Router();
userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/setAvatar/:id",setAvatar)
userRouter.get("/allUsers/:id",getAllUsers)//we want all users except the current user so we send the id of the current user
module.exports={userRouter}