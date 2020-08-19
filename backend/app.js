const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("MSG_TO_BACKEND", data => {
    console.log("MSG_toBakcEnd")
    socket.emit("MSG_TO_CLIENTS", data)
  })
  socket.on("disconnect", () => {
    console.log("disconected")
  });
});

/*const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};*/

server.listen(port, () => console.log(`Listening on port ${port}`));