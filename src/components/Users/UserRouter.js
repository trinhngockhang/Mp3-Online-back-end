import { Router } from 'express';
import * as controller from './UserController';
import { throwAsNext, authMiddleware, requireLogin } from '../../middleware';

const path = '/users';
const router = Router();

// route
// get me
router.get('/me', authMiddleware, requireLogin, throwAsNext(controller.getMe));
// registerSubrouter

// export
export default { path, router };
