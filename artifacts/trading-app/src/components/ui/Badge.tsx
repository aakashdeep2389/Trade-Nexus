import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "green" | "red" | "accent" | "neutral";
  className?: string;
}

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
        {
          "bg-green-trade/10 text-green-trade": variant === "green",
          "bg-red-trade/10 text-red-trade": variant === "red",
          "bg-accent/10 text-accent": variant === "accent",
          "bg-bg-primary text-text-secondary": variant === "neutral",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
