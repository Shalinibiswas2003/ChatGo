const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
require("express-async-errors");
const { userRouter } = require("./Routes/userRoute");
const { messageRoute } = require("./Routes/messageRoute");
const { errorHandler } = require("./handler/errorHandler");

const app = express();
const http = require("http"); // Import http module
const socketIO = require("socket.io"); // Import socket.io

app.use(cors());
app.use(express.json());

const { userModel } = require("./models/userModel");
const { messageModel } = require("./models/messageModel");

// Routes
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRoute);

app.use(errorHandler);

mongoose.connect(process.env.mongo_connection, {
  writeConcern: { w: "majority", wtimeout: 0, provenance: "clientSupplied" },
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.error("Connection failed", error);
});

const server = http.createServer(app); // Create HTTP server
const io = socketIO(server, { // Initialize socket.io with server instance
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server started successfully on port ${PORT}`);
});
