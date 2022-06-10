const { sequelize } = require("../config/config");
const { DataTypes } = require("sequelize");
exports.Users = sequelize.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Email is not valid",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
