import AdminLayout from "../layouts/AdminLayout";
import StatCard from "../components/StatCard";
import {
  adminStats,
  recentShipments,
  recentUsers,
} from "../data/adminMockData";

const statusStyles: Record<string, string> = {
  delivered: "bg-emerald-100 text-emerald-700",
  in_transit: "bg-amber-100 text-amber-700",
  delayed: "bg-red-100 text-red-700",
  pending: "bg-slate-100 text-slate-700",
  out_for_delivery: "bg-blue-100 text-blue-700",
  cancelled: "bg-gray-100 text-gray-700",
};

export default function AdminDashboard() {
  return (
    <AdminLayout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Stat Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {adminStats.map((stat) => (
            <StatCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              delta={stat.delta}
            />
          ))}
        </div>

        {/* Recent Users */}
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Users
            </h2>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Role</th>
                  <th className="px-6 py-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-semibold">
                          {user.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")}
                        </div>
                        {user.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recent Shipments */}
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Shipments
            </h2>
            <div className="flex items-center gap-3">
              <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                <option>All Shipments</option>
                <option>Delivered</option>
                <option>In Transit</option>
                <option>Delayed</option>
              </select>
              <button className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700">
                Add Shipment
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-3 font-medium">Tracking Number</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Origin</th>
                  <th className="px-6 py-3 font-medium">Destination</th>
                  <th className="px-6 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentShipments.map((shipment) => (
                  <tr
                    key={shipment.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {shipment.trackingNumber}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {shipment.customer}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          statusStyles[shipment.status] ??
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {shipment.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {shipment.origin}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {shipment.destination}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                        View
                      </button>
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
