const { check, validationResult } = require("express-validator");

validateName = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required!")
    .isString()
    .withMessage("Must be a valid name!")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be within 3 to 20 character!"),
];
validateUserName = [
  check("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("User Name is required!")
    .isString()
    .withMessage("Must be a valid name!")
    .isLength({ min: 3, max: 6 })
    .withMessage("User name must be within 3 to 6 character!")
    .isLowercase()
    .withMessage("User name must be all lowercase"),
];
validateTitle = [
  check("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Title is required!")
    .isString()
    .withMessage("Must be a valid title!")
    .isLength({ min: 4 })
    .withMessage("Title must be more than 4 character!"),
];
validateBody = [
  check("body")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Body is required!")
    .isLength({ min: 4 })
    .withMessage("Body must be more than 4 character!"),
];
validateEmail = [
  check("email").normalizeEmail().isEmail().withMessage("Invalid email!"),
];
validatePassword = [
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is empty!")
    .isLength({ min: 3, max: 20 })
    .withMessage("Password must be 3 to 20 characters long!"),
];
ValidateConfirmPassword = [
  check("confirmpassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Confirm Password is empty!")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Both password must be same!");
      }
      return true;
    }),
];

userVlidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({ success: false, message: error });
};
module.exports = {
  validateName,
  validateUserName,
  validateEmail,
  validatePassword,
  ValidateConfirmPassword,
  userVlidation,
  validateTitle,
  validateBody,
};
