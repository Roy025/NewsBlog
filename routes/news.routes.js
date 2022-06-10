const router = require("express").Router();
const {
  postNews,
  AllNews,
  UpdateNews,
  deleteNews,
  getNewsByUser,
} = require("../controllers/news.controllers");
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
  validateUserName,
  validateTitle,
  validateBody,
  userVlidation,
  postNews
);
router.get("/all", AllNews);
router.put("/update", UpdateNews);

router.delete("/delete", validateTitle, userVlidation, deleteNews);
router.get("/", validateUserName, userVlidation, getNewsByUser);
module.exports = router;
