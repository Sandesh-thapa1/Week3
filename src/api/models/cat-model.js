import promisePool from '../../utils/database.js';

const catWithOwner = `
  SELECT
    c.cat_id,
    c.cat_name,
    c.weight,
    c.owner,
    c.filename,
    c.birthdate,
    u.name AS owner_name
  FROM wsk_cats AS c
  INNER JOIN wsk_users AS u
    ON c.owner = u.user_id
`;

const listAllCats = async () => {
  const [rows] = await promisePool.query(catWithOwner);
  return rows;
};

// Get one cat by cat id
const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    `${catWithOwner} WHERE c.cat_id = ?`,
    [id]
  );

  if (!rows[0]) {
    return false;
  }

  return rows[0];
};

const findCatsByUserId = async (userId) => {
  const [rows] = await promisePool.execute(
    `${catWithOwner} WHERE c.owner = ?`,
    [userId]
  );

  return rows;
};

const addCat = async (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;

  const [result] = await promisePool.execute(
    `INSERT INTO wsk_cats
      (cat_name, weight, owner, filename, birthdate)
     VALUES (?, ?, ?, ?, ?)`,
    [cat_name, weight, owner, filename, birthdate]
  );

  if (result.affectedRows !== 1) {
    return false;
  }

  return {cat_id: result.insertId};
};

const modifyCat = async (cat, id, user) => {
  let allowedFields = ['cat_name', 'weight', 'filename', 'birthdate'];

  // Admin can also change the owner
  if (user.role === 'admin') {
    allowedFields.push('owner');
  }

  const changes = [];
  const values = [];

  for (const field of allowedFields) {
    if (cat[field] !== undefined) {
      changes.push(`${field} = ?`);
      values.push(cat[field]);
    }
  }

  if (changes.length === 0) {
    return false;
  }

  let sql;

  if (user.role === 'admin') {
    sql = `
      UPDATE wsk_cats
      SET ${changes.join(', ')}
      WHERE cat_id = ?
    `;

    values.push(id);
  } else {
    sql = `
      UPDATE wsk_cats
      SET ${changes.join(', ')}
      WHERE cat_id = ? AND owner = ?
    `;

    values.push(id, user.user_id);
  }

  const [result] = await promisePool.execute(sql, values);

  return result.affectedRows > 0;
};

const removeCat = async (id, user) => {
  let sql;
  let values;

  if (user.role === 'admin') {
    sql = 'DELETE FROM wsk_cats WHERE cat_id = ?';
    values = [id];
  } else {
    sql = 'DELETE FROM wsk_cats WHERE cat_id = ? AND owner = ?';
    values = [id, user.user_id];
  }

  const [result] = await promisePool.execute(sql, values);

  return result.affectedRows > 0;
};

export {
  listAllCats,
  findCatById,
  findCatsByUserId,
  addCat,
  modifyCat,
  removeCat,
};
