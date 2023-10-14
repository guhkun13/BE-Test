var DataTypes = require("sequelize").DataTypes;
var _live_threat = require("./live_threat");
var _surveys = require("./surveys");
var _users = require("./users");

function initModels(sequelize) {
  var live_threat = _live_threat(sequelize, DataTypes);
  var surveys = _surveys(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  surveys.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(surveys, { as: "surveys", foreignKey: "userId"});

  return {
    live_threat,
    surveys,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
