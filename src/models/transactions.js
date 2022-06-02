const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactions', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Transaction_Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Transaction_Content: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Transaction_Type_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Transaction_Status_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Descriptions: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'transactions',
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
