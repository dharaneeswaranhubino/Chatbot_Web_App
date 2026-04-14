interface PermissionHeaderProps {
  totalPermissions: number;
}

const PermissionHeader = ({ totalPermissions }: PermissionHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-800">Permissions</h2>
      {/* <h2 className="text-2xl font-bold text-gray-800">Permission Management</h2> */}
      <div className="text-sm text-gray-500">
        Total Permissions: {totalPermissions}
      </div>
    </div>
  );
};

export default PermissionHeader;