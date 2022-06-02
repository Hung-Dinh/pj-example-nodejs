const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('otp', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Otp_Type_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'otp_type',
        key: 'ID'
      }
    },
    Otp_Code: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    Otp_Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    From_Tel: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    To_Tel: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    Descriptions: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Time_Limit: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'otp',
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
        name: "Otp_Type",
        using: "BTREE",
        fields: [
          { name: "Otp_Type_ID" },
        ]
      },
    ]
  });
};
