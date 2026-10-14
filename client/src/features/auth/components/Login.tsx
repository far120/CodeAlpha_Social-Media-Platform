import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import type { IloginData } from "../types/auth.types";
import { useUserLoginMutation } from "../hooks/useUserLogin";
import {
  Mail,
  Lock,
  LogIn,
  RotateCcw,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export default function Login() {
  const { loginMutation, loginPending, loginIsError, loginError } = useUserLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IloginData>();

  const onSubmit = (data: IloginData) => {
    loginMutation(data);
  };

  const errorMessage =
    (loginError as any)?.response?.data?.message || loginError?.message;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors">
      {/* Ambient background blur circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-violet-500/10 dark:bg-violet-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl dark:shadow-indigo-950/50 transition-all">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-4 transition-transform hover:scale-105 text-white">
            <LogIn className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
            Sign in to access your account and feeds
          </p>
        </div>

        {/* Error Alert */}
        {loginIsError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="text-sm font-semibold">
              {errorMessage || "Login failed. Please check your credentials."}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 ml-1">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 ml-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 ml-1">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors focus:outline-none cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1 ml-1">{errors.password.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="pt-3 flex gap-3">
            <button
              type="submit"
              disabled={loginPending}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.99] text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-150 flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loginPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => reset()}
              disabled={loginPending}
              className="py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 active:scale-[0.99] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium rounded-xl border border-slate-200 dark:border-slate-700/50 transition-all duration-150 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </form>

        {/* Footer Link to Register */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="inline-flex items-center font-semibold text-indigo-600 dark:text-indigo-400 hover:underline ml-1"
            >
              <span>Create account</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
