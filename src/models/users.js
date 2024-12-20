"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {}
  }
  users.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      otp: DataTypes.STRING,
      otpExpire: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
