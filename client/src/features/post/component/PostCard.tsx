import {
  Heart,
  MessageCircle,
  Trash2,
  Pencil,
  MoreHorizontal,
  Check,
  X,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type {
  Ipost,
  IPostUser,
} from "../../post/type/post.types";

import {
  useToggleLikePost,
  useDeletePost,
  useUpdatePost,
} from "../../post/hooks/usepost";

import { useToast } from "../../../components/Feedback/Toast";

import CommentSection from "../../comment/component/CommentSection";

interface PostCardProps {
  post?: Ipost;
  currentUserId?: string;
  isOwner?: boolean;
}

// ========================================
// Helpers
// ========================================

function normalizeId(
  id: string | undefined | null
): string | null {
  if (!id) return null;
  return id.toString();
}

function getUser(
  user: Ipost["user"]
): IPostUser | null {
  if (!user) return null;
  if (typeof user === "string") return null;
  return user as IPostUser;
}

function getUserId(
  user: Ipost["user"]
): string | null {
  if (!user) return null;
  if (typeof user === "string") return user;
  return user._id ?? user.id ?? null;
}

// ========================================
// Component
// ========================================

export default function PostCard({
  post,
  currentUserId,
  isOwner: ownerOverride,
}: PostCardProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleLike = useToggleLikePost();
  const deletePost = useDeletePost();
  const updatePost = useUpdatePost();

  // ========================================
  // Prevent undefined post crash
  // ========================================
  if (!post) {
    return null;
  }

  // ========================================
  // State
  // ========================================
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [editContent, setEditContent] = useState(post.content || "");

  // ========================================
  // User
  // ========================================
  const author = getUser(post.user);
  const authorId = getUserId(post.user);
  const normalizedAuthorId = normalizeId(authorId);
  const normalizedCurrentUserId = normalizeId(currentUserId);

  // ========================================
  // Ownership
  // ========================================
  const isOwnerById =
    Boolean(normalizedCurrentUserId) &&
    Boolean(normalizedAuthorId) &&
    normalizedCurrentUserId === normalizedAuthorId;

  const isOwner = ownerOverride ?? isOwnerById;

  // ========================================
  // Like status
  // ========================================
  const isLiked = Boolean(
    normalizedCurrentUserId &&
    post.likes?.some((like) => {
      const likeId =
        typeof like === "string"
          ? like
          : (like as IPostUser)?._id;

      return normalizeId(likeId) === normalizedCurrentUserId;
    })
  );

  // ========================================
  // Author information
  // ========================================
  const authorName = author
    ? `${author.firstName || ""} ${author.lastName || ""}`.trim() || "Unknown User"
    : "Unknown User";

  const authorInitials =
    `${author?.firstName?.[0] || ""}${author?.lastName?.[0] || ""}`.toUpperCase() || "U";

  // ========================================
  // Like
  // ========================================
  const handleToggleLike = () => {
    if (!post._id || !currentUserId || toggleLike.isPending) {
      return;
    }

    toggleLike.mutate(post._id, {
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
          "Failed to update like."
        );
      },
    });
  };

  // ========================================
  // Delete
  // ========================================
  const handleDelete = () => {
    if (!post._id || !isOwner) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) {
      return;
    }

    deletePost.mutate(post._id, {
      onSuccess: () => {
        setShowMenu(false);
        toast.success("Post deleted successfully.");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
          "Failed to delete post."
        );
      },
    });
  };

  // ========================================
  // Start editing
  // ========================================
  const handleStartEdit = () => {
    if (!isOwner) return;
    setEditContent(post.content || "");
    setShowMenu(false);
    setIsEditing(true);
  };

  // ========================================
  // Cancel editing
  // ========================================
  const handleCancelEdit = () => {
    setEditContent(post.content || "");
    setIsEditing(false);
  };

  // ========================================
  // Update
  // ========================================
  const handleUpdate = () => {
    if (!post._id || !isOwner || !editContent.trim()) {
      return;
    }

    updatePost.mutate(
      {
        id: post._id,
        post: {
          content: editContent.trim(),
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          toast.success("Post updated successfully.");
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ||
            "Failed to update post."
          );
        },
      }
    );
  };

  // ========================================
  // Navigate to author
  // ========================================
  const handleAuthorClick = () => {
    if (!normalizedAuthorId) return;
    navigate(`/users/${normalizedAuthorId}`);
  };

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md shadow-sm dark:shadow-xl dark:shadow-slate-950/40 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700/80">
      {/* ====================================
          HEADER
      ==================================== */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 px-5 py-4">
        <button
          type="button"
          onClick={handleAuthorClick}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
        >
          {/* Avatar */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 font-bold text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            {author?.avatar ? (
              <img
                src={author.avatar}
                alt={authorName}
                className="h-full w-full object-cover"
              />
            ) : (
              authorInitials
            )}
          </div>

          {/* Name & info */}
          <div>
            <p className="font-bold text-slate-900 dark:text-white transition group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-sm sm:text-base">
              {authorName}
            </p>
            {author?.email && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {author.email}
              </p>
            )}
          </div>
        </button>

        {/* ==================================
            OWNER MENU
        ================================== */}
        {isOwner && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMenu((prev) => !prev)}
              className="rounded-xl p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              aria-label="Post actions"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-11 z-20 w-44 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl dark:shadow-2xl animate-in fade-in zoom-in-95 duration-100 p-1">
                {/* Edit */}
                <button
                  type="button"
                  onClick={handleStartEdit}
                  disabled={updatePost.isPending || deletePost.isPending}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition disabled:opacity-50 cursor-pointer"
                >
                  <Pencil className="h-4 w-4" />
                  <span>Edit Post</span>
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deletePost.isPending}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition disabled:opacity-50 cursor-pointer"
                >
                  {deletePost.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  <span>Delete Post</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ====================================
          CONTENT
      ==================================== */}
      <div className="px-5 py-5">
        {isEditing ? (
          <div className="space-y-4">
            {/* Content */}
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              maxLength={2000}
              rows={5}
              placeholder="Edit your post content..."
              className="w-full resize-none rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm leading-6 text-slate-900 dark:text-white outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={updatePost.isPending}
                className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition disabled:opacity-50 cursor-pointer"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>

              <button
                type="button"
                onClick={handleUpdate}
                disabled={updatePost.isPending || !editContent.trim()}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 shadow-md shadow-indigo-600/20 cursor-pointer"
              >
                {updatePost.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                {updatePost.isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Content */}
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-300">
              {post.content}
            </p>

            {/* Image */}
            {post.image && (
              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                <img
                  src={post.image}
                  alt="Post image"
                  className="max-h-[500px] w-full object-cover"
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* ====================================
          ACTIONS
      ==================================== */}
      {!isEditing && (
        <>
          <div className="flex items-center gap-6 border-t border-slate-100 dark:border-slate-800/80 px-5 py-3">
            {/* Like */}
            <button
              type="button"
              onClick={handleToggleLike}
              disabled={!currentUserId || toggleLike.isPending}
              className={`flex items-center gap-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ${
                isLiked
                  ? "text-rose-500 font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400"
              }`}
            >
              {toggleLike.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Heart
                  className="h-5 w-5 transition-transform active:scale-125"
                  fill={isLiked ? "currentColor" : "none"}
                />
              )}
              <span>{post.likes?.length ?? 0}</span>
            </button>

            {/* Comments */}
            <button
              type="button"
              onClick={() => setShowComments((prev) => !prev)}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{post.comments?.length ?? 0}</span>
              {showComments ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="border-t border-slate-100 dark:border-slate-800/80 px-5 py-5 bg-slate-50/60 dark:bg-slate-950/40">
              <CommentSection
                postId={post._id!}
                currentUserId={currentUserId}
              />
            </div>
          )}
        </>
      )}
    </article>
  );
}