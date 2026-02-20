import { motion } from "framer-motion";
import { Shield, Users, Building2, CalendarOff, BarChart3 } from "lucide-react";
import { useLeaveRequests } from "@/hooks/useLeaveRequests";
import { useDepartments } from "@/hooks/useDepartments";

const Admin = () => {
  const { leaves, stats, updateStatus } = useLeaveRequests();
  const { departments } = useDepartments();
  const pendingLeaves = leaves.filter((l) => l.status === "Pending");

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="section-title">Admin Panel</h1>
          <p className="text-muted-foreground text-sm mt-1">System overview and management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Departments", value: departments.length, icon: Building2, color: "bg-primary/10 text-primary" },
          { label: "Pending Leaves", value: stats.pending, icon: CalendarOff, color: "bg-warning/10 text-warning" },
          { label: "Approved Leaves", value: stats.approved, icon: BarChart3, color: "bg-success/10 text-success" },
          { label: "Total Requests", value: leaves.length, icon: Users, color: "bg-accent/10 text-accent" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold font-display mt-1">{s.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${s.color}`}><s.icon className="w-5 h-5" /></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pending Leave Approvals */}
      <div>
        <h2 className="section-title text-lg mb-4">Pending Leave Approvals</h2>
        {pendingLeaves.length === 0 ? (
          <div className="glass-card rounded-xl p-8 text-center">
            <Shield className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No pending leave requests</p>
          </div>
        ) : (
          <div className="table-container">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Employee</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Type</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">Duration</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Days</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase hidden lg:table-cell">Reason</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingLeaves.map((leave) => (
                    <tr key={leave.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium">{leave.employee_name}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">{leave.leave_type}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground hidden sm:table-cell">{leave.from_date} → {leave.to_date}</td>
                      <td className="py-3 px-4 text-sm font-medium">{leave.days}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground hidden lg:table-cell max-w-[200px] truncate">{leave.reason}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => updateStatus.mutate({ id: leave.id, status: "Approved" })}
                            className="px-2 py-1 rounded text-xs bg-success/10 text-success hover:bg-success/20 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus.mutate({ id: leave.id, status: "Rejected" })}
                            className="px-2 py-1 rounded text-xs bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
