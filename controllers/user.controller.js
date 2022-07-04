const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcrypt");
require("dotenv").config();

const { Users } = require("../models/users.models");
const { createTokens, validateToken } = require("../jwt");
const cookieParser = require("cookie-parser");

const register = (req, res) => {
  const { name, username, email, password, confirmpassword } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      name: name,
      username: username,
      email: email,
      password: hash,
    })
      .then(() => {
        res.json("USER REGISTERED");
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          res.status(400).json({ error: err });
        }
      });
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.status(400).json({ error: "User Doesn't Exist" });

  const dbPassword = user.password;
  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match) {
      res
        .status(400)
        .json({ error: "Wrong Username and Password Combination!" });
    } else {
      const accessToken = createTokens(user);

      res.cookie(process.env.ACCESSTOKEN, accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true,
      });

      res.status(200).json({
        status: "Logged In",
        token: accessToken,
      });
    }
  });
};

const UserProfile = async (req, res) => {
  const { username } = req.body;
  const user = await Users.findOne({
    where: { username: username },
  });
  if (!user) res.status(400).json({ error: "User Doesn't Exist" });
  else
    res.status(200).json({
      status: "success",
      data: user,
    });
};

const getAllUsesr = async (req, res) => {
  const users = await Users.findAll({
    attributes: { exclude: ["password"] },
  });

  res.status(200).json({
    status: "success",
    data: users,
  });
};
const updateUser = async (req, res) => {
  const { id, name, username, email, password, oldpassword } = req.body;

  const user = await Users.findByPk(id);
  if (!user) res.status(400).json({ error: "User Doesn't Exist" });
  else {
    const checkPass = await bcrypt.compare(oldpassword, user.password);
    if (!checkPass) {
      return res
        .status(400)
        .json({ error: "Passwords Doesn't Match With Old Password." });
    }
    if (name !== null) {
      user.set({ name: name });
    }
    if (username !== null) {
      user.set({ username: username });
    }
    if (password !== null)
      user.set({ password: await bcrypt.hash(password, 10) });
    if (email !== null) user.set({ email: email });
    await user.save();
    res.status(200).json({
      message: "Updated Successfully",
    });
  }
};

const del = async (req, res) => {
  const { username } = req.body;
  const user = await Users.findOne({
    where: { username: username },
  });
  if (!user) res.status(400).json({ error: "User Doesn't Exist" });
  else {
    user.destroy();
    res.status(200).json({
      status: "Deleted User",
    });
  }
};
module.exports = { register, del, updateUser, getAllUsesr, login, UserProfile };
