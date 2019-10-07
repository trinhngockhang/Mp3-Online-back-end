import { Router } from 'express';
import * as controller from './ArtistController';
import { throwAsNext } from '../../middleware';

const path = '/artist';
const router = Router();

// route
// top artist
router.get('/suggest', throwAsNext(controller.getSuggestArtist));
// registerSubrouter

// export
export default { path, router };
