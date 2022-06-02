const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account_investment_transaction', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Account_Investment_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account_investment',
        key: 'ID'
      }
    },
    Amount_Investment_Change: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Transaction_Content: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'account_investment_transaction',
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
        name: "fk_ACCOUNT_INVESTMENT_TRANSACTION_ACCOUNT_INVESTMENT1_idx",
        using: "BTREE",
        fields: [
          { name: "Account_Investment_ID" },
        ]
      },
    ]
  });
};
