import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { createNewRoom, findRoomById } from './services/ChatRoomService';

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});

const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';

io.on('connection', (socket: Socket) => {

  console.log('User joined');
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on('disconnect', () => {
    console.log('disconnect');
    socket.leave(roomId as string);
  });
});

app.post('/rooms', (async (req, res) => {
  const { title, description } = req.body;
  const roomId = await createNewRoom(title, description)
  res.send({ id: roomId });
}));

app.get('/rooms/:id', (async (req, res) => {
  const { id } = req.params;
  const foundRoom = await findRoomById(id);
  if (!foundRoom) {
    res.status(404).send('Not found!');
  }

  res.send(foundRoom);
}));

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
