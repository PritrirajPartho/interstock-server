/*
 * Title: User Service
 * Description: All the user services are here of this application
 * Author: Joy Sarkar
 * Date: 30-Nov-2023
 */

const User = require("../models/User");
const crypto = require("crypto");

const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const { sendResetPasswordEmail } = require("../utils/emailUtils");
const { generateToken } = require("../utils/jwtUtils");

// Generate a unique token
const generateResetToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

// Create and update user service
exports.createOrUpdateUserService = async (req) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return { status: false, message: "Email is required." };
    }

    // Hash the password if provided
    const hashedPassword = password ? await hashPassword(password) : undefined;

    // Update the request body with the hashed password
    const updatedUser = { ...req.body, password: hashedPassword };

    // Check if the user with the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // User with the email exists, update the user
      const user = await User.findOneAndUpdate({ email }, updatedUser, {
        new: true,
      });
      return { status: true, data: user };
    } else {
      // User with the email does not exist, create a new user
      const newUser = await new User(updatedUser).save();
      return { status: true, data: newUser };
    }
  } catch (error) {
    console.error(error);
    return { status: false, message: "Something went wrong." };
  }
};

// Get all users service
exports.getAllUsersService = async (req) => {
  try {
    const users = await User.find();
    return { status: true, data: users, loginUser: req?.user };
  } catch (error) {
    return { status: false, message: "Something went wrong." };
  }
};

// Get single user service
exports.getUserByIdService = async (req) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return { status: false, message: "User not found." };
    }
    return { status: true, data: user };
  } catch (error) {
    return { status: false, message: "Something went wrong." };
  }
};

// Delete user service
exports.deleteUserService = async (req) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return { status: false, message: "User not found." };
    }
    return { status: true, message: "User deleted successfully." };
  } catch (error) {
    return { status: false, message: "Something went wrong." };
  }
};

// Service to handle the forgot password functionality
exports.forgotPasswordService = async (email) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return { status: false, message: "User not found." };
    }

    // Generate a unique token
    const resetToken = generateResetToken();

    // Save the token and its expiration time to the user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send an email with the reset link
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    try {
      await sendResetPasswordEmail(email, resetLink);
    } catch (error) {
      console.error("Error sending reset password email:", error.message);
      return { status: false, message: "Error sending reset password email." };
    }

    return { status: true, message: "Reset link sent to your email." };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Something went wrong." };
  }
};

// Service to handle the reset password functionality
exports.resetPasswordService = async (token, newPassword) => {
  try {
    // Find the user by the reset token and check if it's still valid
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    console.log(newPassword);

    if (!user) {
      return { status: false, message: "Invalid or expired reset token." };
    }

    // Update the user's password and reset token
    user.password = await hashPassword(newPassword);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    // Save the updated user
    await user.save();

    return { status: true, message: "Password reset successfully." };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Something went wrong." };
  }
};

// Login service
exports.loginService = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user || !(await comparePassword(password, user.password))) {
      return { status: false, message: "Invalid email or password." };
    }

    // Create a safe user object without sensitive fields
    const safeUser = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(user._id);

    return { status: true, data: { safeUser, token } };
  } catch (error) {
    return { status: false, message: "Something went wrong." };
  }
};
