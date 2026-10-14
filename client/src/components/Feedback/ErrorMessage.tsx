import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  title = "Something went wrong",
  message = "Please try again later.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 py-12 text-center">
      <AlertCircle className="h-10 w-10 text-red-500" />
      <h3 className="text-base font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      )}
    </div>
  );
}