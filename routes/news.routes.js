const router = require("express").Router();
const {
  postNews,
  AllNews,
  UpdateNews,
  deleteNews,
  getNewsByUser,
  getNewsBId,
} = require("../controllers/news.controllers");
const { CaChe } = require("../controllers/user.controller");
const { validateToken } = require("../jwt");
const {
  validateUserName,
  userVlidation,
  validateTitle,
  validateBody,
} = require("../middleware/validation");
const { NewsBlog } = require("../models/news.models");
const { Users } = require("../models/users.models");
router.post(
  "/post",
  validateTitle,
  validateBody,
  userVlidation,
  validateToken,
  postNews
);
router.get("/all",CaChe, AllNews);
router.put("/update/:id", validateToken, UpdateNews);

router.delete("/delete/:id", validateToken, deleteNews);
router.get("/blog/:username", validateToken, getNewsByUser);
router.get("/blog/id/:id", validateToken, getNewsBId);
module.exports = router;
