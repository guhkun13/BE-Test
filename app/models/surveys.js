const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('surveys', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    values: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'surveys',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "surveys_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
