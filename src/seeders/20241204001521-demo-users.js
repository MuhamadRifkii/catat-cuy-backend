"use strict";

const passwordUtil = require("../utils/password.util");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        name: "Muhamad Rifqi",
        email: "a@b.c",
        password: "789123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "789123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Doe",
        email: "janedoe@example.com",
        password: "789123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const user of users) {
      const encryptedPassword = await passwordUtil.encrypt(user.password);
      user.password = encryptedPassword;
    }

    await queryInterface.bulkInsert("users", users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
