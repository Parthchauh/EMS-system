import { motion } from "framer-motion";
import { Wallet, Download, DollarSign, TrendingUp, Receipt } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const payrollData = [
  { month: "Jul", amount: 420 },
  { month: "Aug", amount: 435 },
  { month: "Sep", amount: 445 },
  { month: "Oct", amount: 460 },
  { month: "Nov", amount: 475 },
  { month: "Dec", amount: 485 },
];

const payslips = [
  { id: 1, name: "John Smith", dept: "Engineering", gross: "$7,917", deductions: "$1,583", net: "$6,334", status: "Paid" },
  { id: 2, name: "Sarah Connor", dept: "Marketing", gross: "$7,083", deductions: "$1,417", net: "$5,666", status: "Paid" },
  { id: 3, name: "Mike Johnson", dept: "Sales", gross: "$7,500", deductions: "$1,500", net: "$6,000", status: "Pending" },
  { id: 4, name: "Emily Davis", dept: "HR", gross: "$6,000", deductions: "$1,200", net: "$4,800", status: "Paid" },
  { id: 5, name: "Robert Brown", dept: "Finance", gross: "$7,333", deductions: "$1,467", net: "$5,866", status: "Pending" },
  { id: 6, name: "Lisa Wilson", dept: "Design", gross: "$6,833", deductions: "$1,367", net: "$5,466", status: "Paid" },
];

const Payroll = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="section-title">Payroll</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage salary and compensation</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm shadow-lg shadow-primary/25">
          <Receipt className="w-4 h-4" />
          Process Payroll
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Payroll", value: "$485K", icon: DollarSign, color: "bg-primary/10 text-primary", trend: "+2.1%" },
          { label: "Avg. Salary", value: "$78,500", icon: TrendingUp, color: "bg-accent/10 text-accent", trend: "+3.5%" },
          { label: "Bonuses", value: "$42K", icon: Wallet, color: "bg-warning/10 text-warning", trend: "+8.2%" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold font-display mt-1">{s.value}</p>
                <p className="text-xs text-success mt-1">↑ {s.trend}</p>
              </div>
              <div className={`p-3 rounded-xl ${s.color}`}><s.icon className="w-5 h-5" /></div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-6">
        <h3 className="font-display font-semibold text-lg mb-6">Monthly Payroll Trend (in $K)</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={payrollData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 13%, 91%)", borderRadius: "8px" }} />
              <Bar dataKey="amount" fill="hsl(215, 80%, 48%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="table-container">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Employee</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Gross</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Deductions</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Net Pay</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Payslip</th>
              </tr>
            </thead>
            <tbody>
              {payslips.map((row, i) => (
                <motion.tr key={row.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-4"><div><p className="text-sm font-medium">{row.name}</p><p className="text-xs text-muted-foreground">{row.dept}</p></div></td>
                  <td className="py-3 px-4 text-sm hidden md:table-cell">{row.gross}</td>
                  <td className="py-3 px-4 text-sm text-destructive hidden md:table-cell">{row.deductions}</td>
                  <td className="py-3 px-4 text-sm font-semibold">{row.net}</td>
                  <td className="py-3 px-4"><span className={row.status === "Paid" ? "status-active" : "status-pending"}>{row.status}</span></td>
                  <td className="py-3 px-4 text-right">
                    <button className="p-1.5 rounded-md hover:bg-secondary transition-colors"><Download className="w-4 h-4 text-muted-foreground" /></button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
