import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query(
    `SELECT user_id, name, username, email, role
     FROM wsk_users`
  );

  return rows;
};
const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    `SELECT user_id, name, username, email, role
     FROM wsk_users
     WHERE user_id = ?`,
    [id]
  );

  if (!rows[0]) {
    return false;
  }

  return rows[0];
};

const addUser = async (user) => {
  const {name, username, email, password, role = 'user'} = user;

  const [result] = await promisePool.execute(
    `INSERT INTO wsk_users
      (name, username, email, password, role)
     VALUES (?, ?, ?, ?, ?)`,
    [name, username, email, password, role]
  );

  if (result.affectedRows !== 1) {
    return false;
  }

  return {user_id: result.insertId};
};

const modifyUser = async (user, id) => {
  const allowedFields = ['name', 'username', 'email', 'password', 'role'];

  const changes = [];
  const values = [];

  for (const field of allowedFields) {
    if (user[field] !== undefined) {
      changes.push(`${field} = ?`);
      values.push(user[field]);
    }
  }

  if (changes.length === 0) {
    return false;
  }

  values.push(id);

  const [result] = await promisePool.execute(
    `UPDATE wsk_users
     SET ${changes.join(', ')}
     WHERE user_id = ?`,
    values
  );

  return result.affectedRows > 0;
};

const removeUser = async (id) => {
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);

    const [result] = await connection.execute(
      'DELETE FROM wsk_users WHERE user_id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      return false;
    }

    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export {listAllUsers, findUserById, addUser, modifyUser, removeUser};
