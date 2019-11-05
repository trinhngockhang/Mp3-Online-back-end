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
// --- Login Facebook ---
router.post('/login-fb', throwAsNext(controller.loginFb));
// --- Login Google ---
router.post('/login-gg', throwAsNext(controller.loginGg));
// --- Sign up ---
router.post('/signUp', throwAsNext(controller.signUp));
// registerSubrouter

// export
export default { path, router };
