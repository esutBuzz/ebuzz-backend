const ValidateUser = require("../utils/validate");

const validateCredentials = (req, res, next) => {
  const { username, email, password } = req.body;

  const user = new ValidateUser(username, email, password);

  user.isEmail();
  user.isPassword();
  user.isUsername();
//   user.isPhoneNumber();

  let msg = undefined;
  for (const str of user.messages) {
    if (typeof str == "string") {
      msg = str;
    }
  }
  if (typeof msg == "string") {
    return res.send({ error: msg });
  } else {
    next();
  }
};

module.exports = validateCredentials;
