import { Server, Socket } from 'socket.io';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';

export const handleSocketInteraction = (io: Server) => {
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
};
