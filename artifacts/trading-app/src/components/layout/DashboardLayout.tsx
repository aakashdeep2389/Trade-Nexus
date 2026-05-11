import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar />
      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        <Header title={title} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
