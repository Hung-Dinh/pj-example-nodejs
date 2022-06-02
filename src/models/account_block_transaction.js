const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account_block_transaction', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Account_Block_Type_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account_block_type',
        key: 'ID'
      }
    },
    Account_Block_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account_block',
        key: 'ID'
      }
    },
    StatusID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Amount_Block_Change: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Transaction_Content: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Transaction_Date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'account_block_transaction',
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
        name: "fk_ACCOUNT_BLOCK_TRANSACTION_ACCOUNT_BLOCK_TYPE1_idx",
        using: "BTREE",
        fields: [
          { name: "Account_Block_Type_ID" },
        ]
      },
      {
        name: "fk_ACCOUNT_BLOCK_TRANSACTION_ACCOUNT_BLOCK1_idx",
        using: "BTREE",
        fields: [
          { name: "Account_Block_ID" },
        ]
      },
    ]
  });
};
