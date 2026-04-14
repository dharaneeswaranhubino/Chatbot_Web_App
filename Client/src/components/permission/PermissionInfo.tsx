const PermissionInfo = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h4 className="text-sm font-semibold text-blue-800 mb-2">About Permissions</h4>
      <p className="text-xs text-blue-700">
        Permissions are assigned to roles. Users inherit permissions from their assigned roles.
        Format: <code className="bg-blue-100 px-1 rounded">action:resource</code> (e.g., create:user, view:role)
      </p>
    </div>
  );
};

export default PermissionInfo;