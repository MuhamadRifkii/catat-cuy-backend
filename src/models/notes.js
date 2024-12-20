"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class notes extends Model {
    static associate(models) {
    }
  }
  notes.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      isPinned: DataTypes.BOOLEAN,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "notes",
    }
  );
  return notes;
};
