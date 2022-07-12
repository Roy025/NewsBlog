const { NewsBlog } = require("../models/news.models");
const { Users } = require("../models/users.models");
const jwt = require("jsonwebtoken");

const postNews = async (req, res) => {
  const username = req.userData.username;
  const { title, body, image } = req.body;
  console.log("AAA   " + req.body.title);
  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    return res.send("User dose not exist.");
  }
  const news = NewsBlog.build({
    username,
    title,
    body,
  });
  await news.save();
  res.send("News Posted");
};
const AllNews = async (req, res) => {
  const alldata = await NewsBlog.findAll();
  res.json(alldata);
};
const UpdateNews = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const news = await NewsBlog.findOne({ where: { id: id } });
  if (!news) res.status(400).json({ error: "News Doesn't Exist" });
  else {
    news.title = req.body.title || news.title;
    news.body = req.body.body || news.body;
    await news.save();
    res.json({
      message: "Updated Succesfully",
    });
  }
};
const deleteNews = async (req, res) => {
  const { id } = req.params;
  const news = await NewsBlog.findOne({ where: { id: id } });
  if (!news) res.status(400).json({ error: "News Doesn't Exist" });
  else {
    NewsBlog.destroy({ where: { id: id } });
    res.json({
      status: "News Deleted",
    });
  }
};
const getNewsByUser = async (req, res) => {
  const { username } = req.params;
  console.log(username);
  const user = await NewsBlog.findOne({ where: { username: username } });
  if (!user) {
    return res.json({
      data: "No Posts Yet.",
    });
  } else {
    const news = await NewsBlog.findAll({ where: { username: username } });
    res.json({
      data: news,
    });
  }
};

const getNewsBId = async (req, res) => {
  const { id } = req.params;
  const news = await NewsBlog.findOne({
    where: { id: id },
  });
    res.json({
      status: "success",
      data: news,
    });
};
module.exports = {
  postNews,
  AllNews,
  UpdateNews,
  deleteNews,
  getNewsByUser,
  getNewsBId
};
