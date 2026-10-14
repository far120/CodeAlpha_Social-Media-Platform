import { useState, useRef } from "react";
import {
  X,
  ImagePlus,
  Loader2,
  FileText,
  Send,
  Sparkles,
} from "lucide-react";
import { useCreatePost } from "../hooks/usepost";
import { useToast } from "../../../components/Feedback/Toast";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  userInitials: string;
  userAvatar?: string;
  userName: string;
}

export default function CreatePostModal({
  isOpen,
  onClose,
  userInitials,
  userAvatar,
  userName,
}: CreatePostModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: createPost, isPending } = useCreatePost();
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!content.trim()) {
      toast.error("Post content cannot be empty.");
      return;
    }
    createPost(
      { title: title.trim() || undefined, content: content.trim(), image: image.trim() || undefined },
      {
        onSuccess: () => {
          toast.success("Post published! 🎉");
          setTitle("");
          setContent("");
          setImage("");
          setShowImageInput(false);
          onClose();
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Failed to create post.");
        },
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={handleKeyDown}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-500/10 blur-3xl rounded-full" />
      </div>

      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl shadow-slate-900/20 dark:shadow-slate-950/80 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Create New Post</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* User row */}
          <div className="flex items-center gap-3">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                {userInitials}
              </div>
            )}
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{userName}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Public post • Anyone can view and reply</p>
            </div>
          </div>

          {/* Title */}
          <div className="relative">
            <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title (optional)"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
            />
          </div>

          {/* Content */}
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind? Share your thoughts, questions, or ideas..."
            rows={5}
            className="w-full p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm resize-none leading-relaxed"
          />

          {/* Image URL toggle */}
          {showImageInput && (
            <div className="relative">
              <ImagePlus className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL (e.g. https://images.unsplash.com/...)"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
              />
            </div>
          )}

          {/* Image preview */}
          {image && (
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-48">
              <img
                src={image}
                alt="Preview"
                className="w-full max-h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 pb-5 gap-3 border-t border-slate-100 dark:border-slate-800/80 pt-4">
          <button
            type="button"
            onClick={() => setShowImageInput((v) => !v)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              showImageInput
                ? "bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent"
            }`}
          >
            <ImagePlus className="w-4 h-4" />
            <span>{showImageInput ? "Hide Image" : "Add Image"}</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPending || !content.trim()}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-600/25 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Publish</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
