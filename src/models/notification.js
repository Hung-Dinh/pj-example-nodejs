const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notification', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Notification_Type_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'notification_type',
        key: 'ID'
      }
    },
    To_User_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Notification_Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Notification_Status_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'notification_status',
        key: 'ID'
      }
    },
    Notification_Content: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'notification',
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
        name: "Notification_Type",
        using: "BTREE",
        fields: [
          { name: "Notification_Type_ID" },
        ]
      },
      {
        name: "Notification_Status",
        using: "BTREE",
        fields: [
          { name: "Notification_Status_ID" },
        ]
      },
    ]
  });
};
