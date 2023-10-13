var DataTypes = require("sequelize").DataTypes;
var _surveys = require("./surveys");
var _users = require("./users");

function initModels(sequelize) {
  var surveys = _surveys(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  surveys.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(surveys, { as: "surveys", foreignKey: "userId"});

  return {
    surveys,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
