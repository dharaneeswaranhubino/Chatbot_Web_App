import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchPermissions, clearError } from "../../features/permission/permissionSlice";
import PermissionHeader from "../../components/permission/PermissionHeader";
import ErrorMessage from "../../components/permission/ErrorMessage";
import PermissionSearch from "../../components/permission/PermissionSearch";
import PermissionGrid from "../../components/permission/PermissionGrid";
// import PermissionInfo from "../../components/permission/PermissionInfo";

const PermissionManagement = () => {
  const dispatch = useAppDispatch();
  const { permissions, loading, error } = useAppSelector((state) => state.permission);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearError()), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Group permissions by category (before colon)
  const groupedPermissions = permissions.reduce((acc, permission) => {
    const category = permission.name.split(":")[0];
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(permission);
    return acc;
  }, {} as Record<string, typeof permissions>);

  const categories = Object.keys(groupedPermissions);

  const filteredPermissions = searchTerm
    ? permissions.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : selectedCategory === "all"
    ? permissions
    : groupedPermissions[selectedCategory] || [];

  return (
    <div className="space-y-6">
      <PermissionHeader totalPermissions={permissions.length} />
      
      <ErrorMessage error={error} />

      <PermissionSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <PermissionGrid permissions={filteredPermissions} loading={loading} />

      {/* <PermissionInfo /> */}
    </div>
  );
};

export default PermissionManagement;