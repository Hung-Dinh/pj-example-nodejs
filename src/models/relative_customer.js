const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('relative_customer', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    First_Name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    First_Name_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    First_Name_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Last_Name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Last_Name_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Last_Name_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    PhoneNumber: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    PhoneNumber_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PhoneNumber_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Address: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Address_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Address_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Descriptions: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Date_Updated: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'relative_customer',
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
