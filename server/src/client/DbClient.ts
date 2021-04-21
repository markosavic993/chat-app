import { Room } from '../domain/types';

const rooms: Room[] = [];

export const createRoom = async (room: Room): Promise<string> => {
  rooms.push(room);
  return room.id;
}

export const findRoom = async (roomId: string): Promise<Room> => {
  return rooms.find(room => room.id === roomId);
}
