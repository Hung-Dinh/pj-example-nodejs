const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account_loan_limitation_transaction', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Account_Loan_Limitation_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account_loan_limitation',
        key: 'ID'
      }
    },
    Account_Loan_Limitation_Type_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account_loan_limitation_type',
        key: 'ID'
      }
    },
    Account_Loan_Limitation_Status_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account_loan_limitation_transaction_status',
        key: 'ID'
      }
    },
    Transaction_Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Amount_Limitation_Change: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Customer_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Transaction_Content: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'account_loan_limitation_transaction',
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
        name: "fk_ACCOUNT_LOAN_LIMITATION_TRANSACTION_ACCOUNT_LOAN_LIMITAT_idx",
        using: "BTREE",
        fields: [
          { name: "Account_Loan_Limitation_Type_ID" },
        ]
      },
      {
        name: "fk_ACCOUNT_LOAN_LIMITATION_TRANSACTION_ACCOUNT_LOAN_LIMITAT_idx1",
        using: "BTREE",
        fields: [
          { name: "Account_Loan_Limitation_Status_ID" },
        ]
      },
      {
        name: "fk_ACCOUNT_LOAN_LIMITATION_TRANSACTION_ACCOUNT_LOAN_LIMITAT_idx2",
        using: "BTREE",
        fields: [
          { name: "Account_Loan_Limitation_ID" },
        ]
      },
    ]
  });
};
