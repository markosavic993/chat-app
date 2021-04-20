import { StorageService } from '../domain/usecases/adapters/adapters';
import { Room } from '../domain/types';

const rooms: Room[] = [];

export class DbService implements StorageService{

  async createRoom(room: Room): Promise<string> {
    rooms.push(room);
    return room.id;
  }

  async findRoom(roomId: string): Promise<Room> {
    return rooms.find(room => room.id === roomId);
  }
}
