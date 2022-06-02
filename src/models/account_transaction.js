const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account_transaction', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Transaction_Code: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Account_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'account',
        key: 'ID'
      }
    },
    Account_Status_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'account_status',
        key: 'ID'
      }
    },
    Amount: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    Transation_Type_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'account_transaction_type',
        key: 'ID'
      }
    },
    Transaction_Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    FromAccount_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'account',
        key: 'ID'
      }
    },
    ToAccount_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'account',
        key: 'ID'
      }
    },
    Transaction_Status_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Transaction_Content: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Descriptions: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'account_transaction',
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
        name: "account_accountID",
        using: "BTREE",
        fields: [
          { name: "Account_ID" },
        ]
      },
      {
        name: "account_FromAccountID",
        using: "BTREE",
        fields: [
          { name: "FromAccount_ID" },
        ]
      },
      {
        name: "account_ToAccountID",
        using: "BTREE",
        fields: [
          { name: "ToAccount_ID" },
        ]
      },
      {
        name: "account_trans_type_idx",
        using: "BTREE",
        fields: [
          { name: "Transation_Type_ID" },
        ]
      },
      {
        name: "fk_ACCOUNT_TRANSACTION_ACCOUNT_STATUS1_idx",
        using: "BTREE",
        fields: [
          { name: "Account_Status_ID" },
        ]
      },
    ]
  });
};
