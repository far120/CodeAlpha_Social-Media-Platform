import {
  MapPin,
  Mail,
  Calendar,
  Users,
  UserPlus,
  UserCheck,
  FileText,
  Plus,
  Loader2,
} from "lucide-react";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useGetUserProfile,
  useToggleFollow,
} from "../hooks/usetogglefollow";

import { useuserprofile } from "../hooks/useUserProfile";
import type { Iuser } from "../types/user.types";

import PostCard from "../../post/component/PostCard";
import CreatePostModal from "../../post/component/CreatePostModal";

export default function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  // =========================================
  // CURRENT LOGGED-IN USER
  // =========================================
  const {
    userprofile: currentUser,
    isLoading: isCurrentUserLoading,
  } = useuserprofile();

  // =========================================
  // PROFILE BEING VIEWED
  // =========================================
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetUserProfile(userId || "");

  const toggleFollowMutation = useToggleFollow();

  const user: Iuser | undefined = (response as any)?.data || response;

  // =========================================
  // LOADING
  // =========================================
  if (isLoading || isCurrentUserLoading) {
    return (
      <div className="min-h-screen px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm dark:shadow-2xl">
            {/* Cover */}
            <div className="h-48 animate-pulse bg-slate-200 dark:bg-slate-800 md:h-64" />

            <div className="px-6 pb-8">
              {/* Avatar */}
              <div className="-mt-16 h-32 w-32 animate-pulse rounded-full border-4 border-white dark:border-slate-900 bg-slate-300 dark:bg-slate-700" />

              <div className="mt-6 space-y-3">
                <div className="h-7 w-52 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-72 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-full max-w-xl animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="h-20 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />
                <div className="h-20 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />
                <div className="h-20 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================
  // ERROR
  // =========================================
  if (isError || !user) {
    return (
      <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-red-200 dark:border-red-900/50 bg-white dark:bg-slate-900 p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-500">
            <Users className="h-7 w-7" />
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            User Not Found
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {error instanceof Error
              ? error.message
              : "We couldn't find this user profile."}
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // =========================================
  // PROFILE STATE
  // =========================================
  const isOwnProfile =
    currentUser?._id?.toString() === user._id?.toString();

  const isFollowing =
    user.followers?.some(
      (follower: any) =>
        follower?._id?.toString() === currentUser?._id?.toString()
    ) ?? false;

  const handleToggleFollow = () => {
    if (
      !userId ||
      isOwnProfile ||
      toggleFollowMutation.isPending
    ) {
      return;
    }

    toggleFollowMutation.mutate(userId);
  };

  const fullName =
    `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
    "Unknown User";

  const initials =
    `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() ||
    "U";

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
    : "Unknown";

  const profileAuthor = {
    _id: user._id ?? user.id ?? userId ?? "",
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
    email: user.email,
  };

  const profilePosts = (user.posts ?? []).filter(Boolean).map((post: any) => ({
    ...post,
    user: profileAuthor,
  }));

  // =========================================
  // RENDER
  // =========================================
  return (
    <div className="min-h-screen px-4 py-8 text-slate-900 dark:text-white transition-colors">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* =========================================
            PROFILE HEADER
        ========================================= */}
        <section className="overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 shadow-sm dark:shadow-2xl dark:shadow-slate-950/50 backdrop-blur-md">
          {/* Cover */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 md:h-64">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_35%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Profile Information */}
          <div className="relative px-6 pb-8 md:px-8">
            {/* Avatar + Follow */}
            <div className="-mt-16 flex items-end justify-between">
              {/* Avatar */}
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-3xl border-4 border-white dark:border-slate-900 bg-gradient-to-br from-indigo-500 to-violet-600 text-3xl font-bold text-white shadow-xl">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              {/* Follow Button */}
              {!isOwnProfile && (
                <button
                  type="button"
                  onClick={handleToggleFollow}
                  disabled={toggleFollowMutation.isPending}
                  className={`mb-2 flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer ${
                    isFollowing
                      ? "border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-red-300 dark:hover:border-red-500/40 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
                      : "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500"
                  }`}
                >
                  {toggleFollowMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isFollowing ? (
                    <UserCheck className="h-4 w-4" />
                  ) : (
                    <UserPlus className="h-4 w-4" />
                  )}

                  {toggleFollowMutation.isPending
                    ? "Updating..."
                    : isFollowing
                      ? "Following"
                      : "Follow"}
                </button>
              )}
            </div>

            {/* Name */}
            <div className="mt-5">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-3xl">
                {fullName}
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                @{user.email?.split("@")[0] || "user"}
              </p>

              {user.bio && (
                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {user.bio}
                </p>
              )}
            </div>

            {/* User Details */}
            <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-600 dark:text-slate-400">
              {user.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-indigo-500" />
                  <span>{user.email}</span>
                </div>
              )}

              {user.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-indigo-500" />
                  <span>{user.address}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-indigo-500" />
                <span>Joined {joinedDate}</span>
              </div>
            </div>

            {/* =========================================
                STATS
            ========================================= */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {/* Posts */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4 text-center transition hover:border-slate-300 dark:hover:border-slate-700">
                <div className="flex items-center justify-center gap-2">
                  <FileText className="h-4 w-4 text-indigo-500" />
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    {user.posts?.length ?? 0}
                  </span>
                </div>
                <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Posts
                </p>
              </div>

              {/* Followers */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4 text-center transition hover:border-slate-300 dark:hover:border-slate-700">
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-4 w-4 text-indigo-500" />
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    {user.followers?.length ?? 0}
                  </span>
                </div>
                <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Followers
                </p>
              </div>

              {/* Following */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4 text-center transition hover:border-slate-300 dark:hover:border-slate-700">
                <div className="flex items-center justify-center gap-2">
                  <UserPlus className="h-4 w-4 text-indigo-500" />
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    {user.following?.length ?? 0}
                  </span>
                </div>
                <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Following
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            POSTS
        ========================================= */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Posts
              </h2>
              <p className="mt-0.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Posts published by {fullName}
              </p>
            </div>

            {isOwnProfile && (
              <button
                type="button"
                onClick={() => setIsCreatePostOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Create Post
              </button>
            )}
          </div>

          {/* No Posts */}
          {profilePosts.length === 0 ? (
            <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 p-12 text-center shadow-xs">
              <FileText className="mx-auto h-10 w-10 text-slate-400 dark:text-slate-600" />
              <h3 className="mt-4 text-lg font-bold text-slate-800 dark:text-slate-200">
                No posts yet
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {fullName} hasn't published any posts yet.
              </p>
            </div>
          ) : (
            /* Posts */
            <div className="space-y-4">
              {profilePosts.map((post: any) => (
                <PostCard
                  key={post._id}
                  post={post}
                  currentUserId={currentUser?._id ?? currentUser?.id}
                  isOwner={isOwnProfile}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {isOwnProfile && (
        <CreatePostModal
          isOpen={isCreatePostOpen}
          onClose={() => setIsCreatePostOpen(false)}
          userInitials={initials}
          userAvatar={user.avatar}
          userName={fullName}
        />
      )}
    </div>
  );
}
