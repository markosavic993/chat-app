import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { router as IndexRouter } from './web/routes/IndexRouter';
import { router as RoomsRouter } from './web/routes/RoomsRouter';
import { handleSocketInteraction } from './web/socket/SocketHandler';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', IndexRouter);
app.use('/rooms', RoomsRouter);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});

handleSocketInteraction(io);

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
