const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('main_loan_contract', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Main_Loan_Status_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Contract_Number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Borrower_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customer',
        key: 'ID'
      }
    },
    Contract_Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Amount: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    Loan_Term_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'loan_term',
        key: 'ID'
      }
    },
    Loan_Objective_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'loan_objective',
        key: 'ID'
      }
    },
    Method_Payment_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'method_payment',
        key: 'ID'
      }
    },
    Deadline_Disbursement_Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Disbursement_Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Descriptions: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    Payment_Due_Date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'main_loan_contract',
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
        name: "Loan_Terms",
        using: "BTREE",
        fields: [
          { name: "Loan_Term_ID" },
        ]
      },
      {
        name: "Loan_Objective",
        using: "BTREE",
        fields: [
          { name: "Loan_Objective_ID" },
        ]
      },
      {
        name: "Customer",
        using: "BTREE",
        fields: [
          { name: "Borrower_ID" },
        ]
      },
      {
        name: "f_method_payment_idx",
        using: "BTREE",
        fields: [
          { name: "Method_Payment_ID" },
        ]
      },
    ]
  });
};
