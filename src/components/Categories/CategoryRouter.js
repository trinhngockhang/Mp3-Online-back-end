import { Router } from 'express';
import * as controller from './CategoryController';
import { throwAsNext } from '../../middleware';

const path = '/categories';
const router = Router();

// route
// top artist
router.get('/popular', throwAsNext(controller.popularCategory));
// registerSubrouter

// export
export default { path, router };
