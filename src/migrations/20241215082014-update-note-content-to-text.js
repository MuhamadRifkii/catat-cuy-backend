"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("notes", "content", {
      type: Sequelize.TEXT,
      allowNull: true, // Adjust this if the column is required
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("notes", "content", {
      type: Sequelize.STRING,
      allowNull: true, // Adjust this to match the original definition
    });
  },
};
