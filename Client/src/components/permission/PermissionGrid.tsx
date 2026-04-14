import type { Permission } from "../../features/permission/permissionTypes";
import PermissionCard from "./PermissionCard";
import LoadingSpinner from "../common/LoadingSpinner";

interface PermissionGridProps {
  permissions: Permission[];
  loading: boolean;
}

const PermissionGrid = ({ permissions, loading }: PermissionGridProps) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (permissions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <p className="text-gray-500">No permissions found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {permissions.map((permission) => (
        <PermissionCard key={permission.id} permission={permission} />
      ))}
    </div>
  );
};

export default PermissionGrid;