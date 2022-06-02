const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('loan_rate_fee_monitoring', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Percentage: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Total: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    LOAN_CONTRACT_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'loan_contract',
        key: 'ID'
      }
    }
  }, {
    sequelize,
    tableName: 'loan_rate_fee_monitoring',
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
        name: "fk_LOAN_RATE_FEE_MONITORING_LOAN_CONTRACT1_idx",
        using: "BTREE",
        fields: [
          { name: "LOAN_CONTRACT_ID" },
        ]
      },
    ]
  });
};
