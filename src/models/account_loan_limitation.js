const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account_loan_limitation', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'account',
        key: 'ID'
      }
    },
    Amount_Credit: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    Amount_Debit: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    Amount_Release: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    Status_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Description: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'account_loan_limitation',
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
