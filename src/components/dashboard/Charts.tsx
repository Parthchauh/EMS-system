import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const monthlyData = [
  { month: "Jan", employees: 142, attendance: 95 },
  { month: "Feb", employees: 148, attendance: 93 },
  { month: "Mar", employees: 155, attendance: 96 },
  { month: "Apr", employees: 160, attendance: 94 },
  { month: "May", employees: 168, attendance: 97 },
  { month: "Jun", employees: 175, attendance: 95 },
  { month: "Jul", employees: 180, attendance: 92 },
  { month: "Aug", employees: 185, attendance: 96 },
  { month: "Sep", employees: 190, attendance: 94 },
  { month: "Oct", employees: 195, attendance: 97 },
  { month: "Nov", employees: 200, attendance: 95 },
  { month: "Dec", employees: 210, attendance: 96 },
];

export function OverviewChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card rounded-xl p-6"
    >
      <h3 className="font-display font-semibold text-lg mb-6">Employee Growth & Attendance</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="employeeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(215, 80%, 48%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(215, 80%, 48%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(172, 66%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(172, 66%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 13%, 91%)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
            <Area type="monotone" dataKey="employees" stroke="hsl(215, 80%, 48%)" fill="url(#employeeGradient)" strokeWidth={2} />
            <Area type="monotone" dataKey="attendance" stroke="hsl(172, 66%, 50%)" fill="url(#attendanceGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

const departmentData = [
  { name: "Engineering", count: 45 },
  { name: "Marketing", count: 28 },
  { name: "Sales", count: 32 },
  { name: "HR", count: 15 },
  { name: "Finance", count: 20 },
  { name: "Design", count: 18 },
];

export function DepartmentChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card rounded-xl p-6"
    >
      <h3 className="font-display font-semibold text-lg mb-6">Department Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={departmentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(220, 9%, 46%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 13%, 91%)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
            <Bar dataKey="count" fill="hsl(215, 80%, 48%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
