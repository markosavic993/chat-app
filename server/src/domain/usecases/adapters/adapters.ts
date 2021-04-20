import { Room } from '../../types';

export interface StorageService {
  createRoom(room: Room): Promise<string>;
  findRoom(roomId: string): Promise<Room>
}
