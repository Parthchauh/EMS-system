import { motion } from "framer-motion";
import { TrendingUp, Star, Award, Target } from "lucide-react";

const performanceData = [
  { id: 1, name: "John Smith", dept: "Engineering", rating: 4.8, kpi: 95, status: "Excellent", reviews: 12 },
  { id: 2, name: "Sarah Connor", dept: "Marketing", rating: 4.5, kpi: 91, status: "Excellent", reviews: 10 },
  { id: 3, name: "Mike Johnson", dept: "Sales", rating: 4.2, kpi: 88, status: "Good", reviews: 8 },
  { id: 4, name: "Emily Davis", dept: "HR", rating: 4.6, kpi: 92, status: "Excellent", reviews: 9 },
  { id: 5, name: "Robert Brown", dept: "Finance", rating: 3.8, kpi: 78, status: "Average", reviews: 6 },
  { id: 6, name: "Lisa Wilson", dept: "Design", rating: 4.7, kpi: 94, status: "Excellent", reviews: 11 },
  { id: 7, name: "David Lee", dept: "Engineering", rating: 4.4, kpi: 89, status: "Good", reviews: 7 },
];

const ratingColors: Record<string, string> = {
  Excellent: "status-active",
  Good: "status-pending",
  Average: "bg-muted text-muted-foreground status-badge",
};

const Performance = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="section-title">Performance</h1>
          <p className="text-muted-foreground text-sm mt-1">Track employee performance and KPIs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Avg Rating", value: "4.4", icon: Star, color: "bg-warning/10 text-warning" },
          { label: "Avg KPI Score", value: "89%", icon: Target, color: "bg-primary/10 text-primary" },
          { label: "Top Performers", value: "28", icon: Award, color: "bg-success/10 text-success" },
          { label: "Promotions", value: "5", icon: TrendingUp, color: "bg-accent/10 text-accent" },
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
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Department</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rating</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">KPI</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Reviews</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((row, i) => (
                <motion.tr key={row.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium">{row.name}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">{row.dept}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      <span className="text-sm font-semibold">{row.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-secondary rounded-full max-w-[80px]">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${row.kpi}%` }} />
                      </div>
                      <span className="text-xs font-medium">{row.kpi}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell"><span className={ratingColors[row.status]}>{row.status}</span></td>
                  <td className="py-3 px-4 text-sm text-muted-foreground hidden lg:table-cell">{row.reviews} reviews</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Performance;
