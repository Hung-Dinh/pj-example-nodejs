const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'customer',
        key: 'ID'
      }
    },
    Status_ID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Account_Number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Amount: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    Amount_Loan: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    Amount_Investment: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    Amount_Block: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    Descriptions: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'account',
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
