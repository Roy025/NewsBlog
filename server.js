const express = require("express");
const app = express();

require("dotenv").config();
const { Users } = require("./models/users.models");
const bodyParser = require("body-parser");
const { sequelize } = require("./config/config");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { validateToken } = require("./jwt");
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const usersRouter = require("./routes/user.routes");
const newsRouter = require("./routes/news.routes");
app.use("/user", usersRouter);
app.use("/news", newsRouter);
sequelize.sync();
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
