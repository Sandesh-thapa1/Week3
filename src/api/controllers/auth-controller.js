import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {findUserByUsername} from '../models/user-model.js';
import 'dotenv/config';

const postLogin = async (req, res, next) => {
  try {
    const user = await findUserByUsername(req.body.username);

    if (!user) {
      const error = new Error('Invalid username or password');
      error.status = 401;
      next(error);
      return;
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      const error = new Error('Invalid username or password');
      error.status = 401;
      next(error);
      return;
    }

    const userWithNoPassword = {
      user_id: user.user_id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res.json({
      user: userWithNoPassword,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const getMe = (req, res, next) => {
  if (!res.locals.user) {
    const error = new Error('Unauthorized');
    error.status = 401;
    next(error);
    return;
  }

  res.json({
    message: 'Token ok',
    user: res.locals.user,
  });
};

export {postLogin, getMe};
