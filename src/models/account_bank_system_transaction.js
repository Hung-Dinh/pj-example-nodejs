const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account_bank_system_transaction', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Transation_Type_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account_bank_system_transaction_type',
        key: 'ID'
      }
    },
    ChangedAmount: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    Amount: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    Transaction_Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Transaction_Content: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    AccountNumber: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    codeTransactionBank: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Bank_Ower: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Origin_Messeage: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    Tel: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Status: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Descriptions: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'account_bank_system_transaction',
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
        name: "Transation_Type",
        using: "BTREE",
        fields: [
          { name: "Transation_Type_ID" },
        ]
      },
    ]
  });
};
