const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    digits: {
      type: DataTypes.STRING(155),
      allowNull: true,
      unique: "users_digits_key"
    },
    fotoUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    workType: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    positionTitle: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    lon: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    company: {
      type: DataTypes.STRING(155),
      allowNull: true
    },
    isLogin: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    dovote: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    dosurvey: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    dofeedback: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cuurentLeave: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "users_digits_key",
        unique: true,
        fields: [
          { name: "digits" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
