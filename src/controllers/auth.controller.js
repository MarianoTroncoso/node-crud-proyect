import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

const NUMBER_OF_SALT_ROUNDS = 10;

const TOKEN_COOKIE_NAME = 'token';

// It is not advisable to use such descriptive messages for these cases
const INVALID_EMAIL_OR_PASSWORD = 'Invalid email or password';

const USER_NOT_FOUND = 'User not found';

const BAD_REQUEST_STATUS_CODE = 400;
const OK_STATUS_CODE = 200;

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
    res.status(BAD_REQUEST_STATUS_CODE).json({
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(BAD_REQUEST_STATUS_CODE).json({
        error: USER_NOT_FOUND,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, userFound.password);

    if (!isPasswordValid) {
      return res.status(BAD_REQUEST_STATUS_CODE).json({
        error: INVALID_EMAIL_OR_PASSWORD,
      });
    }

    const token = await createAccessToken({ id: userFound._id });

    res.cookie(TOKEN_COOKIE_NAME, token);

    res.json({
      id: userFound._id,
      email: userFound.email,
      username: userFound.username,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(BAD_REQUEST_STATUS_CODE).json({
      error: error.message,
    });
  }
};

export const logout = (_, res) => {
  res.clearCookie(TOKEN_COOKIE_NAME);

  return res.sendStatus(OK_STATUS_CODE);
};
