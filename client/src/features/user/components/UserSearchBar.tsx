import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Loader2, User, ShieldCheck } from "lucide-react";
import { searchUsers } from "../api/user.api";
import type { Iuser } from "../types/user.types";

interface UserSearchBarProps {
  className?: string;
  onResultClick?: () => void;
}

export default function UserSearchBar({
  className = "",
  onResultClick,
}: UserSearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Iuser[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Debounced search query
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsOpen(true);

    const timer = setTimeout(async () => {
      try {
        const data = await searchUsers(trimmed);
        setResults(data);
      } catch (err) {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectUser = (userId: string) => {
    setIsOpen(false);
    setQuery("");
    if (onResultClick) onResultClick();
    navigate(`/users/${userId}`);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          placeholder="Search by username or name..."
          className="w-full pl-9 pr-8 py-1.5 sm:py-2 text-xs sm:text-sm bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
              setIsOpen(false);
            }}
            className="absolute right-2.5 p-0.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-slate-950/80 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 p-6 text-slate-400 dark:text-slate-500 text-xs">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
              <span>Searching users...</span>
            </div>
          ) : results.length > 0 ? (
            <div className="p-1.5 space-y-0.5">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Users ({results.length})
              </div>
              {results.map((user) => {
                const userId = user._id || user.id || "";
                const initials =
                  user.firstName && user.lastName
                    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
                    : user.firstName
                    ? user.firstName.slice(0, 2).toUpperCase()
                    : "U";

                const usernameDisplay =
                  user.username ||
                  `${user.firstName}${user.lastName || ""}`
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, "");

                return (
                  <button
                    key={userId}
                    type="button"
                    onClick={() => handleSelectUser(userId)}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-left hover:bg-indigo-50/80 dark:hover:bg-slate-800/70 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.firstName}
                          className="w-8 h-8 rounded-xl object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
                          {initials}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {user.firstName} {user.lastName}
                          </span>
                          {user.role === "super-admin" && (
                            <ShieldCheck className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 truncate block">
                          @{usernameDisplay}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex-shrink-0 border border-slate-200/50 dark:border-slate-700/50">
                      {user.role}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center text-slate-400 dark:text-slate-500 text-xs">
              <User className="w-6 h-6 mx-auto mb-2 opacity-40" />
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                No users found
              </p>
              <p className="text-[11px] mt-0.5">
                Try searching by first name, last name, or username.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
