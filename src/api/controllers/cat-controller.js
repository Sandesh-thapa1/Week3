import {
  listAllCats,
  findCatById,
  findCatsByUserId,
  addCat,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getCats = async (req, res) => {
  try {
    const cats = await listAllCats();
    res.json(cats);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Could not get cats.'});
  }
};

const getCatById = async (req, res) => {
  try {
    const cat = await findCatById(req.params.id);

    if (!cat) {
      res.sendStatus(404);
      return;
    }

    res.json(cat);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Could not get cat.'});
  }
};

const getCatsByUserId = async (req, res) => {
  try {
    const cats = await findCatsByUserId(req.params.id);
    res.json(cats);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Could not get user cats.'});
  }
};

const postCat = async (req, res) => {
  try {
    if (req.file) {
      req.body.filename = req.file.filename;
    }

    const result = await addCat(req.body);

    if (!result) {
      res.sendStatus(400);
      return;
    }

    res.status(201).json({
      message: 'New cat added.',
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Could not add cat.'});
  }
};

const putCat = async (req, res) => {
  try {
    if (req.file) {
      req.body.filename = req.file.filename;
    }

    const updated = await modifyCat(req.body, req.params.id);

    if (!updated) {
      res.sendStatus(404);
      return;
    }

    res.json({
      message: 'Cat updated.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Could not update cat.'});
  }
};

const deleteCat = async (req, res) => {
  try {
    const deleted = await removeCat(req.params.id);

    if (!deleted) {
      res.sendStatus(404);
      return;
    }

    res.json({
      message: 'Cat deleted.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Could not delete cat.'});
  }
};

export {getCats, getCatById, getCatsByUserId, postCat, putCat, deleteCat};
