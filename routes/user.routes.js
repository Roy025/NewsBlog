const {
  del,
  getAllUsesr,
  register,
  updateUser,
  UserProfile,
  login,
} = require("../controllers/user.controller");
const { validateToken } = require("../jwt");

const router = require("express").Router();

router.get("/all", getAllUsesr);
router.get("/profile", validateToken, UserProfile);
router.post("/register", register);
router.post("/login", login);
router.put("/update", validateToken, updateUser);
router.delete("/delete", validateToken, del);
module.exports = router;
