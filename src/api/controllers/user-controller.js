import bcrypt from 'bcrypt';

import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
} from '../models/user-model.js';

const getUsers = async (req, res, next) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);

    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      next(error);
      return;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const postUser = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      ...req.body,
      password: hashedPassword,
      role: 'user',
    };

    const result = await addUser(newUser);

    if (!result) {
      const error = new Error('Could not add user');
      error.status = 400;
      next(error);
      return;
    }

    res.status(201).json({
      message: 'New user added.',
      result,
    });
  } catch (error) {
    next(error);
  }
};

const putUser = async (req, res, next) => {
  try {
    const loggedInUser = res.locals.user;
    const userId = Number(req.params.id);

    if (loggedInUser.role !== 'admin' && loggedInUser.user_id !== userId) {
      const error = new Error('Not allowed');
      error.status = 403;
      next(error);
      return;
    }

    if (loggedInUser.role !== 'admin') {
      delete req.body.role;
    }

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updated = await modifyUser(req.body, userId);

    if (!updated) {
      const error = new Error('User not found');
      error.status = 404;
      next(error);
      return;
    }

    res.json({
      message: 'User updated.',
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const loggedInUser = res.locals.user;
    const userId = Number(req.params.id);

    if (loggedInUser.role !== 'admin' && loggedInUser.user_id !== userId) {
      const error = new Error('Not allowed');
      error.status = 403;
      next(error);
      return;
    }

    const deleted = await removeUser(userId);

    if (!deleted) {
      const error = new Error('User not found');
      error.status = 404;
      next(error);
      return;
    }

    res.json({
      message: 'User deleted.',
    });
  } catch (error) {
    next(error);
  }
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
