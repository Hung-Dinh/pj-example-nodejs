const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account_loan_transaction', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Account_Loan_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account_loan',
        key: 'ID'
      }
    },
    Amount_Loan_Change: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    Transaction_Content: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'account_loan_transaction',
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
        name: "fk_ACCOUNT_LOAN_TRANSACTION_ACCOUNT_LOAN1_idx",
        using: "BTREE",
        fields: [
          { name: "Account_Loan_ID" },
        ]
      },
    ]
  });
};
