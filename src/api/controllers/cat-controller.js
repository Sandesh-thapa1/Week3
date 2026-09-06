import {
  listAllCats,
  findCatById,
  findCatsByUserId,
  addCat,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getCats = async (req, res, next) => {
  try {
    const cats = await listAllCats();
    res.json(cats);
  } catch (error) {
    next(error);
  }
};

const getCatById = async (req, res, next) => {
  try {
    const cat = await findCatById(req.params.id);

    if (!cat) {
      const error = new Error('Cat not found');
      error.status = 404;
      next(error);
      return;
    }

    res.json(cat);
  } catch (error) {
    next(error);
  }
};

const getCatsByUserId = async (req, res, next) => {
  try {
    const cats = await findCatsByUserId(req.params.id);
    res.json(cats);
  } catch (error) {
    next(error);
  }
};

const postCat = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error('Invalid or missing file');
      error.status = 400;
      next(error);
      return;
    }

    req.body.filename = req.file.filename;

    const result = await addCat(req.body);

    if (!result) {
      const error = new Error('Could not add cat');
      error.status = 400;
      next(error);
      return;
    }

    res.status(201).json({
      message: 'New cat added.',
      result,
    });
  } catch (error) {
    next(error);
  }
};

const putCat = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.filename = req.file.filename;
    }

    const updated = await modifyCat(req.body, req.params.id, res.locals.user);

    if (!updated) {
      const error = new Error('Cat not found or not allowed');
      error.status = 404;
      next(error);
      return;
    }

    res.json({
      message: 'Cat updated.',
    });
  } catch (error) {
    next(error);
  }
};

const deleteCat = async (req, res, next) => {
  try {
    const deleted = await removeCat(req.params.id, res.locals.user);

    if (!deleted) {
      const error = new Error('Cat not found or not allowed');
      error.status = 404;
      next(error);
      return;
    }

    res.json({
      message: 'Cat deleted.',
    });
  } catch (error) {
    next(error);
  }
};

export {getCats, getCatById, getCatsByUserId, postCat, putCat, deleteCat};
