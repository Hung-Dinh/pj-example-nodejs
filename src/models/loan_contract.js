const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('loan_contract', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Loan_Contract_Status_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Main_Loan_Contract_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'main_loan_contract',
        key: 'ID'
      }
    },
    Contract_Number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Contract_Type_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'loan_contract_type',
        key: 'ID'
      }
    },
    Lender_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'customer',
        key: 'ID'
      }
    },
    Borrower_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customer',
        key: 'ID'
      }
    },
    Amount: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    Contract_Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Loan_Term_Method_Payment_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'loan_term_method_payment',
        key: 'ID'
      }
    },
    Loan_Rate: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Loan_Fee: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Loan_Rate_EarlyPay: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Loan_Fee_EarlyPay: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Payment_Due_Date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Request_Investment_Auto_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'request_investment_auto',
        key: 'ID'
      }
    },
    Descriptions: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'loan_contract',
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
        name: "Contract_Type",
        using: "BTREE",
        fields: [
          { name: "Contract_Type_ID" },
        ]
      },
      {
        name: "Main_Loan_Contract",
        using: "BTREE",
        fields: [
          { name: "Main_Loan_Contract_ID" },
        ]
      },
      {
        name: "Lender",
        using: "BTREE",
        fields: [
          { name: "Lender_ID" },
        ]
      },
      {
        name: "Borrower",
        using: "BTREE",
        fields: [
          { name: "Borrower_ID" },
        ]
      },
      {
        name: "Loan_Term_Method_Payment",
        using: "BTREE",
        fields: [
          { name: "Loan_Term_Method_Payment_ID" },
        ]
      },
      {
        name: "fk_LOAN_CONTRACT_Request_Investment_Auto1_idx",
        using: "BTREE",
        fields: [
          { name: "Request_Investment_Auto_ID" },
        ]
      },
    ]
  });
};
