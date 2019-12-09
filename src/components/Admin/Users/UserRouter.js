import { Router } from 'express';
import * as controller from './UserController';
import { throwAsNext, paginationMiddleware, authMiddleware } from '../../../middleware';

const path = '/admin';
const router = Router();

// route
// get user
router.get('/users', authMiddleware, paginationMiddleware({
  maxSize: 30,
  defaultSize: 20,
  filterKeys: [],
  sortKeys: ['name', 'username', 'createdAt'],
}), throwAsNext(controller.getUsers));
// get user detail
router.get('/users/:id', authMiddleware, throwAsNext(controller.getUserDetail));

// registerSubrouter

// export
export default { path, router };
