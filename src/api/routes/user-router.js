import express from 'express';
import {body} from 'express-validator';

import {authenticateToken} from '../../middlewares/authentication.js';
import {validationErrors} from '../../middlewares/error-handlers.js';

import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter
  .route('/')
  .get(getUsers)
  .post(
    body('name')
      .trim()
      .isLength({min: 2, max: 50})
      .withMessage('Name must be 2-50 characters'),

    body('username')
      .trim()
      .isLength({min: 3, max: 20})
      .withMessage('Username must be 3-20 characters')
      .isAlphanumeric()
      .withMessage('Username must contain only letters and numbers'),

    body('email').trim().isEmail().withMessage('Email must be valid'),

    body('password')
      .isLength({min: 8})
      .withMessage('Password must be at least 8 characters'),

    validationErrors,
    postUser
  );

userRouter
  .route('/:id')
  .get(getUserById)

  .put(
    authenticateToken,

    body('name')
      .optional()
      .trim()
      .isLength({min: 2, max: 50})
      .withMessage('Name must be 2-50 characters'),

    body('username')
      .optional()
      .trim()
      .isLength({min: 3, max: 20})
      .withMessage('Username must be 3-20 characters')
      .isAlphanumeric()
      .withMessage('Username must contain only letters and numbers'),

    body('email')
      .optional()
      .trim()
      .isEmail()
      .withMessage('Email must be valid'),

    body('password')
      .optional()
      .isLength({min: 8})
      .withMessage('Password must be at least 8 characters'),

    body('role')
      .optional()
      .isIn(['user', 'admin'])
      .withMessage('Role must be user or admin'),

    validationErrors,
    putUser
  )

  .delete(authenticateToken, deleteUser);

export default userRouter;
