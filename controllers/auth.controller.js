const express = require("express");
const createError = require("http-errors");
const User = require("../Models/User.model");
const { authSchema } = require("../helpers/validation_schema");
const {
  signAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
  signRefreshToken,
} = require("../helpers/jwt_helper");
require("cors");
const authRegister = async (req, res, next) => {
  console.log(req.body);
  try {
    //const { email, password } = req.body;
    const result = await authSchema.validateAsync(req.body);
    const doesExist = await User.findOne({ email: result.email });

    if (doesExist) throw createError.Conflict(`${result.email} already exist`);

    const user = new User(result);
    const savedUser = await user.save();
    const accessToken = await signAccessToken(savedUser.id);
    const refreshToken = await signRefreshToken(savedUser.id);

    res.send({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

const authLogin = async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });

    if (!user) throw createError.NotFound("User not registered");

    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch) throw createError.Unauthorized("username/Password not valid");

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

    res.send({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi == true)
      return next(createError.BadRequest("Invalid Username/Pasword"));
    next(error);
  }
};
const authRefreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId);
    res.send({ accessToken: accessToken, refreshToken: refToken });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  authRegister,
  authLogin,
  authRefreshToken,
};
