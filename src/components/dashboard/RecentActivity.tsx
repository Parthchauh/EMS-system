import { motion } from "framer-motion";
import { UserPlus, Award, CalendarCheck, TrendingUp, AlertCircle } from "lucide-react";

const activities = [
  { id: 1, icon: UserPlus, text: "New employee John Smith added to Engineering", time: "2 min ago", color: "text-primary" },
  { id: 2, icon: CalendarCheck, text: "Leave approved for Sarah Connor (Dec 20-24)", time: "15 min ago", color: "text-success" },
  { id: 3, icon: Award, text: "Performance review completed for Design team", time: "1 hour ago", color: "text-warning" },
  { id: 4, icon: TrendingUp, text: "Monthly payroll processed for November", time: "3 hours ago", color: "text-accent" },
  { id: 5, icon: AlertCircle, text: "3 employees have pending document submissions", time: "5 hours ago", color: "text-destructive" },
];

export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-card rounded-xl p-6"
    >
      <h3 className="font-display font-semibold text-lg mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
            className="flex items-start gap-3 py-2"
          >
            <div className={`p-2 rounded-lg bg-secondary ${activity.color}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">{activity.text}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
