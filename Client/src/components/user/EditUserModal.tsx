import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  updateUser,
  assignRole,
  removeRole,
  fetchUsers,
} from "../../features/user/userSlice";
import { fetchRoles } from "../../features/role/roleSlice";
import type { User, UpdateUserData } from "../../features/user/userTypes";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const EditUserModal = ({ isOpen, onClose, user }: EditUserModalProps) => {
  const dispatch = useAppDispatch();
  const { roles, loading: rolesLoading } = useAppSelector(
    (state) => state.role,
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && roles.length === 0) {
      dispatch(fetchRoles());
    }
  }, [isOpen, dispatch, roles.length]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
      });
      setSelectedRoles([...user.role]);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleToggle = (roleName: string) => {
    setSelectedRoles((prev) =>
      prev.includes(roleName)
        ? prev.filter((r) => r !== roleName)
        : [...prev, roleName],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Update user info if changed
      if (
        formData.name !== user?.name ||
        formData.email !== user?.email ||
        formData.password
      ) {
        const updateData: UpdateUserData = { id: user!.id };
        if (formData.name !== user?.name) updateData.name = formData.name;
        if (formData.email !== user?.email) updateData.email = formData.email;
        if (formData.password) updateData.password = formData.password;

        await dispatch(updateUser(updateData)).unwrap(); //.unwrap() new learning = it directly handle the Promise result
      }

      // Get current roles and new roles
      const currentRoles = user?.role || [];
      const rolesToAdd = selectedRoles.filter(
        (role) => !currentRoles.includes(role),
      );
      const rolesToRemove = currentRoles.filter(
        (role) => !selectedRoles.includes(role),
      );

      // Add new roles
      for (const roleName of rolesToAdd) {
        await dispatch(assignRole({ userId: user!.id, roleName })).unwrap();
      }

      // Remove roles
      for (const roleName of rolesToRemove) {
        await dispatch(removeRole({ userId: user!.id, roleName })).unwrap();
      }

      // Refresh user list
      await dispatch(fetchUsers());
      onClose();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update user";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Edit User</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="New password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Roles
                </label>
                {rolesLoading ? (
                  <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-violet-600"></div>
                    <span className="text-sm text-gray-500">
                      Loading roles...
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2 border border-gray-300 rounded-lg p-3">
                    {roles.map((role) => (
                      <label
                        key={role.id}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={selectedRoles.includes(role.roleName)}
                          onChange={() => handleRoleToggle(role.roleName)}
                          className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                        />
                        <span className="text-sm text-gray-700">
                          {role.roleName.charAt(0).toUpperCase() +
                            role.roleName.slice(1)}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Check/uncheck roles to add or remove
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || rolesLoading}
                className="flex-1 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
