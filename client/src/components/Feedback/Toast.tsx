import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

export type ToastVariant = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, variant?: ToastVariant, duration?: number) => void;
  toast: {
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
  };
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const variantConfig: Record<
  ToastVariant,
  { icon: React.ReactNode; borderClass: string; bgClass: string }
> = {
  success: {
    icon: <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />,
    borderClass: "border-emerald-200 dark:border-emerald-500/30",
    bgClass: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  error: {
    icon: <XCircle className="h-5 w-5 text-red-500 shrink-0" />,
    borderClass: "border-red-200 dark:border-red-500/30",
    bgClass: "bg-red-50 dark:bg-red-500/10",
  },
  info: {
    icon: <Info className="h-5 w-5 text-indigo-500 shrink-0" />,
    borderClass: "border-indigo-200 dark:border-indigo-500/30",
    bgClass: "bg-indigo-50 dark:bg-indigo-500/10",
  },
};

export function ToastCard({
  item,
  onClose,
}: {
  item: ToastItem;
  onClose: (id: string) => void;
}) {
  const { icon, borderClass, bgClass } = variantConfig[item.variant || "info"];

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(item.id);
    }, item.duration || 4000);
    return () => clearTimeout(timer);
  }, [item.id, item.duration, onClose]);

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 w-full max-w-sm rounded-2xl border ${borderClass} bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 py-3.5 shadow-xl dark:shadow-2xl text-slate-900 dark:text-slate-100 transition-all duration-300 animate-in fade-in slide-in-from-top-3`}
      role="status"
    >
      <div className={`p-1.5 rounded-xl ${bgClass}`}>{icon}</div>
      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex-1 leading-snug">
        {item.message}
      </p>
      <button
        type="button"
        onClick={() => onClose(item.id)}
        className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        aria-label="Close toast"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "info", duration = 4000) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, variant, duration }]);
    },
    []
  );

  const toast = {
    success: useCallback((msg: string, dur?: number) => showToast(msg, "success", dur), [showToast]),
    error: useCallback((msg: string, dur?: number) => showToast(msg, "error", dur), [showToast]),
    info: useCallback((msg: string, dur?: number) => showToast(msg, "info", dur), [showToast]),
  };

  return (
    <ToastContext.Provider value={{ showToast, toast, removeToast }}>
      {children}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((item) => (
          <ToastCard key={item.id} item={item} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastCard;