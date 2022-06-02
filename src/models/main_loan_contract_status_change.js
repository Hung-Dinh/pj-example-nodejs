const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('main_loan_contract_status_change', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Main_Loan_Contract_Status_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'main_loan_contract_status',
        key: 'ID'
      }
    },
    Main_Contract_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'main_loan_contract',
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
    tableName: 'main_loan_contract_status_change',
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
        name: "main_loan_idx",
        using: "BTREE",
        fields: [
          { name: "Main_Contract_ID" },
        ]
      },
      {
        name: "main_status_idx",
        using: "BTREE",
        fields: [
          { name: "Main_Loan_Contract_Status_ID" },
        ]
      },
    ]
  });
};
