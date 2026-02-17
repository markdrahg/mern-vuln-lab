import AdminLayout from "../layouts/AdminLayout";
import { adminShipments } from "../data/adminMockData";

const statusStyles: Record<string, string> = {
  delivered: "bg-emerald-100 text-emerald-700",
  in_transit: "bg-amber-100 text-amber-700",
  delayed: "bg-red-100 text-red-700",
  pending: "bg-slate-100 text-slate-700",
  out_for_delivery: "bg-blue-100 text-blue-700",
  cancelled: "bg-gray-100 text-gray-700",
};

export default function AdminShipments() {
  return (
    <AdminLayout title="Manage Shipments">
      <div className="space-y-6">
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                All Shipments
              </h2>
              <p className="text-sm text-gray-500">
                Track shipment status and routing activity.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                <option>All Statuses</option>
                <option>Delivered</option>
                <option>In Transit</option>
                <option>Out for Delivery</option>
                <option>Delayed</option>
                <option>Pending</option>
                <option>Cancelled</option>
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
                  <th className="px-4 sm:px-6 py-3 font-medium">
                    Tracking Number
                  </th>
                  <th className="px-4 sm:px-6 py-3 font-medium">Customer</th>
                  <th className="px-4 sm:px-6 py-3 font-medium">Status</th>
                  <th className="px-4 sm:px-6 py-3 font-medium hidden md:table-cell">
                    Origin
                  </th>
                  <th className="px-4 sm:px-6 py-3 font-medium hidden lg:table-cell">
                    Destination
                  </th>
                  <th className="px-4 sm:px-6 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {adminShipments.map((shipment) => (
                  <tr
                    key={shipment.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-4 sm:px-6 py-4 font-medium text-gray-900">
                      {shipment.trackingNumber}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-600">
                      {shipment.customer}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          statusStyles[shipment.status] ??
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {shipment.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-600 hidden md:table-cell">
                      {shipment.origin}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-600 hidden lg:table-cell">
                      {shipment.destination}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
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
