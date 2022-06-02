const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('request_investment_auto_change_status', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Status_Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Description: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Request_Investment_Auto_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'request_investment_auto',
        key: 'ID'
      }
    },
    Request_Investment_Auto_Status_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'request_investment_auto_status',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'request_investment_auto_change_status',
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
        name: "fk_Request_Investment_Auto_Change_Status_Request_Investment_idx",
        using: "BTREE",
        fields: [
          { name: "Request_Investment_Auto_ID" },
        ]
      },
      {
        name: "fk_Request_Investment_Auto_Change_Status_Request_Investment_idx1",
        using: "BTREE",
        fields: [
          { name: "Request_Investment_Auto_Status_ID" },
        ]
      },
    ]
  });
};
