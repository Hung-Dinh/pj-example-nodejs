const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account_bank', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'customer',
        key: 'ID'
      }
    },
    Account_Number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Account_Number_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Account_Number_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    ATM_Number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ATM_Number_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ATM_Number_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Bank_Name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Bank_Name_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Bank_Name_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Department_Name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Department_Name_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Department_Name_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    OwnerName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    OwnerName_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    OwnerName_Decline_Reason: {
      type: DataTypes.STRING(45),
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
    tableName: 'account_bank',
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
