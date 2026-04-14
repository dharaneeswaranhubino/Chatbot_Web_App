"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Permissions", [
      {
        name: "view:user",
        description: "View all users",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "create:user",
        description: "Create a user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "edit:user",
        description: "Edit a user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "delete:user",
        description: "Delete a user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "view:role",
        description: "View all roles",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "create:role",
        description: "Create a role",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "edit:role",
        description: "Edit a role",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "delete:role",
        description: "Delete a role",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "assign:role",
        description: "Assign role to user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "approve:leave",
        description: "Approve leave requests",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Permissions", null, {});
  },
};
