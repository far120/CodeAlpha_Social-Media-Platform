import { useState } from "react";
import { Link } from "react-router-dom";
import { useChangePasswordUserMutation } from "../hooks/useChangePassword";
import { useForm } from "react-hook-form";
import type { IUpdatePasswordData } from "../types/user.types";
import {
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  RotateCcw,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

interface ChangePasswordFormInputs extends IUpdatePasswordData {
  confirmPassword?: string;
}

export default function ChangePassword() {
  const {
    changePasswordMutation,
    changePasswordPending,
    changePasswordIsError,
    changePasswordError,
    changePasswordIsSuccess,
    resetMutation,
  } = useChangePasswordUserMutation();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ChangePasswordFormInputs>();

  const newPasswordValue = watch("newPassword");

  const onSubmit = (data: ChangePasswordFormInputs) => {
    changePasswordMutation(
      {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword || data.newPassword,
      },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  const errorMessage =
    (changePasswordError as any)?.response?.data?.message ||
    changePasswordError?.message ||
    "Failed to update password. Please check your old password.";

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center transition-colors">
      {/* Ambient background blur circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-violet-500/10 dark:bg-violet-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-xl mx-auto space-y-4">
        {/* Back Link */}
        <Link
          to="/profile"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors ml-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Profile</span>
        </Link>

        {/* Change Password Card */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-2xl dark:shadow-slate-950/60 w-full transition-all">
          {/* Header */}
          <div className="flex items-center gap-3.5 border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Change Password
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Ensure your account is using a long, random password to stay secure
              </p>
            </div>
          </div>

          {/* Success Alert */}
          {changePasswordIsSuccess && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="text-sm font-semibold">
                Password has been changed successfully!
              </div>
            </div>
          )}

          {/* Error Alert */}
          {changePasswordIsError && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="text-sm font-semibold">{errorMessage}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Old Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 ml-1">
                Current Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <input
                  type={showOldPassword ? "text" : "password"}
                  {...register("oldPassword", {
                    required: "Current password is required",
                  })}
                  placeholder="Enter current password"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors focus:outline-none cursor-pointer"
                  aria-label={showOldPassword ? "Hide password" : "Show password"}
                >
                  {showOldPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.oldPassword && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 ml-1">
                New Password
              </label>
              <div className="relative flex items-center">
                <ShieldCheck className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Enter new password"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors focus:outline-none cursor-pointer"
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 ml-1">
                Confirm New Password
              </label>
              <div className="relative flex items-center">
                <ShieldCheck className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your new password",
                    validate: (value) =>
                      value === newPasswordValue || "Passwords do not match",
                  })}
                  placeholder="Confirm new password"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors focus:outline-none cursor-pointer"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-3 flex gap-3">
              <button
                type="submit"
                disabled={changePasswordPending}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.99] text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-150 flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {changePasswordPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Update Password</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  reset();
                  resetMutation();
                }}
                disabled={changePasswordPending}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 active:scale-[0.99] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium rounded-xl border border-slate-200 dark:border-slate-700/50 transition-all duration-150 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}