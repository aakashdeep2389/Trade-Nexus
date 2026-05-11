import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}

export function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function formatChange(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}`;
}

export function getPnlColor(value: number): string {
  return value >= 0 ? "text-green-trade" : "text-red-trade";
}

export function formatVolume(volume: number): string {
  if (volume >= 10000000) return `${(volume / 10000000).toFixed(2)}Cr`;
  if (volume >= 100000) return `${(volume / 100000).toFixed(2)}L`;
  if (volume >= 1000) return `${(volume / 1000).toFixed(2)}K`;
  return volume.toString();
}

export function formatMarketCap(value: string): string {
  return value;
}
