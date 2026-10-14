import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Users", path: "/dashboard/users", icon: Users },
  { name: "Reports", path: "/dashboard/reports", icon: FileText },
  { name: "Analytics", path: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-200 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && (
          <span className="text-lg font-bold text-gray-800">
            Your<span className="text-indigo-600">Logo</span>
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 shrink-0 rounded-full bg-indigo-100" />
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="truncate text-sm font-medium text-gray-800">
                John Doe
              </p>
              <p className="truncate text-xs text-gray-500">
                john@example.com
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}