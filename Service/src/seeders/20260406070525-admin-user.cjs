"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await queryInterface.bulkInsert("Users", [
      {
        name: "Super Admin",
        email: "admin@chatbot.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const users = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE email='admin@chatbot.com';`,
      { type: Sequelize.QueryTypes.SELECT },
    );

    const adminUserId = users[0].id;

    const roles = await queryInterface.sequelize.query(
      `SELECT id FROM Roles WHERE roleName='admin';`,
      { type: Sequelize.QueryTypes.SELECT },
    );

    const adminRoleId = roles[0].id;

    await queryInterface.bulkInsert("UserRoles", [
      {
        userId: adminUserId,
        roleId: adminRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserRoles", null, {});
    await queryInterface.bulkDelete("Users", {
      email: "admin@chatbot.com",
    });
  },
};
