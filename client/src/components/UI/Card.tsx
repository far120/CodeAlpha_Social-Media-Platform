import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className = "", hoverable = false, ...props }: CardProps) {
  return (
    <div
      className={`bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs dark:shadow-xl transition-all duration-200 ${
        hoverable ? "hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
