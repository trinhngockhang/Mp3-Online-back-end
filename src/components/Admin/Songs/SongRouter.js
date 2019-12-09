import { Router } from 'express';
import * as controller from './SongController';
import { throwAsNext, paginationMiddleware, authMiddleware } from '../../../middleware';

const path = '/admin';
const router = Router();

// route
// get song
router.get('/songs', authMiddleware, paginationMiddleware({
  maxSize: 30,
  defaultSize: 20,
  filterKeys: [],
  sortKeys: ['name', 'username', 'createdAt'],
}), throwAsNext(controller.getSongs));

router.get('/songs/:id', authMiddleware, throwAsNext(controller.getSongDetail));

// export
export default { path, router };
