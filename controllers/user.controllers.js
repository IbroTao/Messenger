const { Users } = require("../models/user.models");
const {
  sendPasswordResetTokenEmail,
} = require("../utils/sendPasswordResetEmail");
const { validateMongoId } = require("../utils/validateMongoId");
const crypto = require("crypto");

const updateUserDetails = async (req, res) => {
  const { _id } = req.user;
  validateMongoId(_id);
  try {
    const user = await Users.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!user) {
      res.status(400).json({ message: "Failed to update!" });
    }

    res.status(200).json({ message: "User details updated successfully!" });
  } catch (error) {
    throw new Error(error);
  }
};

const sendResetPasswordTokenViaEmail = async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "User not found!" });
  }

  const resetToken = crypto.randomBytes(70).toString("hex");

  await sendPasswordResetTokenEmail({
    name: user.name,
    token: resetToken,
  });

  user.passwordChangedAt = Date.now();
  user.passwordResetToken = createHash(resetToken);
  user.passwordResetTokenExpiresAt = Date.now() * 1000 * 60 * 10;
  const newUser = await user.save();

  res.status(200).json({
    message: "Check your email inbox to reset your password",
    user: newUser,
  });
};

const updatePasswordViaEmail = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const user = await Users.findOne({
    passwordResetToken: token,
    passwordResetTokenExpiresAt: { $gt: Date.now() },
  });
  try {
    if (!user) {
      res.status(400).json({ message: "Token expired" });
    }

    user.password = password;
    user.passwordResetToken = null;
    user.passwordResetTokenExpiresAt = null;
    const newUser = await user.save();

    res.status(200).json({ message: "Password updated successfully", newUser });
  } catch (error) {
    throw new Error(error);
  }
};

const updatePassword = async (req, res) => {
  const { _id } = req.user;
  validateMongoId(_id);
  try {
    const { oldPassword, newPassword } = req.body;
  } catch (error) {
    throw new Error(error);
  }
};
