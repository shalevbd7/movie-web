import * as authService from "../service/auth.service.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

// Controller function for user signup.
export async function signup(req, res) {
  try {
    const result = await authService.signup(req.body);

    // If signup was not successful, return an error response.
    if (!result.success) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }
    // If signup is successful, generate a token and set it as a cookie.
    generateTokenAndSetCookie(result.user._id, res);

    res.status(201).json({
      success: true,
      user: { ...result.user._doc, password: "" },
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Controller function for user login.
export async function login(req, res) {
  try {
    const result = await authService.login(req.body);

    if (!result.success) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }
    // If login is successful, generate a token and set it as a cookie.
    generateTokenAndSetCookie(result.user._id, res);
    res.status(200).json({
      success: true,
      user: {
        ...result.user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in Login controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Controller function for user logout.
export async function logout(req, res) {
  try {
    // Clear the authentication token cookie.
    res.clearCookie("jwt-movie-web");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Controller function to check authentication status.
export async function authCheck(req, res) {
  try {
    console.log("req.user", req.user);
    res.status(200).json({
      success: true,
      user: req.user,
      message: "User is authenticated",
    });
  } catch (error) {
    console.log("Error in authCheck controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
