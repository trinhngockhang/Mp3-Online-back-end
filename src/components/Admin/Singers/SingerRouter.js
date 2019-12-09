import { Router } from 'express';
import * as controller from './SingerController';
import { throwAsNext, paginationMiddleware, authMiddleware } from '../../../middleware';

const path = '/admin';
const router = Router();

// route
// get song
router.get('/singers', authMiddleware, paginationMiddleware({
  maxSize: 30,
  defaultSize: 20,
  filterKeys: [],
  sortKeys: ['name', 'createdAt'],
}), throwAsNext(controller.getSinger));
// get detail
router.get('/singers/:id', authMiddleware, throwAsNext(controller.getDetailSinger));
// registerSubrouter

// export
export default { path, router };
