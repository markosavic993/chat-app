import { Room } from '../domain/types';
import { v4 as uuid } from 'uuid';
import { createRoom, findRoom } from '../client/DbClient';


export const createNewRoom = async (title: string, description: string): Promise<string> => {
  const room = {
    title,
    description,
    id: uuid(),
  };
  return await createRoom(room);
}

export const findRoomById = async(roomId: string): Promise<Room> => {
    return await findRoom(roomId);
}
