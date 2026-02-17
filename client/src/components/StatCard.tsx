import { TrendingUp } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  delta: string;
}

export default function StatCard({ label, value, delta }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <div className="text-sm text-gray-500 font-medium">{label}</div>
      <div className="text-2xl font-semibold text-gray-900 mt-1">{value}</div>
      <div className="flex items-center text-emerald-600 text-xs mt-3">
        <TrendingUp className="h-4 w-4 mr-1" />
        <span>{delta}</span>
      </div>
    </div>
  );
}
