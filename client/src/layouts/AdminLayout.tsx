import { ReactNode, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Bell, Menu, Search, X } from "lucide-react";

interface AdminLayoutProps {
  title: string;
  children: ReactNode;
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-50">
      <div className="flex h-full">
        <Sidebar />

        {mobileOpen && (
          <div className="lg:hidden">
            <button
              className="fixed inset-0 z-40 bg-black/40"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 z-50 w-72">
              <div className="h-full">
                <div className="flex items-center justify-between px-4 py-4 bg-indigo-950 text-white">
                  <span className="text-sm font-semibold tracking-wide">
                    Menu
                  </span>
                  <button
                    className="p-2 rounded-lg hover:bg-white/10"
                    onClick={() => setMobileOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <Sidebar
                  variant="mobile"
                  onNavigate={() => setMobileOpen(false)}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col min-w-0">
          <header className="bg-white border-b border-gray-200">
            <div className="flex flex-col gap-3 px-4 sm:px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <button
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5 text-gray-600" />
                </button>
                <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:flex-none sm:w-64">
                  <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Bell className="h-5 w-5 text-gray-500" />
                </button>
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                  AD
                </div>
              </div>
            </div>
          </header>

          <main className="p-4 sm:p-6 overflow-y-auto flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
