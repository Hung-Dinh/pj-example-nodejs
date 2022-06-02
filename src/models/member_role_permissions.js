const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member_role_permissions', {
    Role_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Permissions_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'member_role_permissions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Role_ID" },
          { name: "Permissions_ID" },
        ]
      },
    ]
  });
};
