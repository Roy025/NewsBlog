const jwt = require("jsonwebtoken");
const { Users } = require("./models/users.models");
require("dotenv").config();

function createTokens(username) {
  console.log(username);
  return jwt.sign({ username: username }, process.env.TOKEN, {});
}

const validateToken = (req, res, next) => {
  const accessToken = req.headers[process.env.ACCESSTOKEN];
  console.log("Token " + accessToken);
  // const accessToken = req.headers.authorization.split(" ")[1];
  //Bearer+" "+token
  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });
  else {
    try {
      const validToken = jwt.verify(accessToken, process.env.TOKEN);

      if (validToken) {
        req.authenticated = true;
        req.userData = {
          username: validToken.username,
        };
        return next();
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
};

module.exports = { createTokens, validateToken };
