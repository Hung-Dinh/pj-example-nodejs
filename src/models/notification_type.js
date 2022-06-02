const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notification_type', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Notification_Type_Name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Content: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Content_SMS: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Descriptions: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'notification_type',
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
    ]
  });
};
