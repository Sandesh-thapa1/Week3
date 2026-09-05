const catItems = [
  {
    cat_id: 1,
    cat_name: 'Winston',
    weight: 4.5,
    owner: 1,
    filename: 'cat.jpg',
    birthdate: '2022-05-10',
  },
  {
    cat_id: 2,
    cat_name: 'Finn',
    weight: 3.8,
    owner: 2,
    filename: 'cat2.jpg',
    birthdate: '2021-08-15',
  },
];

const listAllCats = () => {
  return catItems;
};

const findCatById = (id) => {
  return catItems.find((cat) => cat.cat_id == id);
};

const addCat = (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;

  const newId = Math.max(...catItems.map((cat) => cat.cat_id)) + 1;

  const newCat = {
    cat_id: newId,
    cat_name,
    weight,
    owner,
    filename,
    birthdate,
  };

  catItems.unshift(newCat);

  return {cat_id: newId};
};

export {listAllCats, findCatById, addCat};
