import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useuserprofile } from "../hooks/useUserProfile";
import { useUpdateUserProfileMutation } from "../hooks/useUpdateUserProfile";
import { useForm } from "react-hook-form";
import type { IUpdateUserData } from "../types/user.types";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  RotateCcw,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  FileText,
  CheckCircle2,
  Award,
  KeyRound,
  ArrowRight,
} from "lucide-react";

export default function Profile() {
  const { userprofile, isLoading, isError, error } = useuserprofile();
  const { updateMutation, updatePending, updateIsError, updateError } =
    useUpdateUserProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdateUserData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  // Keep form fields synced when profile data loads or changes
  useEffect(() => {
    if (userprofile) {
      reset({
        firstName: userprofile.firstName || "",
        lastName: userprofile.lastName || "",
        email: userprofile.email || "",
        phone: userprofile.phone || "",
        address: userprofile.address || "",
      });
    }
  }, [userprofile, reset]);

  const onSubmit = (data: IUpdateUserData) => {
    updateMutation(data);
  };

  const errorMessage =
    (updateError as any)?.response?.data?.message ||
    updateError?.message ||
    (error as any)?.response?.data?.message ||
    error?.message;

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 gap-3">
        <Loader2 className="w-9 h-9 animate-spin text-indigo-500" />
        <p className="text-sm font-semibold">Loading your profile details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-xl mx-auto my-12 p-6 rounded-3xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-lg font-bold text-red-900 dark:text-white">Error Loading Profile</h3>
          <p className="text-sm mt-1 text-red-700 dark:text-red-300">
            {errorMessage || "Failed to load profile information. Please try refreshing."}
          </p>
        </div>
      </div>
    );
  }

  const initials =
    userprofile?.firstName && userprofile?.lastName
      ? `${userprofile.firstName[0]}${userprofile.lastName[0]}`.toUpperCase()
      : userprofile?.firstName
      ? userprofile.firstName.slice(0, 2).toUpperCase()
      : "U";

  const summaryData = userprofile?.summary;
  const analysisData = summaryData?.analysis;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Ambient background blur circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-violet-500/10 dark:bg-violet-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto space-y-8">
        {/* Main Profile Card */}
        <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm dark:shadow-2xl dark:shadow-slate-950/60 transition-all">
          
          {/* Header & User Badge */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-100 dark:border-slate-800 pb-8 mb-8">
            <div className="relative">
              {userprofile?.avatar ? (
                <img
                  src={userprofile.avatar}
                  alt={`${userprofile.firstName} ${userprofile.lastName}`}
                  className="w-20 h-20 rounded-2xl object-cover shadow-md border border-slate-200 dark:border-slate-700"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                  {initials}
                </div>
              )}
              {userprofile?.isVerified && (
                <div
                  className="absolute -bottom-1.5 -right-1.5 p-1 rounded-lg bg-emerald-500 text-white shadow-md"
                  title="Verified User"
                >
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {userprofile?.firstName ? `${userprofile.firstName} ${userprofile.lastName || ""}` : "My Profile"}
                </h1>
                {userprofile?.role && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
                    {userprofile.role}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {userprofile?.email || "Manage your account settings and personal details"}
              </p>
            </div>
          </div>

          {/* Read-Only AI Profile Summary Section */}
          {summaryData?.summary && (
            <div className="mb-8 p-6 rounded-2xl bg-indigo-50/50 dark:bg-slate-950/70 border border-indigo-200 dark:border-indigo-500/30 shadow-xs">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Profile Summary (Read Only)</span>
                </div>
                {analysisData?.Score !== undefined && (
                  <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                    <Award className="w-3.5 h-3.5" />
                    <span>Score: {analysisData.Score}%</span>
                  </span>
                )}
              </div>

              {/* Read-Only Summary Text */}
              <div className="relative">
                <textarea
                  readOnly
                  rows={4}
                  value={summaryData.summary}
                  className="w-full p-3.5 bg-white dark:bg-slate-900/90 border border-indigo-100 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-sm leading-relaxed resize-none focus:outline-none cursor-default font-normal"
                />
              </div>

              {/* Read-Only Analysis Metrics */}
              {analysisData && (
                <div className="mt-4 pt-4 border-t border-indigo-100 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {analysisData.Verification_Status && (
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-900/50 border border-indigo-100 dark:border-slate-800/50 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span><strong>Status:</strong> {analysisData.Verification_Status}</span>
                    </div>
                  )}
                  {analysisData.Access_Status && (
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-900/50 border border-indigo-100 dark:border-slate-800/50 text-slate-700 dark:text-slate-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span><strong>Access:</strong> {analysisData.Access_Status}</span>
                    </div>
                  )}
                  {analysisData.Role_Tier && (
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-900/50 border border-indigo-100 dark:border-slate-800/50 text-slate-700 dark:text-slate-300">
                      <FileText className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                      <span><strong>Role:</strong> {analysisData.Role_Tier}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Update Error Alert */}
          {updateIsError && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="text-sm font-semibold">
                {errorMessage || "Failed to update profile. Please try again."}
              </div>
            </div>
          )}

          {/* Profile Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 ml-1">
                  First Name
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                  <input
                    type="text"
                    {...register("firstName", { required: "First name is required" })}
                    placeholder="First Name"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1 ml-1">{errors.firstName.message}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 ml-1">
                  Last Name
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                  <input
                    type="text"
                    {...register("lastName")}
                    placeholder="Last Name"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
                  />
                </div>
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1 ml-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 ml-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 ml-1">{errors.email.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 ml-1">
                  Phone Number
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                  <input
                    type="tel"
                    {...register("phone")}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1 ml-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 ml-1">
                  Location / Address
                </label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                  <input
                    type="text"
                    {...register("address")}
                    placeholder="City, Country"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
                  />
                </div>
                {errors.address && (
                  <p className="text-xs text-red-500 mt-1 ml-1">{errors.address.message}</p>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-4 flex gap-4">
              <button
                type="submit"
                disabled={updatePending}
                className="flex-1 py-3 px-5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.99] text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-150 flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {updatePending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (userprofile) {
                    reset({
                      firstName: userprofile.firstName || "",
                      lastName: userprofile.lastName || "",
                      email: userprofile.email || "",
                      phone: userprofile.phone || "",
                      address: userprofile.address || "",
                    });
                  }
                }}
                disabled={updatePending}
                className="py-3 px-5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 active:scale-[0.99] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium rounded-xl border border-slate-200 dark:border-slate-700/50 transition-all duration-150 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </form>

          {/* Change Password Link Section at the end of Profile */}
          <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Security Settings</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Want to update your account password?</p>
            </div>
            <Link
              to="/change-password"
              className="w-full sm:w-auto py-2.5 px-5 bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800/90 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold rounded-xl border border-indigo-200 dark:border-slate-700/60 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm shadow-xs group"
            >
              <KeyRound className="w-4 h-4 text-indigo-500" />
              <span>Change Password</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}