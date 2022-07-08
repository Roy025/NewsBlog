const router = require("express").Router();
const {
  postNews,
  AllNews,
  UpdateNews,
  deleteNews,
  getNewsByUser,
  getMyNews,
} = require("../controllers/news.controllers");
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
router.get("/all", AllNews);
router.put("/update/:id", validateToken, UpdateNews);

router.delete("/delete/:id", validateToken, deleteNews);
//router.get("/myblog", validateToken, getMyNews);
router.get("/blog/:username", validateToken, getNewsByUser);
module.exports = router;
