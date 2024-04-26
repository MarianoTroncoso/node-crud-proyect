import User from '../models/user.model.js';

export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const newUser = new User({
      email,
      password,
      username,
    });

    const savedUser = await newUser.save();

    res.send(savedUser);
  } catch (error) {
    console.log(error);
  }
};

export const login = (req, res) => {
  res.send('Login');
};
