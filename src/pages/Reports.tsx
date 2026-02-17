import { motion } from "framer-motion";
import { BarChart3, Download, FileText } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const growthData = [
  { month: "Jan", employees: 142 }, { month: "Feb", employees: 148 }, { month: "Mar", employees: 155 },
  { month: "Apr", employees: 160 }, { month: "May", employees: 168 }, { month: "Jun", employees: 175 },
  { month: "Jul", employees: 180 }, { month: "Aug", employees: 185 }, { month: "Sep", employees: 190 },
  { month: "Oct", employees: 195 }, { month: "Nov", employees: 200 }, { month: "Dec", employees: 210 },
];

const deptPie = [
  { name: "Engineering", value: 45 }, { name: "Marketing", value: 28 }, { name: "Sales", value: 32 },
  { name: "HR", value: 15 }, { name: "Finance", value: 20 }, { name: "Design", value: 18 },
];

const COLORS = ["hsl(215, 80%, 48%)", "hsl(172, 66%, 50%)", "hsl(38, 92%, 50%)", "hsl(280, 65%, 60%)", "hsl(0, 72%, 51%)", "hsl(152, 69%, 41%)"];

const reports = [
  { title: "Employee Growth Report", date: "Dec 2024", type: "Monthly" },
  { title: "Attendance Summary", date: "Dec 2024", type: "Monthly" },
  { title: "Payroll Report Q4", date: "Q4 2024", type: "Quarterly" },
  { title: "Performance Overview", date: "H2 2024", type: "Bi-Annual" },
  { title: "Department Analysis", date: "2024", type: "Annual" },
];

const Reports = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="section-title">Reports & Analytics</h1>
          <p className="text-muted-foreground text-sm mt-1">Comprehensive organizational insights</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
          <h3 className="font-display font-semibold text-lg mb-6">Employee Growth</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="growth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(215, 80%, 48%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(215, 80%, 48%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(220, 9%, 46%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 9%, 46%)" />
                <Tooltip contentStyle={{ backgroundColor: "hsl(0,0%,100%)", border: "1px solid hsl(220,13%,91%)", borderRadius: "8px" }} />
                <Area type="monotone" dataKey="employees" stroke="hsl(215, 80%, 48%)" fill="url(#growth)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6">
          <h3 className="font-display font-semibold text-lg mb-6">Department Split</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={deptPie} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {deptPie.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-6">
        <h3 className="font-display font-semibold text-lg mb-4">Available Reports</h3>
        <div className="space-y-3">
          {reports.map((report, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }} className="flex items-center justify-between py-3 px-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">{report.title}</p>
                  <p className="text-xs text-muted-foreground">{report.date} · {report.type}</p>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors"><Download className="w-4 h-4 text-muted-foreground" /></button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;
