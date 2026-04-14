interface ProfileViewProps {
  user: {
    id: number;
    name: string;
    email: string;
    roles: string[];
  };
}

const ProfileView = ({ user }: ProfileViewProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Full Name
          </label>
          <div className="bg-gray-50 rounded-lg px-4 py-2 text-gray-800">
            {user.name}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <div className="bg-gray-50 rounded-lg px-4 py-2 text-gray-800">
            {user.email}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            User ID
          </label>
          <div className="bg-gray-50 rounded-lg px-4 py-2 text-gray-800">
            #{user.id}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Roles
          </label>
          <div className="bg-gray-50 rounded-lg px-4 py-2 text-gray-800">
            {user.roles?.join(", ") || "No roles assigned"}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-800">
          You can edit your name, email, and password. Contact admin if you need to change your roles.
        </p>
      </div>
    </>
  );
};

export default ProfileView;