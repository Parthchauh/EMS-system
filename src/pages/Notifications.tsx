import { motion } from "framer-motion";
import { Bell, CheckCircle, AlertCircle, Info, Clock } from "lucide-react";

const notifications = [
  { id: 1, title: "Leave Request Approved", message: "Your leave request for Dec 20-24 has been approved by HR.", time: "2 min ago", type: "success", read: false },
  { id: 2, title: "New Employee Onboarding", message: "David Lee has joined the Engineering department. Welcome aboard!", time: "15 min ago", type: "info", read: false },
  { id: 3, title: "Payroll Processing", message: "November payroll has been processed. Payslips are available for download.", time: "1 hour ago", type: "info", read: false },
  { id: 4, title: "Document Pending", message: "3 employees have pending document submissions. Please follow up.", time: "3 hours ago", type: "warning", read: true },
  { id: 5, title: "Performance Review Due", message: "Q4 performance reviews are due by Dec 31. 12 reviews remaining.", time: "5 hours ago", type: "warning", read: true },
  { id: 6, title: "System Maintenance", message: "Scheduled maintenance on Dec 25, 2024 from 2:00 AM to 6:00 AM.", time: "1 day ago", type: "info", read: true },
  { id: 7, title: "Policy Update", message: "Updated remote work policy is now effective. Please review the changes.", time: "2 days ago", type: "info", read: true },
];

const typeIcons: Record<string, { icon: typeof Bell; color: string }> = {
  success: { icon: CheckCircle, color: "bg-success/10 text-success" },
  warning: { icon: AlertCircle, color: "bg-warning/10 text-warning" },
  info: { icon: Info, color: "bg-primary/10 text-primary" },
};

const Notifications = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="section-title">Notifications</h1>
          <p className="text-muted-foreground text-sm mt-1">{notifications.filter(n => !n.read).length} unread notifications</p>
        </div>
        <button className="text-sm text-primary font-medium hover:underline">Mark all as read</button>
      </div>

      <div className="space-y-3">
        {notifications.map((n, i) => {
          const { icon: Icon, color } = typeIcons[n.type] || typeIcons.info;
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`glass-card rounded-xl p-4 flex items-start gap-4 ${!n.read ? "border-l-4 border-l-primary" : ""}`}
            >
              <div className={`p-2.5 rounded-xl ${color} flex-shrink-0`}><Icon className="w-5 h-5" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`text-sm ${!n.read ? "font-semibold" : "font-medium"}`}>{n.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                    <Clock className="w-3 h-3" />
                    {n.time}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
