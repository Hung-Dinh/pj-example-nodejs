const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment_schedule', {
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
    Main_Loan_Contract_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'main_loan_contract',
        key: 'ID'
      }
    },
    Amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    
    Payment_Date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Actual_Payment_Date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Main_Loan_Contract_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'main_loan_contract',
        key: 'ID'
      }
    },
    Amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Description: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'payment_schedule',
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
        name: "f_contract_schedule",
        using: "BTREE",
        fields: [
          { name: "Loan_Contract_ID" },
        ]
      },
      {
        name: "fk_payment_schedule_2_idx",
        using: "BTREE",
        fields: [
          { name: "Main_Loan_Contract_ID" },
        ]
      },
    ]
  });
};
