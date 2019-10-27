import { Router } from 'express';
import * as controller from './SearchController';
import { throwAsNext, paginationMiddleware } from '../../middleware';

const path = '/search';
const router = Router();

// route
// search song
router.get('/song', paginationMiddleware({
  maxSize: 30,
  defaultSize: 20,
}), throwAsNext(controller.searchSong));
// registerSubrouter

// export
export default { path, router };
