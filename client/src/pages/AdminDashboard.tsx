import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import StatCard from "../components/StatCard";
import { shipmentService, type Shipment } from "../services/shipmentService";
import { adminService, type DashboardMetrics } from "../services/adminService";
import { SkeletonLoader } from "../components/LoadingSpinner";
import { toastService } from "../lib/toastService";

const statusStyles: Record<string, string> = {
  delivered: "bg-emerald-100 text-emerald-700",
  in_transit: "bg-amber-100 text-amber-700",
  delayed: "bg-red-100 text-red-700",
  pending: "bg-slate-100 text-slate-700",
  out_for_delivery: "bg-blue-100 text-blue-700",
  cancelled: "bg-gray-100 text-gray-700",
};

interface StatCardData {
  id: string;
  label: string;
  value: string | number;
  delta: string;
}

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(true);
  const [isLoadingShipments, setIsLoadingShipments] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoadingMetrics(true);
      const metricsData = await adminService.getDashboardMetrics();
      setMetrics(metricsData);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to load dashboard metrics";
      toastService.error(errorMessage);
      console.error(error);
    } finally {
      setIsLoadingMetrics(false);
    }
  };

  const fetchShipments = async () => {
    try {
      setIsLoadingShipments(true);
      const response = await shipmentService.getShipments(1, 5);
      setShipments(response.data);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to load shipments";
      toastService.error(errorMessage);
      console.error(error);
    } finally {
      setIsLoadingShipments(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const statCards: StatCardData[] = metrics
    ? [
        {
          id: "1",
          label: "Total Admins",
          value: metrics.totalAdmins,
          delta: "+2 this month",
        },
        {
          id: "2",
          label: "Total Shipments",
          value: metrics.totalShipments,
          delta: "+12 this month",
        },
        {
          id: "3",
          label: "Active Shipments",
          value: metrics.activeShipments,
          delta: "-3 from last week",
        },
      ]
    : [];

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Stat Cards */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {isLoadingMetrics ? (
            <SkeletonLoader count={3} />
          ) : (
            statCards.map((stat) => (
              <StatCard
                key={stat.id}
                label={stat.label}
                value={stat.value}
                delta={stat.delta}
              />
            ))
          )}
        </div>

        {/* Recent Shipments */}
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-gray-100">
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
            {isLoadingShipments ? (
              <div className="p-6">
                <SkeletonLoader count={5} />
              </div>
            ) : shipments.length > 0 ? (
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
                  {shipments.map((shipment) => (
                    <tr
                      key={shipment._id || shipment.id}
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
            ) : (
              <div className="p-6 text-center text-gray-500">
                No shipments found
              </div>
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
