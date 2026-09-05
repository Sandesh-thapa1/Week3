import {listAllCats, findCatById, addCat} from '../models/cat-model.js';

// all cats
const getCats = (req, res) => {
  res.json(listAllCats());
};

// Get cat id by one
const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);

  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  console.log('Form data:', req.body);
  console.log('File data:', req.file);

  if (req.file) {
    req.body.filename = req.file.filename;
  }

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

// Del the cat
const deleteCat = (req, res) => {
  res.json({
    message: 'Cat item deleted.',
  });
};

export {getCats, getCatById, postCat, putCat, deleteCat};
