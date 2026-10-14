import { useState } from "react";
import { Send, Loader2, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetAllComment, useCreateComment } from "../hooks/usecomment";
import { useToast } from "../../../components/Feedback/Toast";
import CommentItem from "./CommentItem";
import { useuserprofile } from "../../user/hooks/useUserProfile";

interface CommentSectionProps {
  postId: string;
  currentUserId?: string;
}

export default function CommentSection({ postId, currentUserId }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const { data: comments, isLoading } = useGetAllComment(postId);
  const { mutate: createComment, isPending: isSubmitting } = useCreateComment();
  const { userprofile } = useuserprofile();
  const { toast } = useToast();

  const isLoggedIn = Boolean(
    typeof window !== "undefined" &&
      (localStorage.getItem("token") || localStorage.getItem("accessToken"))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    createComment(
      { postId, content: newComment.trim() },
      {
        onSuccess: () => setNewComment(""),
        onError: (err: any) =>
          toast.error(err?.response?.data?.message || "Failed to post comment."),
      }
    );
  };

  const userInitials = userprofile
    ? `${userprofile.firstName[0]}${userprofile.lastName?.[0] || ""}`.toUpperCase()
    : "U";

  return (
    <div className="space-y-4">
      {/* Comment list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-6 text-slate-500 dark:text-slate-400 gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
          <span className="text-xs font-semibold">Loading comments...</span>
        </div>
      ) : !comments || comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-slate-500 dark:text-slate-400 gap-2">
          <MessageSquare className="w-7 h-7 opacity-40 text-indigo-500" />
          <p className="text-xs font-medium">No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={postId}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}

      {/* New comment input */}
      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="flex gap-3 pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
          {/* Current user avatar */}
          {userprofile?.avatar ? (
            <img
              src={userprofile.avatar}
              alt="You"
              className="w-9 h-9 rounded-xl object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0 mt-0.5 shadow-xs"
            />
          ) : (
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5 shadow-xs">
              {userInitials}
            </div>
          )}
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a thoughtful comment..."
              className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-xs"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
            />
            <button
              type="submit"
              disabled={isSubmitting || !newComment.trim()}
              className="flex-shrink-0 p-2.5 rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
              aria-label="Post comment"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 text-center">
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <Link to="/login" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              Log in
            </Link>{" "}
            to join the conversation and leave a reply.
          </p>
        </div>
      )}
    </div>
  );
}
