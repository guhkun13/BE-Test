const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('live_threat', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sourceCountry: {
      type: DataTypes.CHAR(2),
      allowNull: true
    },
    destinationCountry: {
      type: DataTypes.CHAR(2),
      allowNull: true
    },
    millisecond: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    attackTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'live_threat',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "live_threat_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
