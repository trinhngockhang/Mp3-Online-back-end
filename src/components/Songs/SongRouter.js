import { Router } from 'express';
import * as controller from './SongController';
import { throwAsNext, paginationMiddleware, authMiddleware, requireLogin } from '../../middleware';

const path = '/song';
const router = Router();

// route
// top song
router.get('/top', throwAsNext(controller.getListTopSong));
// new release
router.get('/new', throwAsNext(controller.getListNewSong));
// slide
router.get('/slide', throwAsNext(controller.getSlideSong));
// get song by album
router.get('/album/:id', authMiddleware, throwAsNext(controller.getSongByAlbum));
// get song by singer
router.get('/artist/:id', authMiddleware, throwAsNext(controller.getSongByArtist));
// get song by category
router.get('/category/:id', paginationMiddleware({
  maxSize: 30,
  defaultSize: 20,
}), throwAsNext(controller.getSongByCategory));
// get song comment
router.get('/comment/:id', authMiddleware, paginationMiddleware({
  maxSize: 30,
  defaultSize: 20,
}), throwAsNext(controller.getCommentById));
// get song liked by user
router.get('/like', authMiddleware, requireLogin, paginationMiddleware({
  maxSize: 30,
  defaultSize: 20,
}), throwAsNext(controller.getSongLikedByUser));
// get song detail
router.get('/detail/:id', authMiddleware, throwAsNext(controller.getSongDetail));
// bang xep hang
router.get('/chart', authMiddleware,
  paginationMiddleware({
    maxSize: 30,
    defaultSize: 20,
  }),
  throwAsNext(controller.getChart));
// get song
router.get('/:id', throwAsNext(controller.getMp3));
// registerSubrouter

// export
export default { path, router };
