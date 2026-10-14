import { Link } from "react-router-dom";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 text-center transition-colors">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-md w-full bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 shadow-sm dark:shadow-2xl flex flex-col items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-xs">
          <FileQuestion className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Page Not Found
          </h2>
          <p className="max-w-xs text-sm text-slate-500 dark:text-slate-400 mx-auto">
            The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-2">
          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 hover:from-indigo-500 hover:to-violet-500 transition-all cursor-pointer"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}