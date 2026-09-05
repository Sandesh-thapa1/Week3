import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
} from '../models/user-model.js';

const getUsers = async (req, res) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Could not get users.'});
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Could not get user.'});
  }
};

const postUser = async (req, res) => {
  try {
    const result = await addUser(req.body);

    if (!result) {
      res.sendStatus(400);
      return;
    }

    res.status(201).json({
      message: 'New user added.',
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Could not add user.'});
  }
};

const putUser = async (req, res) => {
  try {
    const updated = await modifyUser(req.body, req.params.id);

    if (!updated) {
      res.sendStatus(404);
      return;
    }

    res.json({
      message: 'User updated.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Could not update user.'});
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await removeUser(req.params.id);

    if (!deleted) {
      res.sendStatus(404);
      return;
    }

    res.json({
      message: 'User deleted.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Could not delete user.'});
  }
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
