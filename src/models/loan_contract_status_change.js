const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('loan_contract_status_change', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Loan_Contract_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'loan_contract',
        key: 'ID'
      }
    },
    Loan_Contract_Status_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'loan_contract_status',
        key: 'ID'
      }
    },
    Status_Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Description: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'loan_contract_status_change',
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
        name: "loanContract_idx",
        using: "BTREE",
        fields: [
          { name: "Loan_Contract_ID" },
        ]
      },
      {
        name: "fk_LOAN_CONTRACT_STATUS_CHANGE_LOAN_CONTRACT_STATUS1_idx",
        using: "BTREE",
        fields: [
          { name: "Loan_Contract_Status_ID" },
        ]
      },
    ]
  });
};
