const { Sequelize } = require("sequelize");
require("dotenv").config();

exports.sequelize = new Sequelize(process.env.DB, process.env.USER, "", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
