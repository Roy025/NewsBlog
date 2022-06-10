const { NewsBlog } = require("../models/news.models");
const { Users } = require("../models/users.models");

const postNews = async (req, res) => {
  const { username, title, body, image } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    return res.status(404).send("User dose not exist.");
  }
  const news = NewsBlog.build({
    username,
    title,
    body,
  });
  await news.save();
  res.send("News Posted ");
};
const AllNews = async (req, res) => {
  const alldata = await NewsBlog.findAll();
  res.json(alldata);
};
const UpdateNews = async (req, res) => {
  const { id, title, body } = req.body;
  const news = await NewsBlog.findOne({ where: { id: id } });
  if (!news) res.status(400).json({ error: "News Doesn't Exist" });
  else {
    if (title !== null) news.set({ title: title });
    if (body !== null) news.set({ body: body });
    await news.save();
    res.status(200).json({
      message: "Updated Succesfully",
    });
  }
};
const deleteNews = async (req, res) => {
  const { title } = req.body;
  const news = await NewsBlog.findOne({ where: { title: title } });
  if (!news) res.status(400).json({ error: "News Doesn't Exist" });
  else {
    NewsBlog.destroy({ where: { title: title } });
    res.status(200).json({
      status: "News Deleted",
    });
  }
};
const getNewsByUser = async (req, res) => {
  const { username } = req.body;
  const user = await NewsBlog.findOne({ where: { username: username } });
  if (!user) {
    return res.status(404).send("User dose not exist.");
  } else {
    const news = await NewsBlog.findAll({ where: { username: username } });
    res.status(200).json({
      status: "success",
      data: news,
    });
  }
};
module.exports = { postNews, AllNews, UpdateNews, deleteNews, getNewsByUser };
