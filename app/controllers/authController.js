const db = require("../models");
const jwt = require("jsonwebtoken");
const configJwt = require("../config/jwt");

function requiredField(field) {
  return field != undefined && field != "";
}

const errorUsernameNotFound = "Username not found";
const errorAccountNotFound = "Account not found";

// Handling post request
const loginController = async (req, res) => {
  let { username, password } = req.body;

  console.log("[Step-1]: verify required fields");
  if (!requiredField(username) || !requiredField(password)) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
    });
  }

  console.log("[Step-2]: verify username");

  let existingUser;
  try {
    existingUser = await db.models.users.findOne({
      where: { username: username },
    });
  } catch {
    return res.status(404).json({
      success: false,
      message: errorUsernameNotFound,
    });
  }

  console.log("[Step-3]: verify username & password");
  if (existingUser.password != password) {
    return res.status(404).send({
      success: false,
      message: errorAccountNotFound,
    });
  }

  console.log("[Step-4]: generate JWT");
  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      {
        userId: existingUser.id,
        username: existingUser.username,
        role: existingUser.role,
        division: existingUser.division,
      },
      configJwt.TOKEN_SECRET,
      { expiresIn: configJwt.TOKEN_EXPIRES }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  console.log("[Step-5]: return generated JWT");

  return res.status(200).json({
    success: true,
    data: {
      userId: existingUser.id,
      username: existingUser.username,
      role: existingUser.role,
      token: token,
    },
  });
};

module.exports = {
  loginController,
};
