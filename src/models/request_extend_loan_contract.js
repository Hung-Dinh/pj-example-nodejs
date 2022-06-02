const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('request_extend_loan_contract', {
    Customer_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'customer',
        key: 'ID'
      }
    },
    Loan_Contract_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'loan_contract',
        key: 'ID'
      }
    },
    Request_Time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Confirm_Time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'request_extend_loan_contract',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Customer_ID" },
          { name: "Loan_Contract_ID" },
        ]
      },
      {
        name: "fk_request_extend_loan_contract_2_idx",
        using: "BTREE",
        fields: [
          { name: "Loan_Contract_ID" },
        ]
      },
    ]
  });
};
