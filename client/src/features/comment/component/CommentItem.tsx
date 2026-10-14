import { useState } from "react";
import { Trash2, Pencil, Check, X, Loader2 } from "lucide-react";
import type { IPopulatedComment, ICommentUser } from "../type/comment.types";
import { useUpdateComment, useDeleteComment } from "../hooks/usecomment";
import { useToast } from "../../../components/Feedback/Toast";

interface CommentItemProps {
  comment: IPopulatedComment;
  postId: string;
  currentUserId?: string;
}

function formatDate(date: string): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getUser(user: IPopulatedComment["user"]): ICommentUser | null {
  if (!user || typeof user === "string") return null;
  return user as ICommentUser;
}

export default function CommentItem({ comment, postId, currentUserId }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const { mutate: updateComment, isPending: isUpdating } = useUpdateComment();
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();
  const { toast } = useToast();

  const author = getUser(comment.user);

  const isOwner =
    Boolean(currentUserId) &&
    Boolean(author) &&
    author?._id === currentUserId;

  const initials = author
    ? `${author.firstName[0]}${author.lastName?.[0] || ""}`.toUpperCase()
    : "U";

  const displayName = author
    ? `${author.firstName} ${author.lastName || ""}`.trim()
    : "Unknown";

  const handleSave = () => {
    if (!editContent.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }
    updateComment(
      { postId, id: comment._id!, content: editContent.trim() },
      {
        onSuccess: () => {
          toast.success("Comment updated.");
          setIsEditing(false);
        },
        onError: (err: any) =>
          toast.error(err?.response?.data?.message || "Failed to update comment."),
      }
    );
  };

  const handleDelete = () => {
    deleteComment(
      { postId, id: comment._id! },
      {
        onSuccess: () => toast.success("Comment deleted."),
        onError: (err: any) =>
          toast.error(err?.response?.data?.message || "Failed to delete comment."),
      }
    );
  };

  return (
    <div className="flex gap-3 group/comment py-1.5">
      {/* Avatar */}
      {author?.avatar ? (
        <img
          src={author.avatar}
          alt={displayName}
          className="w-8 h-8 rounded-xl object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0 mt-0.5 shadow-xs"
        />
      ) : (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500/80 to-violet-500/80 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5 shadow-xs">
          {initials}
        </div>
      )}

      {/* Bubble */}
      <div className="flex-1 min-w-0">
        <div className="bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl px-4 py-3 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{displayName}</span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 flex-shrink-0">
              {formatDate(comment.createdAt!)}
            </span>
          </div>

          {isEditing ? (
            <div className="space-y-2 mt-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={2}
                autoFocus
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all text-xs resize-none"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isUpdating}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-xs cursor-pointer"
                >
                  {isUpdating ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Check className="w-3 h-3" />
                  )}
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditContent(comment.content);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
                >
                  <X className="w-3 h-3" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed break-words">{comment.content}</p>
          )}
        </div>

        {/* Owner actions */}
        {isOwner && !isEditing && (
          <div className="flex gap-3 mt-1 ml-2 opacity-0 group-hover/comment:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              <Pencil className="w-3 h-3" />
              Edit
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isDeleting ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Trash2 className="w-3 h-3" />
              )}
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
