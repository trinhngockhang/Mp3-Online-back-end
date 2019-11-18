import { Router } from 'express';
import * as controller from './UserController';
import { throwAsNext, authMiddleware, requireLogin } from '../../middleware';

const path = '/users';
const router = Router();

// route
// get me
router.get('/me', authMiddleware, requireLogin, throwAsNext(controller.getMe));
// like song
router.post('/like', authMiddleware, requireLogin, throwAsNext(controller.likeSong));
// comment song
router.post('/comment/:id', authMiddleware, requireLogin, throwAsNext(controller.commentSong));
// unlike song
router.post('/unlike', authMiddleware, requireLogin, throwAsNext(controller.unlikeSong));
// registerSubrouter

// export
export default { path, router };
