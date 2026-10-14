import { Link } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { useuserprofile } from "../hooks/useUserProfile";
import { useAIAnalysisMutation } from "../hooks/useAIAnalysis";
import { useToast } from "../../../components/Feedback/Toast";
import type { Iuser } from "../types/user.types";
import {
  Users,
  BarChart3,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  Loader2,
  KeyRound,
  User,
  Activity,
  Award,
  Zap,
  TrendingUp,
  Cpu,
} from "lucide-react";

export default function Dashboard() {
  const { toast } = useToast();
  const { allUsers, isLoading: usersLoading } = useUsers();
  const { userprofile } = useuserprofile();
  const { aiAnalysisMutation, aiPending } = useAIAnalysisMutation();

  const usersList: Iuser[] = Array.isArray(allUsers)
    ? allUsers
    : (allUsers as any)?.data || [];

  // System Stats
  const totalUsersCount = usersList.length;
  const verifiedCount = usersList.filter((u) => u.isVerified).length;
  const adminCount = usersList.filter(
    (u) => u.role === "super-admin" || u.role === "admin"
  ).length;
  const blockedCount = usersList.filter((u) => u.isBlocked).length;

  const verificationRate =
    totalUsersCount > 0
      ? Math.round((verifiedCount / totalUsersCount) * 100)
      : 0;

  const handleAIAnalysis = () => {
    aiAnalysisMutation(undefined, {
      onSuccess: () => {
        toast.success("AI Analysis generated successfully!");
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "AI Analysis failed");
      },
    });
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-violet-500/10 dark:bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8">
        {/* Header Title & Welcome Banner */}
        <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Zap className="w-4 h-4" />
              <span>Project Analytics & Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span>Project Statistics Dashboard</span>
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Welcome back,{" "}
              <strong className="text-slate-900 dark:text-slate-200 font-bold">
                {userprofile?.firstName ? `${userprofile.firstName} ${userprofile.lastName || ""}` : "Admin"}
              </strong>
              . Here is your live project system overview and metrics.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAIAnalysis}
            disabled={aiPending}
            className="py-3 px-5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-600/25 active:scale-[0.98] transition-all flex items-center gap-2 text-sm disabled:opacity-60 cursor-pointer"
          >
            {aiPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Generating AI Insights...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-white" />
                <span>Run AI System Analysis</span>
              </>
            )}
          </button>
        </div>

        {/* Project Metric Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total Registered Users */}
          <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm dark:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Total Users
              </span>
              <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {usersLoading ? "..." : totalUsersCount}
              </p>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +100% Active
              </span>
            </div>
          </div>

          {/* Verified Accounts Rate */}
          <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm dark:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Verified Users
              </span>
              <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {usersLoading ? "..." : verifiedCount}
              </p>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                {verificationRate}% Rate
              </span>
            </div>
          </div>

          {/* Admins & Managers */}
          <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm dark:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Admins & Staff
              </span>
              <div className="p-2.5 rounded-2xl bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {usersLoading ? "..." : adminCount}
              </p>
              <span className="text-xs text-violet-600 dark:text-violet-400 font-semibold">Privileged</span>
            </div>
          </div>

          {/* Blocked Accounts */}
          <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm dark:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Blocked Accounts
              </span>
              <div className="p-2.5 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {usersLoading ? "..." : blockedCount}
              </p>
              <span className="text-xs text-red-600 dark:text-red-400 font-semibold">Restricted</span>
            </div>
          </div>
        </div>

        {/* Health & Verification Progress Metrics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Verification Rate Bar */}
          <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm dark:shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-500" />
                <span>Verification Ratio</span>
              </h3>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20">
                {verificationRate}% Verified
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-950 rounded-full h-3.5 overflow-hidden border border-slate-200/80 dark:border-slate-800">
              <div
                className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${verificationRate}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {verifiedCount} out of {totalUsersCount} registered user accounts have completed verification.
            </p>
          </div>

          {/* System Health Status Card */}
          <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm dark:shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-500" />
                <span>System Infrastructure Status</span>
              </h3>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Operational 99.9%</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400 font-medium">API Gateway</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Active</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Database Cluster</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Connected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Services & Management Navigation Section */}
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-500" />
            <span>Project Services & Management</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Manage Users Card */}
            <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm dark:shadow-xl flex flex-col justify-between hover:border-indigo-500/50 transition-all group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-600/15 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">User Management</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Manage all registered users, assign roles, block or unblock accounts, and create new users.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 mt-6">
                <Link
                  to="/dashboard/users"
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 active:scale-[0.98] transition-all"
                >
                  <span>Manage Users</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Audit Logs Service Card */}
            <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm dark:shadow-xl flex flex-col justify-between hover:border-indigo-500/50 transition-all group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-600/15 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Audit Activity Logs</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Track real-time user API actions, HTTP responses, status codes, and execution latencies.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 mt-6">
                <Link
                  to="/dashboard/logs"
                  className="w-full py-2.5 px-4 bg-amber-50 hover:bg-amber-100 dark:bg-slate-800/90 dark:hover:bg-slate-800 text-amber-700 dark:text-amber-300 font-semibold rounded-xl border border-amber-200 dark:border-slate-700/60 text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                  <span>View Activity Logs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Security & Password Service Card */}
            <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm dark:shadow-xl flex flex-col justify-between hover:border-indigo-500/50 transition-all group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-600/15 border border-violet-200 dark:border-violet-500/30 flex items-center justify-center text-violet-600 dark:text-violet-400 group-hover:scale-105 transition-transform">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Security & Password</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Update your admin security credentials, change account password, and manage access tokens.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 mt-6">
                <Link
                  to="/change-password"
                  className="w-full py-2.5 px-4 bg-violet-50 hover:bg-violet-100 dark:bg-slate-800/90 dark:hover:bg-slate-800 text-violet-700 dark:text-indigo-300 font-semibold rounded-xl border border-violet-200 dark:border-slate-700/60 text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                  <span>Security Settings</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* My Profile Service Card */}
            <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm dark:shadow-xl flex flex-col justify-between hover:border-indigo-500/50 transition-all group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-600/15 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Admin Profile</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  View your complete personal details, contact preferences, and AI profile summary analysis.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 mt-6">
                <Link
                  to="/profile"
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/90 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-700/60 text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                  <span>My Profile</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
