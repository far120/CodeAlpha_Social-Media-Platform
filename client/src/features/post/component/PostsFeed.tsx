import { useState } from "react";
import { PlusCircle, RefreshCw, Loader2, AlertCircle, Newspaper, Sparkles } from "lucide-react";
import { useGetAllPost } from "../hooks/usepost";
import PostCard from "./PostCard";
import CreatePostModal from "./CreatePostModal";
import { useuserprofile } from "../../user/hooks/useUserProfile";

export default function PostsFeed() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { data: posts, isLoading, isError, error, refetch, isFetching } = useGetAllPost();
  const { userprofile } = useuserprofile();

  const isLoggedIn = Boolean(
    typeof window !== "undefined" &&
      (localStorage.getItem("token") || localStorage.getItem("accessToken"))
  );

  const currentUserId = userprofile?._id || userprofile?.id;

  const userInitials = userprofile
    ? `${userprofile.firstName[0]}${userprofile.lastName?.[0] || ""}`.toUpperCase()
    : "U";

  const userName = userprofile
    ? `${userprofile.firstName} ${userprofile.lastName || ""}`.trim()
    : "User";

  return (
    <div className="max-w-2xl mx-auto w-full space-y-6">
      {/* Create post prompt */}
      {isLoggedIn && (
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-sm dark:shadow-lg dark:shadow-slate-950/40 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300">
          <div className="flex items-center gap-3.5">
            {userprofile?.avatar ? (
              <img
                src={userprofile.avatar}
                alt={userName}
                className="w-11 h-11 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0 shadow-sm"
              />
            ) : (
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm">
                {userInitials}
              </div>
            )}
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="flex-1 text-left px-4 py-3 bg-slate-100/90 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-all cursor-pointer font-medium"
            >
              What's on your mind, {userprofile?.firstName || "there"}?
            </button>
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-600/20 active:scale-95 transition-all flex-shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Post</span>
            </button>
          </div>
        </div>
      )}

      {/* Feed header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Newspaper className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {posts ? `${posts.length} post${posts.length !== 1 ? "s" : ""}` : "Community Feed"}
          </span>
        </div>
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm transition-all cursor-pointer"
          aria-label="Refresh feed"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-indigo-500 ${isFetching ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/40 rounded-3xl border border-slate-200/60 dark:border-slate-800/60">
          <Loader2 className="w-9 h-9 animate-spin text-indigo-500" />
          <p className="text-sm font-semibold">Loading latest feed...</p>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="flex items-start gap-4 p-6 rounded-3xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-red-900 dark:text-white">Failed to load posts</p>
            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
              {(error as any)?.response?.data?.message ||
                (error as any)?.message ||
                "Something went wrong while fetching posts. Please try again."}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline transition-colors cursor-pointer"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && posts && posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-6 gap-4 text-center bg-white/80 dark:bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-slate-800 flex items-center justify-center text-indigo-500 dark:text-indigo-400 shadow-sm">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">No posts in the feed yet</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
              {isLoggedIn ? "Be the trendsetter! Share the first post with the community today." : "Sign in to start posting and interacting with posts."}
            </p>
          </div>
          {isLoggedIn && (
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-600/25 active:scale-95 transition-all mt-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Create First Post
            </button>
          )}
        </div>
      )}

      {/* Posts */}
      {!isLoading && posts && posts.length > 0 && (
        <div className="space-y-5">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}

      {/* Create post modal */}
      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        userInitials={userInitials}
        userAvatar={userprofile?.avatar}
        userName={userName}
      />
    </div>
  );
}
