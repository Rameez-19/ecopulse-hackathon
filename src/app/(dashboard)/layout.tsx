import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex flex-1 flex-col md:pl-64">
        {/* Main content padding accounting for fixed Sidebar */}
        <div className="mx-auto w-full max-w-7xl p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
