import AdminLayout from "../layouts/AdminLayout";
import {
  reportActivity,
  reportMetrics,
  reportOnTimeTrend,
  reportRoutes,
  reportWeeklyVolume,
} from "../data/adminMockData";

const trendStyles: Record<string, string> = {
  up: "text-emerald-600",
  down: "text-amber-600",
};

const activityStyles: Record<string, string> = {
  Success: "bg-emerald-100 text-emerald-700",
  Warning: "bg-amber-100 text-amber-700",
  Info: "bg-blue-100 text-blue-700",
};

export default function AdminReports() {
  return (
    <AdminLayout title="Reports">
      <div className="space-y-6">
        <section className="grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {reportMetrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
            >
              <div className="text-sm text-gray-500 font-medium">
                {metric.label}
              </div>
              <div className="text-2xl font-semibold text-gray-900 mt-2">
                {metric.value}
              </div>
              <div
                className={`text-xs font-medium mt-2 ${
                  trendStyles[metric.trend]
                }`}
              >
                {metric.delta}
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Weekly Shipment Volume
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Last 7 days across all lanes.
                </p>
              </div>
              <span className="text-sm text-gray-400">Shipments</span>
            </div>
            <div className="mt-6 flex items-end gap-3 h-40">
              {reportWeeklyVolume.map((point) => (
                <div
                  key={point.label}
                  className="flex flex-col items-center gap-2 flex-1"
                >
                  <div
                    className="w-full bg-indigo-500/80 rounded-md"
                    style={{ height: `${Math.max(12, point.value * 0.8)}px` }}
                  />
                  <span className="text-xs text-gray-500">{point.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  On-Time Trend
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Rolling 5-week performance.
                </p>
              </div>
              <span className="text-sm text-gray-400">Percent</span>
            </div>
            <div className="mt-6 grid grid-cols-5 gap-3 items-end h-40">
              {reportOnTimeTrend.map((point) => (
                <div
                  key={point.label}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="w-full bg-emerald-500/80 rounded-md"
                    style={{ height: `${Math.max(12, point.value)}px` }}
                  />
                  <span className="text-xs text-gray-500">{point.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Current: 95% on-time deliveries
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Operational Summary
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Weekly performance and exception trends.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>On-time deliveries</span>
                  <span>94%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full mt-2">
                  <div className="h-2 bg-emerald-500 rounded-full w-[94%]" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>In transit</span>
                  <span>68%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full mt-2">
                  <div className="h-2 bg-indigo-500 rounded-full w-[68%]" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Delayed shipments</span>
                  <span>6%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full mt-2">
                  <div className="h-2 bg-amber-500 rounded-full w-[6%]" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Cancelled</span>
                  <span>2%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full mt-2">
                  <div className="h-2 bg-red-500 rounded-full w-[2%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Activity
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Alerts and automated insights.
                </p>
              </div>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                View Logs
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {reportActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 border border-gray-100 rounded-lg p-4"
                >
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      activityStyles[activity.status]
                    }`}
                  >
                    {activity.status}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">
                      {activity.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      {activity.description}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Top Routes
              </h2>
              <p className="text-sm text-gray-500">
                Highest volume lanes this month.
              </p>
            </div>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              Export CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr className="border-b border-gray-100">
                  <th className="px-4 sm:px-6 py-3 font-medium">Route</th>
                  <th className="px-4 sm:px-6 py-3 font-medium">Volume</th>
                  <th className="px-4 sm:px-6 py-3 font-medium hidden md:table-cell">
                    On-Time Rate
                  </th>
                  <th className="px-4 sm:px-6 py-3 font-medium hidden md:table-cell">
                    Avg Transit
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportRoutes.map((route) => (
                  <tr
                    key={route.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-4 sm:px-6 py-4 font-medium text-gray-900">
                      {route.route}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-600">
                      {route.volume}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-600 hidden md:table-cell">
                      {route.onTimeRate}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-gray-600 hidden md:table-cell">
                      {route.avgTransit}
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
