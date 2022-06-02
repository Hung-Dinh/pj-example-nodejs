const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    First_Name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    First_Name_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    First_Name_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Last_Name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Last_Name_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Last_Name_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    DateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    DateOfBirth_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DateOfBirth_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    PlaceOfBirth: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PlaceOfBirth_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PlaceOfBirth_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    PermanentResidence: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    PermanentResidence_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PermanentResidence_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Address: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Address_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Address_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    PhoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    PhoneNumber_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PhoneNumber_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Descriptions: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    Url_Facebook: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Url_Facebook_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Url_Facebook_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Contact_Often: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Contact_Often_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Contact_Often_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Sex: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    Sex_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Sex_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Avatar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Avatar_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Avatar_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Url_Video: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Url_Video_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Url_Video_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Date_Updated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'customer',
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
