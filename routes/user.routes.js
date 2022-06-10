const { body } = require("express-validator");
const {
  del,
  getAllUsesr,
  register,
  updateUser,
  UserProfile,
  login,
} = require("../controllers/user.controller");
const { validateToken } = require("../jwt");
const {
  userVlidation,
  validateName,
  validateUserName,
  validateEmail,
  validatePassword,
} = require("../middleware/validation");

const router = require("express").Router();

router.post(
  "/register",
  validateName,
  validateUserName,
  validateEmail,
  validatePassword,
  userVlidation,
  register
);
router.post("/login", validateUserName, userVlidation, login);
router.get("/all", getAllUsesr);
router.get(
  "/profile",
  validateUserName,
  userVlidation,
  validateToken,
  UserProfile
);
router.put("/update", validateToken, updateUser);
router.delete("/delete", validateUserName, userVlidation, validateToken, del);
module.exports = router;
