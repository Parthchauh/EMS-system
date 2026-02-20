import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, Plus, Trash2 } from "lucide-react";
import { useLeaveRequests } from "@/hooks/useLeaveRequests";
import { useUserRole } from "@/hooks/useUserRole";
import { useAuth } from "@/contexts/AuthContext";
import { LeaveDialog } from "@/components/leave/LeaveDialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const statusMap: Record<string, { className: string; icon: typeof CheckCircle }> = {
  Approved: { className: "status-active", icon: CheckCircle },
  Pending: { className: "status-pending", icon: Clock },
  Rejected: { className: "status-inactive", icon: XCircle },
};

const Leave = () => {
  const { leaves, isLoading, applyLeave, updateStatus, deleteLeave, stats } = useLeaveRequests();
  const { isAdmin } = useUserRole();
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const userName = user?.user_metadata?.full_name || user?.email || "";

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="section-title">Leave Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage employee leave requests</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setDialogOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm shadow-lg shadow-primary/25"
        >
          <Plus className="w-4 h-4" />
          Apply Leave
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Approved", value: stats.approved, color: "bg-success/10 text-success", icon: CheckCircle },
          { label: "Pending", value: stats.pending, color: "bg-warning/10 text-warning", icon: Clock },
          { label: "Rejected", value: stats.rejected, color: "bg-destructive/10 text-destructive", icon: XCircle },
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
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground text-sm">Loading...</div>
          ) : leaves.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">No leave requests yet. Click "Apply Leave" to create one.</div>
          ) : (
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
                  const st = statusMap[leave.status] || statusMap.Pending;
                  return (
                    <motion.tr key={leave.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium">{leave.employee_name}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">{leave.leave_type}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground hidden sm:table-cell">{leave.from_date} → {leave.to_date}</td>
                      <td className="py-3 px-4 text-sm font-medium">{leave.days}</td>
                      <td className="py-3 px-4"><span className={st.className}>{leave.status}</span></td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {isAdmin && leave.status === "Pending" && (
                            <>
                              <button onClick={() => updateStatus.mutate({ id: leave.id, status: "Approved" })} className="px-2 py-1 rounded text-xs bg-success/10 text-success hover:bg-success/20 transition-colors">Approve</button>
                              <button onClick={() => updateStatus.mutate({ id: leave.id, status: "Rejected" })} className="px-2 py-1 rounded text-xs bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">Reject</button>
                            </>
                          )}
                          <button onClick={() => setDeleteTarget(leave.id)} className="p-1 rounded hover:bg-secondary transition-colors">
                            <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <LeaveDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={(data) => {
          applyLeave.mutate(data);
          setDialogOpen(false);
        }}
        loading={applyLeave.isPending}
        userName={userName}
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this leave request?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deleteTarget) { deleteLeave.mutate(deleteTarget); setDeleteTarget(null); } }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Leave;
