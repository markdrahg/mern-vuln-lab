import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import { Bell, Search } from "lucide-react";

interface AdminLayoutProps {
  title: string;
  children: ReactNode;
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  return (
    <div className="h-screen bg-gray-50">
      <div className="flex h-full">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-6 py-4">
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

          <main className="p-6 overflow-y-auto flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
