import { User } from "../models/user.model.js";

// signup
export const signup = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

// find by exact username
export const findExactUsername = async (username) => {
  return await User.findOne({ username: username });
};
