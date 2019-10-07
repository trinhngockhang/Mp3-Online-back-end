import { Router } from 'express';
import * as controller from './SongController';
import { throwAsNext } from '../../middleware';

const path = '/song';
const router = Router();

// route
// top song
router.get('/top', throwAsNext(controller.getListTopSong));
// new release
router.get('/new', throwAsNext(controller.getListNewSong));
// slide
router.get('/slide', throwAsNext(controller.getSlideSong));
// get song
router.get('/:id', throwAsNext(controller.getMp3));
// registerSubrouter

// export
export default { path, router };
