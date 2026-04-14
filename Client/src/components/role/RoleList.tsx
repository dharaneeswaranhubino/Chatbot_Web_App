import type { Role } from "../../features/role/roleTypes";
import LoadingSpinner from "../common/LoadingSpinner";

interface RoleListProps {
  roles: Role[];
  loading: boolean;
  selectedRole: Role | null;
  onRoleClick: (role: Role) => void;
  onDeleteRole: (roleId: number, roleName: string) => void;
}

const RoleList = ({ roles, loading, selectedRole, onRoleClick, onDeleteRole }: RoleListProps) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800">Roles</h3>
        <p className="text-xs text-gray-500 mt-1">Click on a role to manage its permissions</p>
      </div>
      <div className="divide-y max-h-[500px] overflow-y-auto">
        {roles.map((role) => (
          <div
            key={role.id}
            className={`px-6 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition ${
              selectedRole?.id === role.id ? "bg-violet-50 border-l-4 border-violet-600" : ""
            }`}
            onClick={() => onRoleClick(role)}
          >
            <div>
              <p className="font-medium text-gray-800">
                {role.roleName.charAt(0).toUpperCase() + role.roleName.slice(1)}
              </p>
              <p className="text-xs text-gray-500 mt-1">ID: {role.id}</p>
            </div>
            {role.roleName !== "admin" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteRole(role.id, role.roleName);
                }}
                className="text-red-500 hover:text-red-700 transition p-1"
              >
                <i className="fas fa-trash"></i>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleList;