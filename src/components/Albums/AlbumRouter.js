import { Router } from 'express';
import * as controller from './AlbumController';
import { throwAsNext } from '../../middleware';

const path = '/album';
const router = Router();

// route
// top artist
router.get('/new', throwAsNext(controller.getNewAlbum));
// album detail
router.get('/:id', throwAsNext(controller.getAlbumDetail));
// registerSubrouter

// export
export default { path, router };
