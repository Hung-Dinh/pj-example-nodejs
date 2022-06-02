const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('relative_relation', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Customer_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'customer',
        key: 'ID'
      }
    },
    Relative_Customer_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'relative_customer',
        key: 'ID'
      }
    },
    Relationship_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'relationship',
        key: 'ID'
      }
    },
    Descriptions: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'relative_relation',
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
        name: "cus_relative",
        using: "BTREE",
        fields: [
          { name: "Customer_ID" },
        ]
      },
      {
        name: "relative",
        using: "BTREE",
        fields: [
          { name: "Relative_Customer_ID" },
        ]
      },
      {
        name: "relationship",
        using: "BTREE",
        fields: [
          { name: "Relationship_ID" },
        ]
      },
    ]
  });
};
