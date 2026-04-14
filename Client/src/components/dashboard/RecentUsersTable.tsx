import type { RecentUser } from "../../features/dashboard/dashboardTypes";

interface Props {
  users: RecentUser[];
}

const RecentUsersTable = ({ users }: Props) => {
  return (
    <>
      <div className=" w-full bg-white shadow rounded-xl p-6">
        <div className="text-lg text-semibold mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-bold text-gray-600 text-sm">
                  <th className="py-2">Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{user.name}</td>
                    <td className="py-3">{user.email}</td>
                    <td className="py-3">{user.role[0]}</td>
                    {/* <td>{new Date(user.createdAt).toLocaleDateString()}</td> */}
                    <td>
                      {new Date(user.createdAt).toLocaleDateString("en-GB", {   //"en-GB" locale uses dd/mm/yyyy format by default
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentUsersTable;
