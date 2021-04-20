import { StorageService } from './adapters/adapters'
import { Room } from '../types';

export class FindRoomById {
  protected storageService: StorageService;

  constructor(storageService: StorageService) {
    this.storageService = storageService;
  }

  handle = async (roomId: string): Promise<Room> => {
    return await this.storageService.findRoom(roomId);
  };
}
