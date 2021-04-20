import { v4 as uuid } from 'uuid';
import { StorageService } from './adapters/adapters'

export class CreateRoom {
  protected storageService: StorageService;

  constructor(storageService: StorageService) {
    this.storageService = storageService;
  }

  handle = async (title: string, description: string): Promise<string> => {
    const room = {
      title,
      description,
      id: uuid(),
    };
    return await this.storageService.createRoom(room);
  };
}
