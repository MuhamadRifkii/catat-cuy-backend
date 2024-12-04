"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        nama: "John Doe",
        email: "johndoe@example.com",
        password: "789123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Jane Doe",
        email: "janedoe@example.com",
        password: "789123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
