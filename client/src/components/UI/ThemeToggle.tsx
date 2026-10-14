import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useState, useRef, useEffect } from "react";

interface ThemeToggleProps {
  variant?: "icon" | "dropdown" | "pill";
  className?: string;
}

export default function ThemeToggle({ variant = "icon", className = "" }: ThemeToggleProps) {
  const { theme, resolvedTheme, isDark, setTheme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  if (variant === "pill") {
    return (
      <div
        className={`inline-flex items-center p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60 backdrop-blur-md transition-colors ${className}`}
        role="group"
        aria-label="Color scheme selection"
      >
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
            theme === "light"
              ? "bg-white text-amber-600 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
          title="Light theme"
        >
          <Sun className="w-3.5 h-3.5" />
          <span>Light</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
            theme === "dark"
              ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
          title="Dark theme"
        >
          <Moon className="w-3.5 h-3.5" />
          <span>Dark</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme("system")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
            theme === "system"
              ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
          title="System preference"
        >
          <Laptop className="w-3.5 h-3.5" />
          <span>Auto</span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode (currently ${resolvedTheme})`}
      title={`Switch to ${isDark ? "light (white mode)" : "dark mode"}`}
      className={`relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        <Sun
          className={`w-4 h-4 text-amber-500 absolute transition-all duration-300 ${
            isDark
              ? "scale-0 -rotate-90 opacity-0"
              : "scale-100 rotate-0 opacity-100"
          }`}
        />
        <Moon
          className={`w-4 h-4 text-indigo-400 absolute transition-all duration-300 ${
            isDark
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 rotate-90 opacity-0"
          }`}
        />
      </div>
    </button>
  );
}
