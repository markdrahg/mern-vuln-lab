import { LayoutGrid, Users, Package, BarChart3, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: LayoutGrid, href: "/admin" },
  { label: "Manage Users", icon: Users, href: "/admin/users" },
  { label: "Manage Shipments", icon: Package, href: "/admin/shipments" },
  { label: "Reports", icon: BarChart3, href: "/admin/reports" },
];

interface SidebarProps {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}

export default function Sidebar({
  variant = "desktop",
  onNavigate,
}: SidebarProps) {
  const location = useLocation();
  const containerClassName =
    variant === "mobile"
      ? "flex flex-col w-72 bg-gradient-to-b from-indigo-900 to-indigo-950 text-white h-full"
      : "hidden lg:flex lg:flex-col lg:w-64 bg-gradient-to-b from-indigo-900 to-indigo-950 text-white h-screen sticky top-0";

  return (
    <aside className={containerClassName}>
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
          <span className="font-bold text-white">A</span>
        </div>
        <span className="text-lg font-semibold">Acme Logistics</span>
      </div>

      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-indigo-100 hover:bg-white/10 hover:text-white"
                  }`}
                  onClick={onNavigate}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-4 pb-6">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-indigo-100 hover:bg-white/10 hover:text-white transition-colors"
          onClick={onNavigate}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
