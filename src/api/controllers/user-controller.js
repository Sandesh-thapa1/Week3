import bcrypt from 'bcrypt';

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
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      ...req.body,
      password: hashedPassword,
      role: 'user',
    };

    const result = await addUser(newUser);

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
    const loggedInUser = res.locals.user;
    const userId = Number(req.params.id);

    // Normal user can update only themselves
    if (loggedInUser.role !== 'admin' && loggedInUser.user_id !== userId) {
      res.sendStatus(403);
      return;
    }

    if (loggedInUser.role !== 'admin') {
      delete req.body.role;
    }

    // Hash password if user changes it
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updated = await modifyUser(req.body, userId);

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
    const loggedInUser = res.locals.user;
    const userId = Number(req.params.id);

    // Normal user can delete only themselves
    if (loggedInUser.role !== 'admin' && loggedInUser.user_id !== userId) {
      res.sendStatus(403);
      return;
    }

    const deleted = await removeUser(userId);

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
