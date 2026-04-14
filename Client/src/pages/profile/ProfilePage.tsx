import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { updateUser } from "../../features/user/userSlice";
import SuccessMessage from "../../components/profile/SuccessMessage";
import ErrorMessage from "../../components/profile/ErrorMessage";
import ProfileForm from "../../components/profile/ProfileForm";
import ProfileView from "../../components/profile/ProfileView";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError("");
    setSuccess("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (formData: {
    name: string;
    email: string;
    password: string;
  }) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const updateData: {
        id: number;
        name?: string;
        email?: string;
        password?: string;
      } = {
        id: user.id,
      };

      if (formData.name !== user.name) updateData.name = formData.name;
      if (formData.email !== user.email) updateData.email = formData.email;
      if (formData.password) updateData.password = formData.password;

      await dispatch(updateUser(updateData)).unwrap();
      setSuccess("Profile updated successfully!");
      setIsEditing(false);

      dispatch({ type: "auth/setUser", payload: { ...user, ...updateData } });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update profile";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-500 to-indigo-600 px-6 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-white">My Profile</h1>
              <p className="text-violet-100 text-sm mt-1">
                Manage your account information
              </p>
            </div>
            {!isEditing && (
              <button
                onClick={handleEdit}
                title="Edit Profile"
                className="px-4 py-2 bg-white text-violet-600 rounded-lg hover:bg-gray-100 transition font-medium text-sm"
              >
                <i className="fa-solid fa-pen-to-square"></i>
                {/* Edit Profile */}
              </button>
            )}
          </div>
        </div>

        <SuccessMessage message={success} />
        <ErrorMessage error={error} />

        <div className="p-6">
          <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-200">
            <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {getInitials(user.name)}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {user.name}
              </h2>
              <p className="text-gray-500">{user.email}</p>
              <div className="flex gap-2 mt-2">
                {user.roles?.map((role, index) => (
                  <span
                    key={index}
                    className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Account Information
            </h3>

            {isEditing ? (
              <ProfileForm
                initialData={{ name: user.name, email: user.email }}
                loading={loading}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            ) : (
              <ProfileView user={user} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
