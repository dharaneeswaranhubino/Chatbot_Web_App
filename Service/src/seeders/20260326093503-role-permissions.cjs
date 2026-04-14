"use strict";

module.exports = {
  async up(queryInterface) {
    const permissions = await queryInterface.sequelize.query(
      `SELECT id, name FROM Permissions`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const roles = await queryInterface.sequelize.query(
      `SELECT id, roleName FROM Roles`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const pId = (name) => permissions.find((p) => p.name === name)?.id;
    const rId = (name) => roles.find((r) => r.roleName === name)?.id;

    const rolePermissionMap = [
      {
        role: "admin",
        permissions: [
          "view:user", "create:user", "edit:user", "delete:user",
          "view:role", "create:role", "edit:role", "delete:role",
          "assign:role", "approve:leave",
        ],
      },
      {
        role: "manager",
        permissions: [
          "view:user", "create:user", "edit:user",
          "view:role", "assign:role",
        ],
      },
      {
        role: "employee",
        permissions: ["view:user", "view:role"],
      },
      {
        role: "user",
        permissions: ["view:user"],
      },
    ];

    const rows = [];
    for (const entry of rolePermissionMap) {
      for (const permName of entry.permissions) {
        rows.push({
          roleId: rId(entry.role),
          permissionId: pId(permName),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert("RolePermissions", rows);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("RolePermissions", null, {});
  },
};
