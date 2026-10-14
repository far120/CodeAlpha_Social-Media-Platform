import Spinner from "./Spinner";

interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export default function Loader({
  message = "Loading...",
  fullScreen = true,
}: LoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 transition-colors ${
        fullScreen ? "h-screen w-full" : "h-full w-full py-12"
      }`}
    >
      <Spinner size="lg" />
      {message && (
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{message}</p>
      )}
    </div>
  );
}