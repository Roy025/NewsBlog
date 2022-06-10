const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();
const User = require("./models/users.models");

const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username, id: user.id },
    process.env.TOKEN
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies[process.env.ACCESSTOKEN];

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });
  try {
    const validToken = verify(accessToken, process.env.TOKEN);

    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };
