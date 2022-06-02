const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account_block', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'account',
        key: 'ID'
      }
    },
    Amount_GetMoney: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    Amount_Wait_Investment: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    Amount_Wait_LoanFromOwn: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'account_block',
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
