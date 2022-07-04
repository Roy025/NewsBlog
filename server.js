const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { Users } = require("./models/users.models");
const { sequelize } = require("./config/config");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { validateToken } = require("./jwt");
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
const usersRouter = require("./routes/user.routes");
const newsRouter = require("./routes/news.routes");
app.use("/user", usersRouter);
app.use("/news", newsRouter);

sequelize.sync();
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
