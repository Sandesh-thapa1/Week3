import {listAllCats, findCatById, addCat} from '../models/cat-model.js';

// Get all cats
const getCats = (req, res) => {
  res.json(listAllCats());
};

// Get one cat by id
const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);

  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

// Add a new cat
const postCat = (req, res) => {
  const result = addCat(req.body);

  if (result.cat_id) {
    res.status(201).json({
      message: 'New cat added.',
      result,
    });
  } else {
    res.sendStatus(400);
  }
};

// Update cat
const putCat = (req, res) => {
  res.json({
    message: 'Cat item updated.',
  });
};

// Delete cat
const deleteCat = (req, res) => {
  res.json({
    message: 'Cat item deleted.',
  });
};

export {getCats, getCatById, postCat, putCat, deleteCat};
