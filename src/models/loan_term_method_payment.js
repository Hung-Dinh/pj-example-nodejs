const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('loan_term_method_payment', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Method_Payment_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'method_payment',
        key: 'ID'
      }
    },
    Loan_Term_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'loan_term',
        key: 'ID'
      }
    },
    Loan_Rate_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'loan_rate',
        key: 'ID'
      }
    },
    Loan_Fee_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'loan_fee',
        key: 'ID'
      }
    },
    Descriptions: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'loan_term_method_payment',
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
        name: "Method_Payment",
        using: "BTREE",
        fields: [
          { name: "Method_Payment_ID" },
        ]
      },
      {
        name: "Loan_Term",
        using: "BTREE",
        fields: [
          { name: "Loan_Term_ID" },
        ]
      },
      {
        name: "Loan_Rate",
        using: "BTREE",
        fields: [
          { name: "Loan_Rate_ID" },
        ]
      },
      {
        name: "Loan_Fee",
        using: "BTREE",
        fields: [
          { name: "Loan_Fee_ID" },
        ]
      },
    ]
  });
};
