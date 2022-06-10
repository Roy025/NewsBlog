const router = require("express").Router();
const {
  postNews,
  AllNews,
  UpdateNews,
  deleteNews,
  getNewsByUser,
} = require("../controllers/news.controllers");
const { NewsBlog } = require("../models/news.models");
const { Users } = require("../models/users.models");
router.post("/post", postNews);
router.get("/all", AllNews);
router.put("/update", UpdateNews);

router.delete("/delete", deleteNews);
router.get("/", getNewsByUser);
module.exports = router;
