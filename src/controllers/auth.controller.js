import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

const NUMBER_OF_SALT_ROUNDS = 10;

const TOKEN_COOKIE_NAME = 'token';

export const register = async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash(
      req.body.password,
      NUMBER_OF_SALT_ROUNDS
    );

    const { email, username } = req.body;

    const newUser = new User({
      email,
      password: passwordHash,
      username,
    });

    const savedUser = await newUser.save();

    const token = await createAccessToken({ id: savedUser._id });

    res.cookie(TOKEN_COOKIE_NAME, token);

    res.json({
      message: 'User created successfully',
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const login = (req, res) => {
  res.send('Login');
};
