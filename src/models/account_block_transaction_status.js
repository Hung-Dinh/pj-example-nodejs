const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account_block_transaction_status', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Sub_Account_Status_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sub_account_transaction_status',
        key: 'ID'
      }
    },
    Account_Block_Transaction_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account_block_transaction',
        key: 'ID'
      }
    },
    Transaction_Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Description: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'account_block_transaction_status',
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
        name: "fk_ACCOUNT_BLOCK_TRANSACTION_STATUS_SUB_ACCOUNT_TRANSACTION_idx",
        using: "BTREE",
        fields: [
          { name: "Sub_Account_Status_ID" },
        ]
      },
      {
        name: "fk_ACCOUNT_BLOCK_TRANSACTION_STATUS_ACCOUNT_BLOCK_TRANSACTI_idx",
        using: "BTREE",
        fields: [
          { name: "Account_Block_Transaction_ID" },
        ]
      },
    ]
  });
};
