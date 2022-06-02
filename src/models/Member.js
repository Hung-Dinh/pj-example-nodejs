const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Member', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    FirstName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    LastName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Password: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Part: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Position: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TagName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Date_Entry_Work: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Date_Off_Work: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Telephone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Address: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Url_Image: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Role_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Member',
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
