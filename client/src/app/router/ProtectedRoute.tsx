import type { ReactNode } from "react";
import { Navigate, Outlet, useLocation, Link } from "react-router-dom";
import { useuserprofile } from "../../features/user/hooks/useUserProfile";
import { Loader2, ShieldAlert, ArrowLeft } from "lucide-react";

interface ProtectedRouteProps {
  children?: ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const location = useLocation();
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token") || localStorage.getItem("accessToken")
      : null;

  const { userprofile, isLoading, isError } = useuserprofile();

  // 1. If token exists and profile is still loading, show a dark/light glass loading state
  if (token && isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-xl">
          <Loader2 className="w-8 h-8 text-indigo-600 dark:text-indigo-500 animate-spin" />
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Authenticating session...</p>
        </div>
      </div>
    );
  }

  // 2. If no token exists or profile query failed, redirect to login page
  if (!token || isError || (!isLoading && !userprofile)) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // 3. If allowedRoles is specified, check if current user role matches
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = userprofile?.role || "user";
    const hasPermission = allowedRoles.includes(userRole);

    if (!hasPermission) {
      return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
          <div className="bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl backdrop-blur-xl">
            <div className="w-16 h-16 bg-red-500/10 dark:bg-red-500/15 border border-red-500/20 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Access Restricted</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              This dashboard is restricted to{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {allowedRoles.join(", ")}
              </span>{" "}
              only. Your current role is <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-800 dark:text-slate-200 font-semibold">{userRole}</span>.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/25 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      );
    }
  }

  // 4. Render children components or nested Outlet routes
  return children ? <>{children}</> : <Outlet />;
}