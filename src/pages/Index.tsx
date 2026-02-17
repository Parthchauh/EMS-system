import { Users, Building2, CalendarCheck, CalendarOff, Wallet } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { OverviewChart, DepartmentChart } from "@/components/dashboard/Charts";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

const Dashboard = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="section-title">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Welcome back, Admin. Here's your company overview.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total Employees" value={210} icon={Users} trend="+5.2% from last month" trendUp delay={0} color="primary" />
        <StatCard title="Departments" value={8} icon={Building2} delay={100} color="accent" />
        <StatCard title="Attendance Rate" value={96} suffix="%" icon={CalendarCheck} trend="+1.3% this week" trendUp delay={200} color="success" />
        <StatCard title="Pending Leaves" value={12} icon={CalendarOff} trend="3 urgent" delay={300} color="warning" />
        <StatCard title="Monthly Payroll" value={485} suffix="K" icon={Wallet} trend="+2.1% from last month" trendUp delay={400} color="primary" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverviewChart />
        <DepartmentChart />
      </div>

      {/* Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-display font-semibold text-lg mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Add Employee", icon: Users },
              { label: "Mark Attendance", icon: CalendarCheck },
              { label: "Process Payroll", icon: Wallet },
              { label: "View Reports", icon: Building2 },
            ].map((action) => (
              <button
                key={action.label}
                className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium"
              >
                <action.icon className="w-4 h-4 text-primary" />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
