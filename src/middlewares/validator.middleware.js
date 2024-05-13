import { BAD_REQUEST_STATUS_CODE } from '../controllers/constants.js';

export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(error.errors.map((error) => error.message));
  }
};
