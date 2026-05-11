import { cn, formatCurrency, formatPercent } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: LucideIcon;
  isCurrency?: boolean;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  isCurrency,
  className,
}: StatCardProps) {
  const isPositive = change !== undefined ? change >= 0 : true;

  return (
    <div
      className={cn(
        "bg-bg-card border border-border-dark rounded-xl p-5 hover:border-accent/30 transition-colors",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className="p-2 bg-bg-primary rounded-lg">
            <Icon className="w-4 h-4 text-accent" />
          </div>
        )}
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-text-primary">
          {isCurrency && typeof value === "number"
            ? formatCurrency(value)
            : value}
        </div>
        {change !== undefined && (
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              isPositive ? "text-green-trade" : "text-red-trade"
            )}
          >
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>{formatPercent(change)}</span>
            {changeLabel && (
              <span className="text-text-secondary font-normal">
                {changeLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
