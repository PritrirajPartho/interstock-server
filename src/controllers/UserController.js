/*
 * Title: User Controller
 * Description: All the user controller of this application in this file
 * Author: Joy Sarkar
 * Date: 30-Nov-2023
 */

const {
  createOrUpdateUserService,
  getAllUsersService,
  resetPasswordService,
  getUserByIdService,
  deleteUserService,
  forgotPasswordService,
  loginService,
} = require("../services/UserServices");

// Create and Update user controller
exports.createOrUpdateUserController = async (req, res) => {
  const result = await createOrUpdateUserService(req);
  return res.status(200).send(result);
};

// Get single user controller
exports.getUserByIdController = async (req, res) => {
  const result = await getUserByIdService(req);
  return res.status(200).send(result);
};

// Get all users controller
exports.getAllUsersController = async (req, res) => {
  const result = await getAllUsersService(req);
  return res.status(200).send(result);
};

// Delete user controller
exports.deleteUserController = async (req, res) => {
  const result = await deleteUserService(req);
  return res.status(200).send(result);
};

// Forgot password controller
exports.forgotPasswordController = async (req, res) => {
  const result = await forgotPasswordService(req.body.email);
  return res.status(result.status ? 200 : 400).json(result);
};

// Reset password controller
exports.resetPasswordController = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const result = await resetPasswordService(token, newPassword);
  return res.status(result.status ? 200 : 400).json(result);
};

// Login controller
exports.loginController = async (req, res) => {
  const { email, password } = req.body;

  const result = await loginService(email, password);

  if (result.status) {
    // Set the token in the response headers
    res.setHeader("Authorization", `Bearer ${result.data.token}`);
    return res.status(200).json(result);
  } else {
    return res.status(401).json(result);
  }
};
