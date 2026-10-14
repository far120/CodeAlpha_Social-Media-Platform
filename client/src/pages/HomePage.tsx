import PostsFeed from "../features/post/component/PostsFeed";
import { useuserprofile } from "../features/user/hooks/useUserProfile";
import { Link } from "react-router-dom";
import {
  Users,
  TrendingUp,
  Sparkles,
  Rss,
  LogIn,
  UserPlus,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const { userprofile } = useuserprofile();

  const isLoggedIn = Boolean(
    typeof window !== "undefined" &&
      (localStorage.getItem("token") ||
        localStorage.getItem("accessToken"))
  );

  // Only super-admin can see/access Dashboard
  const canAccessDashboard = userprofile?.role === "super-admin";

  return (
    <div className="relative min-h-screen transition-colors duration-200">
      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-violet-500/10 dark:bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-slate-200/40 dark:bg-slate-800/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Guest hero banner */}
        {!isLoggedIn && (
          <div className="mb-8 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 border border-indigo-500/30 shadow-xl shadow-indigo-950/20 overflow-hidden relative text-white">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 flex-shrink-0">
                <Sparkles className="w-8 h-8 text-white" />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Welcome to next-gen social platform</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  Connect, Share & Grow with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-violet-300">
                    ELFAR Social
                  </span>
                </h1>

                <p className="text-slate-300 mt-2.5 text-sm sm:text-base leading-relaxed max-w-xl">
                  Share your ideas, interact with creators, and stay updated with a vibrant community. Sign up to publish posts, join discussions, and react.
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5 mt-6">
                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Get Started Free</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>

                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 active:scale-95 transition-all"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-8 items-start">
          {/* Main feed */}
          <main className="flex-1 min-w-0">
            <PostsFeed />
          </main>

          {/* Right sidebar */}
          <aside className="hidden lg:flex flex-col gap-5 w-80 flex-shrink-0 sticky top-24">
            {/* Current user card */}
            {isLoggedIn && userprofile && (
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm dark:shadow-lg dark:shadow-slate-950/40 transition-colors">
                <div className="flex items-center gap-3.5 mb-4">
                  {userprofile.avatar ? (
                    <img
                      src={userprofile.avatar}
                      alt={userprofile.firstName}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-base shadow-sm">
                      {`${userprofile.firstName?.[0] || ""}${
                        userprofile.lastName?.[0] || ""
                      }`.toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {userprofile.firstName} {userprofile.lastName}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {userprofile.email}
                    </p>
                    <span className="inline-block px-2 py-0.5 mt-1 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                      {userprofile.role}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <Link
                    to={`/users/${userprofile._id || userprofile.id}`}
                    className={`${
                      canAccessDashboard ? "flex-1" : "w-full"
                    } text-center py-2.5 px-3 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 transition-all`}
                  >
                    View Profile
                  </Link>

                  {canAccessDashboard && (
                    <Link
                      to="/dashboard"
                      className="flex-1 text-center py-2.5 px-3 text-xs font-semibold rounded-xl text-indigo-600 dark:text-indigo-400 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/20 transition-all"
                    >
                      Dashboard
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Platform stats */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm dark:shadow-lg dark:shadow-slate-950/40 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Platform Pulse
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/60">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                    <Rss className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Public Feed
                    </p>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Live posts & interactions
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/60">
                  <div className="w-9 h-9 rounded-xl bg-violet-500/10 dark:bg-violet-500/15 flex items-center justify-center text-violet-600 dark:text-violet-400 flex-shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Community
                    </p>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Open & continuously growing
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest CTA */}
            {!isLoggedIn && (
              <div className="bg-gradient-to-br from-indigo-50 via-violet-50 to-white dark:from-indigo-950/40 dark:via-slate-900 dark:to-violet-950/30 border border-indigo-200/80 dark:border-indigo-500/20 rounded-3xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3.5">
                  <Sparkles className="w-5 h-5" />
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                  Join the community
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  Create an account in seconds to publish posts, leave comments, and connect with other users.
                </p>

                <Link
                  to="/register"
                  className="block w-full text-center py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl shadow-md shadow-indigo-600/20 transition-all active:scale-95"
                >
                  Sign Up Free
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}