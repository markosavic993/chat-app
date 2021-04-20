import express from 'express';
import http from 'http';
import { Server, Socket } from "socket.io";

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket: Socket) => {

  console.log('User joined');
  // Join a conversation
  console.log(socket.handshake);
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log('disconnect');
    socket.leave(roomId as string);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
