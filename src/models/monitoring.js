const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('monitoring', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TableName: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    ContentOfChange: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    DateOfChange: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'ID'
      }
    },
    Descriptions: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'monitoring',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "Users_Monitoring",
        using: "BTREE",
        fields: [
          { name: "UserID" },
        ]
      },
    ]
  });
};
