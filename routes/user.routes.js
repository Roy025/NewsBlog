const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const { body } = require("express-validator");
const {
  del,
  getAllUsesr,
  register,
  updateUser,
  UserProfile,
  login,
} = require("../controllers/user.controller");

const {
  userVlidation,
  validateName,
  validateUserName,
  validateEmail,
  validatePassword,
  ValidateConfirmPassword,
} = require("../middleware/validation");
const { validateToken } = require("../jwt");

const router = require("express").Router();

router.post(
  "/register",
  validateName,
  validateEmail,
  validateUserName,
  validatePassword,
  ValidateConfirmPassword,
  userVlidation,
  register
);
router.post("/login", validateUserName, validatePassword, userVlidation, login);
router.get("/all", getAllUsesr);
router.get("/profile/:username", validateToken, UserProfile);

router.put("/update/:id", validateToken, updateUser);
router.delete("/delete/:username", del);
module.exports = router;
