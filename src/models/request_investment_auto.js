const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('request_investment_auto', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Amount: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    Description: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    CUSTOMER_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customer',
        key: 'ID'
      }
    },
    USERS_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'ID'
      }
    },
    Request_code: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Loan_Term_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'loan_term',
        key: 'ID'
      }
    },
    Loan_Rate: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'request_investment_auto',
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
        name: "fk_Request_Investment_Auto_CUSTOMER1_idx",
        using: "BTREE",
        fields: [
          { name: "CUSTOMER_ID" },
        ]
      },
      {
        name: "fk_Request_Investment_Auto_USERS1_idx",
        using: "BTREE",
        fields: [
          { name: "USERS_ID" },
        ]
      },
      {
        name: "f_loan_term_idx",
        using: "BTREE",
        fields: [
          { name: "Loan_Term_ID" },
        ]
      },
    ]
  });
};
