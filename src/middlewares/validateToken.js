import { TOKEN_COOKIE_NAME } from '../controllers/constants.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import {
  UNAUTHORIZED_STAUS_CODE,
  UNAUTHORIZED_ERROR,
} from '../controllers/constants.js';

export const authRequired = (req, res, next) => {
  const token = req.cookies[TOKEN_COOKIE_NAME];

  if (!token) {
    return res.status(UNAUTHORIZED_STAUS_CODE).json({
      error: UNAUTHORIZED_ERROR,
    });
  }

  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(UNAUTHORIZED_STAUS_CODE).json({
        error: UNAUTHORIZED_ERROR,
      });
    }

    req.user = decoded; // this enable us to access the user object in the next middleware (profile)
  });

  next();
};
