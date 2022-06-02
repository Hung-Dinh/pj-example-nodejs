const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('edit_account_bank_system_transaction', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Transation_Type_ID: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    ChangedAmount: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Amount: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Transaction_Date: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Transaction_Content: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    AccountNumber: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    codeTransactionBank: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Bank_Ower: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Descriptions: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'edit_account_bank_system_transaction',
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
