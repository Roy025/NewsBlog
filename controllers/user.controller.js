const express = require("express");
const jwt = require("jsonwebtoken");

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
          res.json({ error: err });
        }
      });
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User Doesn't Exist" });
  console.log("Usr    ");
  console.log(user);
  console.log("pass    ");
  console.log(user.password);
  const dbPassword = user.password;
  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match) {
      res.json({ error: "Wrong Username and Password Combination!" });
    } else {
      const accessToken = createTokens(username);

      res.status(200).json({
        status: "Logged In",
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        token: accessToken,
      });
    }
  });
};

const UserProfile = async (req, res) => {
  const { username } = req.params;
  const user = await Users.findOne({
    where: { username: username },
  });
  if (!user) res.json({ error: "User Doesn't Exist" });
  else
    res.json({
      status: "success",
      data: user,
    });
};

const getAllUsesr = async (req, res) => {
  const users = await Users.findAll({
    attributes: { exclude: ["password"] },
  });

  res.json({
    status: "success",
    data: users,
  });
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, username, email, password, oldpassword } = req.body;

  const user = await Users.findByPk(id);
  if (!user) res.json({ error: "User Doesn't Exist" });
  else {
    const checkPass = await bcrypt.compare(oldpassword, user.password);
    if (!checkPass) {
      return res.json({ error: "Password Doesn't Match With Old Password." });
    } else {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.username = req.body.username || user.username;
      user.password =
        (await bcrypt.hash(req.body.password, 10)) || user.password;
    }
    const updatedUser = await user.save();
    await user.save();
    res.json({
      name: updatedUser.name,
      email: updatedUser.email,
      username: updatedUser.username,
      message: "Updated Successfully",
    });
  }
};

const del = async (req, res) => {
  const { username } = req.params;
  const user = await Users.findOne({
    where: { username: username },
  });
  if (!user) res.status(400).json({ error: "User Doesn't Exist" });
  else {
    user.destroy();
    res.json({
      status: "Deleted User",
    });
  }
};

module.exports = {
  register,
  del,
  updateUser,
  getAllUsesr,
  login,
  UserProfile,
};
