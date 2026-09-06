import express from 'express';
import {body} from 'express-validator';

import {upload, createThumbnail} from '../../middlewares/upload.js';

import {authenticateToken} from '../../middlewares/authentication.js';
import {validationErrors} from '../../middlewares/error-handlers.js';

import {
  getCats,
  getCatById,
  getCatsByUserId,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const catRouter = express.Router();

catRouter
  .route('/')
  .get(getCats)
  .post(
    authenticateToken,

    upload.single('file'),

    body('cat_name')
      .trim()
      .isLength({min: 3, max: 50})
      .withMessage('Cat name must be 3-50 characters'),

    body('weight').isFloat().withMessage('Weight must be a number').toFloat(),

    body('owner').isInt().withMessage('Owner must be an integer').toInt(),

    body('birthdate')
      .trim()
      .isISO8601()
      .withMessage('Birthdate must be a valid date'),

    validationErrors,
    createThumbnail,
    postCat
  );

catRouter.get('/user/:id', getCatsByUserId);

catRouter
  .route('/:id')
  .get(getCatById)

  .put(
    authenticateToken,

    body('cat_name')
      .optional()
      .trim()
      .isLength({min: 3, max: 50})
      .withMessage('Cat name must be 3-50 characters'),

    body('weight')
      .optional()
      .isFloat()
      .withMessage('Weight must be a number')
      .toFloat(),

    body('owner')
      .optional()
      .isInt()
      .withMessage('Owner must be an integer')
      .toInt(),

    body('birthdate')
      .optional()
      .trim()
      .isISO8601()
      .withMessage('Birthdate must be a valid date'),

    validationErrors,
    putCat
  )

  .delete(authenticateToken, deleteCat);

export default catRouter;
