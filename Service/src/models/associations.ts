import { User } from "./userModel.js";
import { Role } from "./roleModel.js";
import { UserRole } from "./userRoleModel.js";
import { Permission } from "./permissionModel.js";
import { RolePermission } from "./rolePermissionModel.js";
import { ChatMessage } from "./chatMessageModel.js";

export const setupAssociations = () => {
  // User <-> Role
  User.belongsToMany(Role, {
    through: UserRole,
    foreignKey: "userId",
    otherKey: "roleId",
  });
  Role.belongsToMany(User, {
    through: UserRole,
    foreignKey: "roleId",
    otherKey: "userId",
  });

  //   So your statement rewritten correctly:

  // Without belongsTo(User)
  // → The assignment only knows the userId.
  //   UserRole → userId = 1
  // (Just number)

  // With belongsTo(User)
  // → The assignment can access the full user row (name, id, email, etc.).
  //   UserRole → User = { id:1, name:"Arun", email:"..." }
  // (Full object)
  UserRole.belongsTo(Role, { foreignKey: "roleId" });
  UserRole.belongsTo(User, { foreignKey: "userId" });
  Role.hasMany(UserRole, { foreignKey: "roleId" });
  User.hasMany(UserRole, { foreignKey: "userId" });

  // Role <-> Permission
  Role.belongsToMany(Permission, {
    through: RolePermission,
    foreignKey: "roleId",
    otherKey: "permissionId",
  });
  Permission.belongsToMany(Role, {
    through: RolePermission,
    foreignKey: "permissionId",
    otherKey: "roleId",
  });
  RolePermission.belongsTo(Role, { foreignKey: "roleId" });
  RolePermission.belongsTo(Permission, { foreignKey: "permissionId" });
  Role.hasMany(RolePermission, { foreignKey: "roleId" });
  Permission.hasMany(RolePermission, { foreignKey: "permissionId" });

  User.hasMany(ChatMessage, { foreignKey: "userId" });
  ChatMessage.belongsTo(User, { foreignKey: "userId" });
};
