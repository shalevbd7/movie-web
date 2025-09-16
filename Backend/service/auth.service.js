// This file contains the business logic for user authentication, including signup and login.
import * as authRepository from "../repository/auth.repository.js";
import bcryptjs from "bcryptjs";

export const signup = async (userData) => {
  const { fullName, username, password } = userData;

  if (!fullName || !username || !password) {
    return {
      success: false,
      statusCode: 400,
      message: "All fields are required",
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      statusCode: 400,
      message: "Password must be at list 6 characters",
    };
  }

  const existingUserByUsername = await authRepository.findExactUsername(
    username
  );

  if (existingUserByUsername) {
    return {
      success: false,
      statusCode: 400,
      message: "username already exist",
    };
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const newUser = await authRepository.signup({
    fullName,
    username,
    password: hashedPassword,
  });

  return {
    success: true,
    user: newUser,
  };
};

export const login = async (userData) => {
  const { username, password } = userData;

  if (!username || !password) {
    return {
      success: false,
      statusCode: 400,
      message: "All fields are required",
    };
  }

  const user = await authRepository.findExactUsername(username);

  if (!user) {
    return {
      success: false,
      statusCode: 400,
      message: " Invalid credentials",
    };
  }

  const isPasswordCorrect = await bcryptjs.compare(password, user.password);

  if (!isPasswordCorrect) {
    return {
      success: false,
      statusCode: 400,
      message: " Invalid credentials",
    };
  }

  return {
    success: true,
    user: user,
  };
};
