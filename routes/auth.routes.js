const express = require("express");
const passport = require("passport");
const validate = require("../middlewares/validate");
const authValidation = require("../validations/auth.validation");
const authController = require("../controllers/auth.controller");
const validateAccount = require("../middlewares/validateUser");

const router = express.Router();

router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);

router.post("/login", validate(authValidation.login), authController.login);

router.post(
  "/verify",
  validate(authValidation),
  authController.sendVerificationEmail
);

router.post(
  "/validate-account",
  validate(authValidation.validateAcct),
  authController.verifyAccount
);

router.post(
  "/refresh-tokens",
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);

router.post(
  "/resend-verification-code",
  validate(authValidation.email),
  authController.resendVerificationCode
);

module.exports = router;
