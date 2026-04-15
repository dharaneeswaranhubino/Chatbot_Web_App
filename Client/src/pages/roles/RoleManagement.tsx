import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  fetchRoles,
  createRole,
  deleteRole,
  clearError,
} from "../../features/role/roleSlice";
import {
  fetchPermissions,
  fetchRolePermissions,
  assignPermissionToRole,
  removePermissionFromRole,
} from "../../features/permission/permissionSlice";
import type { Role } from "../../features/role/roleTypes";
import SuccessMessage from "../../components/role/SuccessMessage";
import ErrorMessage from "../../components/role/ErrorMessage";
import RoleList from "../../components/role/RoleList";
import PermissionList from "../../components/role/PermissionList";
import CreateRoleModal from "../../components/role/CreateRoleModal";

const RoleManagement = () => {
  const dispatch = useAppDispatch();
  const {
    roles,
    loading: rolesLoading,
    error: rolesError,
  } = useAppSelector((state) => state.role);
  const {
    permissions,
    loading: permissionsLoading,
    rolePermissions,
  } = useAppSelector((state) => state.permission);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [success, setSuccess] = useState("");

  const selectedPermissions = selectedRole
    ? rolePermissions[selectedRole.id] || []
    : [];

  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchPermissions());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (rolesError) {
      const timer = setTimeout(() => dispatch(clearError()), 5000);
      return () => clearTimeout(timer);
    }
  }, [rolesError, dispatch]);

  useEffect(() => {
    if (selectedRole && !rolePermissions[selectedRole.id]) {
      dispatch(fetchRolePermissions(selectedRole.id));
    }
  }, [selectedRole, rolePermissions, dispatch]);

  const handleCreateRole = async (roleName: string) => {
    try {
      await dispatch(createRole({ roleName })).unwrap();
      setSuccess(`Role "${roleName}" created successfully`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteRole = async (roleId: number, roleName: string) => {
    if (roleName === "admin") {
      return;
    }

    if (window.confirm(`Are you sure you want to delete role "${roleName}"?`)) {
      try {
        await dispatch(deleteRole(roleId)).unwrap();
        setSuccess(`Role "${roleName}" deleted successfully`);
        if (selectedRole?.id === roleId) {
          setSelectedRole(null);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handlePermissionToggle = async (permissionName: string) => {
    if (!selectedRole) return;

    const isCurrentlySelected = selectedPermissions.includes(permissionName);

    try {
      if (isCurrentlySelected) {
        await dispatch(
          removePermissionFromRole({
            roleId: selectedRole.id,
            permissionName,
          }),
        ).unwrap();
        setSuccess(`Permission "${permissionName}" removed from role`);
      } else {
        await dispatch(
          assignPermissionToRole({
            roleId: selectedRole.id,
            permissionName,
          }),
        ).unwrap();
        setSuccess(`Permission "${permissionName}" assigned to role`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Role Management</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
        >
          <i className="fa-solid fa-plus"></i> Create New Role
        </button>
      </div>

      <SuccessMessage message={success} />
      <ErrorMessage error={rolesError} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RoleList
          roles={roles}
          loading={rolesLoading}
          selectedRole={selectedRole}
          onRoleClick={setSelectedRole}
          onDeleteRole={handleDeleteRole}
        />

        <PermissionList
          permissions={permissions}
          selectedRoleName={selectedRole?.roleName || null}
          selectedPermissions={selectedPermissions}
          loading={permissionsLoading}
          onPermissionToggle={handlePermissionToggle}
        />
      </div>

      <CreateRoleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateRole={handleCreateRole}
      />
    </div>
  );
};

export default RoleManagement;
