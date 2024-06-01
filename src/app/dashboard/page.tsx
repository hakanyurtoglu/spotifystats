import DashboardHeader from "@/components/DashboardHeader";
import { DashboardTabs } from "@/components/DashboardTabs";
import { Separator } from "@/components/ui/separator";

export default async function DashboardPage() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <DashboardHeader />
      <Separator />
      <div className="flex items-center gap-x-6 my-8">
        <DashboardTabs />
      </div>
    </div>
  );
}
