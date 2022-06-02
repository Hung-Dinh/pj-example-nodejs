const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('indentity_document', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'customer',
        key: 'ID'
      }
    },
    Identity_Document_Type_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'indentity_document_type',
        key: 'ID'
      }
    },
    IdentityNumber: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    IdentityNumber_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    IdentityNumber_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    DateOfIssue: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    DateOfIssue_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DateOfIssue_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    DateOfExpiry: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    DateOfExpiry_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DateOfExpiry_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    PlaceOfIssue: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    PlaceOfIssue_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PlaceOfIssue_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    FrontalImage: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    FrontalImage_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    FrontalImage_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    BackImage: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    BackImage_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    BackImage_Decline_Reason: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    SelfieWithDocument: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    SelfieWithDocument_Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SelfieWithDocument_Decline_Reason: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Descriptions: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Date_Updated: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'indentity_document',
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
        name: "indentity_type",
        using: "BTREE",
        fields: [
          { name: "Identity_Document_Type_ID" },
        ]
      },
    ]
  });
};
