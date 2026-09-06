import express from 'express';
import {body} from 'express-validator';

import {postLogin, getMe} from '../controllers/auth-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {validationErrors} from '../../middlewares/error-handlers.js';

const authRouter = express.Router();

authRouter.post(
  '/login',

  body('username').trim().notEmpty().withMessage('Username is required'),

  body('password').notEmpty().withMessage('Password is required'),

  validationErrors,
  postLogin
);

authRouter.get('/me', authenticateToken, getMe);

export default authRouter;
