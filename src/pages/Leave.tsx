import { motion } from "framer-motion";
import { CalendarOff, CheckCircle, XCircle, Clock, Plus } from "lucide-react";

const leaves = [
  { id: 1, name: "Sarah Connor", type: "Annual Leave", from: "2024-12-20", to: "2024-12-24", days: 5, status: "Approved", reason: "Family vacation" },
  { id: 2, name: "Mike Johnson", type: "Sick Leave", from: "2024-12-18", to: "2024-12-18", days: 1, status: "Approved", reason: "Medical appointment" },
  { id: 3, name: "David Lee", type: "Personal Leave", from: "2024-12-22", to: "2024-12-23", days: 2, status: "Pending", reason: "Personal matters" },
  { id: 4, name: "Anna Martinez", type: "Annual Leave", from: "2024-12-25", to: "2024-12-31", days: 5, status: "Pending", reason: "Holiday travel" },
  { id: 5, name: "John Smith", type: "Sick Leave", from: "2024-12-15", to: "2024-12-16", days: 2, status: "Rejected", reason: "Not feeling well" },
  { id: 6, name: "Lisa Wilson", type: "Maternity Leave", from: "2025-01-15", to: "2025-04-15", days: 90, status: "Approved", reason: "Maternity" },
];

const statusMap: Record<string, { className: string; icon: typeof CheckCircle }> = {
  Approved: { className: "status-active", icon: CheckCircle },
  Pending: { className: "status-pending", icon: Clock },
  Rejected: { className: "status-inactive", icon: XCircle },
};

const Leave = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="section-title">Leave Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage employee leave requests</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm shadow-lg shadow-primary/25">
          <Plus className="w-4 h-4" />
          Apply Leave
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Approved", value: 24, color: "bg-success/10 text-success", icon: CheckCircle },
          { label: "Pending", value: 8, color: "bg-warning/10 text-warning", icon: Clock },
          { label: "Rejected", value: 3, color: "bg-destructive/10 text-destructive", icon: XCircle },
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

      <div className="table-container">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Employee</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Type</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Duration</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Days</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave, i) => {
                const st = statusMap[leave.status];
                return (
                  <motion.tr key={leave.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium">{leave.name}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">{leave.type}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground hidden sm:table-cell">{leave.from} → {leave.to}</td>
                    <td className="py-3 px-4 text-sm font-medium">{leave.days}</td>
                    <td className="py-3 px-4"><span className={st.className}>{leave.status}</span></td>
                    <td className="py-3 px-4 text-right">
                      {leave.status === "Pending" && (
                        <div className="flex items-center justify-end gap-1">
                          <button className="px-2 py-1 rounded text-xs bg-success/10 text-success hover:bg-success/20 transition-colors">Approve</button>
                          <button className="px-2 py-1 rounded text-xs bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">Reject</button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leave;
