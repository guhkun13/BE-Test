const db = require("../models");
const jwt = require("jsonwebtoken");
const configJwt = require("../config/jwt");

function requiredField(field) {
  return field != undefined && field != "";
}

const errorBadRequest = "Bad Request";
const errorUsernameNotFound = "Username not found";
const errorAccountNotFound = "Account not found";

// Handling post request
const loginController = async (req, res) => {
  let error;
  let existingUser;

  error = validateLoginRequest(req);
  if (error) {
    return res.status(400).json({
      success: false,
      error: errorBadRequest,
    });
  }

  existingUser = await getUser(req);
  if (!existingUser) {
    return res.status(400).json({
      success: false,
      error: errorAccountNotFound,
    });
  }

  token = generateToken(existingUser);

  if (error) {
    return res.status(400).json({
      success: false,
      error: error,
      data: [],
    });
  }

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

// helper functions

const validateLoginRequest = (req) => {
  let { username, password } = req.body;
  let error = false;

  if (!requiredField(username) || !requiredField(password)) {
    error = true;
  }

  return error;
};

const getUser = async (req) => {
  let { username, password } = req.body;
  let user;

  try {
    user = await db.models.users.findOne({
      where: { username: username, password: password },
    });
  } catch {
    console.log(errorUsernameNotFound);
  }

  return user;
};

const generateToken = (user) => {
  let token;
  let error = "";
  try {
    //Creating jwt token
    token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role,
        division: user.division,
      },
      configJwt.TOKEN_SECRET,
      { expiresIn: configJwt.TOKEN_EXPIRES }
    );

    ok = true;
  } catch (err) {
    error = err.message;
  }

  return { token, error };
};

module.exports = {
  loginController,
};
