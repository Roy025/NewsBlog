const { sequelize } = require("../config/config");
const { DataTypes } = require("sequelize");
exports.NewsBlog = sequelize.define("news", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
