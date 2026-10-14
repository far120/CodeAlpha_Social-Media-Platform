import { Loader2 } from "lucide-react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export default function Spinner({ size = "md", className = "" }: SpinnerProps) {
  return (
    <Loader2
      className={`animate-spin text-indigo-600 dark:text-indigo-400 ${sizeMap[size]} ${className}`}
    />
  );
}