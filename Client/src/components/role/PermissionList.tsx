import type { Permission } from "../../features/permission/permissionTypes";

interface PermissionListProps {
  permissions: Permission[];
  selectedRoleName: string | null;
  selectedPermissions: string[];
  loading: boolean;
  onPermissionToggle: (permissionName: string) => void;
}

const PermissionList = ({
  permissions,
  selectedRoleName,
  selectedPermissions,
  loading,
  onPermissionToggle,
}: PermissionListProps) => {
  if (!selectedRoleName) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800">Select a role</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-center py-8">
            Click on a role from the list to manage its permissions
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800">
          Permissions for {selectedRoleName}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Check/uncheck permissions to assign or remove
        </p>
      </div>
      <div className="p-6 max-h-[500px] overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {permissions.map((permission) => (
              <label
                key={permission.id}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition"
              >
                <input
                  type="checkbox"
                  checked={selectedPermissions.includes(permission.name)}
                  onChange={() => onPermissionToggle(permission.name)}
                  className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {permission.name}
                  </p>
                  {permission.description && (
                    <p className="text-xs text-gray-500">
                      {permission.description}
                    </p>
                  )}
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionList;
