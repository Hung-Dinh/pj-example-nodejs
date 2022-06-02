const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account_trannsaction_status', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Transaction_Status_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'transaction_status',
        key: 'ID'
      }
    },
    Account_Transaction_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account_transaction',
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
    tableName: 'account_trannsaction_status',
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
        name: "fk_ACCOUNT_TRANNSACTION_STATUS_TRANSACTION_STATUS1_idx",
        using: "BTREE",
        fields: [
          { name: "Transaction_Status_ID" },
        ]
      },
      {
        name: "fk_ACCOUNT_TRANNSACTION_STATUS_ACCOUNT_TRANSACTION1_idx",
        using: "BTREE",
        fields: [
          { name: "Account_Transaction_ID" },
        ]
      },
    ]
  });
};
