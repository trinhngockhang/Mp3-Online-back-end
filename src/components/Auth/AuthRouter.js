import { Router } from 'express';
import * as controller from './AuthController';
import { throwAsNext } from '../../middleware';
import {
  loginValidator,
} from './validator';

const path = '/auth';
const router = Router();

// route
// --- Login ---
router.post('/login', loginValidator, throwAsNext(controller.login));

// --- Sign up ---
router.post('/signUp', throwAsNext(controller.signUp));
// registerSubrouter

// export
export default { path, router };
