import express from 'express';
import { createNewRoom, findRoomById } from '../../services/ChatRoomService';

export const router = express.Router();

router.post('/', (async (req, res) => {
  const { title, description } = req.body;
  const roomId = await createNewRoom(title, description)
  res.send({ id: roomId });
}));

router.get('/:id', (async (req, res) => {
  const { id } = req.params;
  const foundRoom = await findRoomById(id);
  if (!foundRoom) {
    res.status(404).send('Not found!');
  }

  res.send(foundRoom);
}));
