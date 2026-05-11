import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { MarketOverview } from "@/components/dashboard/MarketOverview";
import { RecentTrades } from "@/components/dashboard/RecentTrades";

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6 max-w-7xl mx-auto">
        <StatsGrid />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentTrades />
          </div>
          <div>
            <MarketOverview />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
