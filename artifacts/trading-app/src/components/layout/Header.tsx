"use client";

import { Bell, Search } from "lucide-react";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="h-14 bg-bg-card border-b border-border-dark flex items-center justify-between px-6 sticky top-0 z-30">
      <h1 className="text-base font-semibold text-text-primary">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 w-3.5 h-3.5 text-text-secondary" />
          <input
            type="text"
            placeholder="Search stocks..."
            className="bg-bg-primary border border-border-dark rounded-lg pl-9 pr-4 py-1.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent w-52 transition-colors"
          />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-bg-primary text-text-secondary hover:text-text-primary transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full"></span>
        </button>
        <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent text-sm font-semibold">
          U
        </div>
      </div>
    </header>
  );
}
