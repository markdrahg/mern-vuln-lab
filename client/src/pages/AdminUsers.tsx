import AdminLayout from "../layouts/AdminLayout";
import { adminUsers } from "../data/adminMockData";

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Invited: "bg-amber-100 text-amber-700",
  Suspended: "bg-red-100 text-red-700",
};

export default function AdminUsers() {
  return (
    <AdminLayout title="Manage Users">
      <div className="space-y-6">
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
              <p className="text-sm text-gray-500">
                Manage roles, status, and access.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                <option>All Roles</option>
                <option>Admin</option>
                <option>User</option>
              </select>
              <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                <option>All Status</option>
                <option>Active</option>
                <option>Invited</option>
                <option>Suspended</option>
              </select>
              <button className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700">
                Invite User
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr className="border-b border-gray-100">
                  <th className="px-4 sm:px-6 py-3 font-medium">Name</th>
                  <th className="px-4 sm:px-6 py-3 font-medium hidden md:table-cell">
                    Email
                  </th>
                  <th className="px-4 sm:px-6 py-3 font-medium">Role</th>
                  <th className="px-4 sm:px-6 py-3 font-medium">Status</th>
                  <th className="px-4 sm:px-6 py-3 font-medium hidden lg:table-cell">
                    Last Active
                  </th>
                  <th className="px-4 sm:px-6 py-3 font-medium hidden lg:table-cell">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {adminUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-4 sm:px-6 py-4 font-medium text-gray-900">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-semibold">
                          {user.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-xs text-gray-500 md:hidden">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-600 hidden md:table-cell">
                      {user.email}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          statusStyles[user.status] ??
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-600 hidden lg:table-cell">
                      {user.lastActive}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-600 hidden lg:table-cell">
                      {user.joined}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
