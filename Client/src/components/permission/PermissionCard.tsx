import type { Permission } from "../../features/permission/permissionTypes";

interface PermissionCardProps {
  permission: Permission;
}

const PermissionCard = ({ permission }: PermissionCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="font-mono text-sm font-semibold text-violet-700">
            {permission.name}
          </p>
          {permission.description && (
            <p className="text-xs text-gray-500 mt-1">{permission.description}</p>
          )}
          <p className="text-xs text-gray-400 mt-2">ID: {permission.id}</p>
        </div>
        <div className="ml-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        </div>
      </div>
    </div>
  );
};

export default PermissionCard;