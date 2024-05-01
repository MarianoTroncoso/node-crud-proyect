import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

const EXPIRES_IN = '1d';

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: EXPIRES_IN }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};
