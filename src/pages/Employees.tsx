import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Filter, MoreHorizontal, Mail, Phone, MapPin, Edit, Trash2, Eye, X } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: "Active" | "Inactive";
  joinDate: string;
  avatar: string;
  salary: string;
  location: string;
}

const employees: Employee[] = [
  { id: 1, name: "John Smith", email: "john@company.com", phone: "+1 234 567 890", department: "Engineering", role: "Senior Developer", status: "Active", joinDate: "2023-03-15", avatar: "JS", salary: "$95,000", location: "New York" },
  { id: 2, name: "Sarah Connor", email: "sarah@company.com", phone: "+1 234 567 891", department: "Marketing", role: "Marketing Lead", status: "Active", joinDate: "2022-08-01", avatar: "SC", salary: "$85,000", location: "Los Angeles" },
  { id: 3, name: "Mike Johnson", email: "mike@company.com", phone: "+1 234 567 892", department: "Sales", role: "Sales Manager", status: "Active", joinDate: "2021-11-20", avatar: "MJ", salary: "$90,000", location: "Chicago" },
  { id: 4, name: "Emily Davis", email: "emily@company.com", phone: "+1 234 567 893", department: "HR", role: "HR Specialist", status: "Active", joinDate: "2023-01-10", avatar: "ED", salary: "$72,000", location: "Boston" },
  { id: 5, name: "Robert Brown", email: "robert@company.com", phone: "+1 234 567 894", department: "Finance", role: "Financial Analyst", status: "Inactive", joinDate: "2020-06-05", avatar: "RB", salary: "$88,000", location: "Seattle" },
  { id: 6, name: "Lisa Wilson", email: "lisa@company.com", phone: "+1 234 567 895", department: "Design", role: "UI/UX Designer", status: "Active", joinDate: "2023-05-22", avatar: "LW", salary: "$82,000", location: "San Francisco" },
  { id: 7, name: "David Lee", email: "david@company.com", phone: "+1 234 567 896", department: "Engineering", role: "DevOps Engineer", status: "Active", joinDate: "2022-09-14", avatar: "DL", salary: "$98,000", location: "Austin" },
  { id: 8, name: "Anna Martinez", email: "anna@company.com", phone: "+1 234 567 897", department: "Marketing", role: "Content Writer", status: "Active", joinDate: "2023-07-03", avatar: "AM", salary: "$65,000", location: "Miami" },
];

const avatarColors = [
  "bg-primary/20 text-primary",
  "bg-accent/20 text-accent",
  "bg-warning/20 text-warning",
  "bg-success/20 text-success",
  "bg-destructive/20 text-destructive",
];

const Employees = () => {
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const departments = ["All", ...new Set(employees.map((e) => e.department))];

  const filtered = employees.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = selectedDept === "All" || e.department === selectedDept;
    return matchSearch && matchDept;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="section-title">Employees</h1>
          <p className="text-muted-foreground text-sm mt-1">{employees.length} employees in your organization</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm shadow-lg shadow-primary/25"
        >
          <Plus className="w-4 h-4" />
          Add Employee
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employees..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                selectedDept === dept
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Employee</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Department</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Role</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Join Date</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((emp, i) => (
                  <motion.tr
                    key={emp.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedEmployee(emp)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${avatarColors[i % avatarColors.length]}`}>
                          {emp.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{emp.name}</p>
                          <p className="text-xs text-muted-foreground">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm hidden md:table-cell">{emp.department}</td>
                    <td className="py-3 px-4 text-sm hidden lg:table-cell">{emp.role}</td>
                    <td className="py-3 px-4">
                      <span className={emp.status === "Active" ? "status-active" : "status-inactive"}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground hidden lg:table-cell">{emp.joinDate}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-md hover:bg-secondary transition-colors" onClick={(e) => { e.stopPropagation(); setSelectedEmployee(emp); }}>
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-secondary transition-colors" onClick={(e) => e.stopPropagation()}>
                          <Edit className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors" onClick={(e) => e.stopPropagation()}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Detail Modal */}
      <AnimatePresence>
        {selectedEmployee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedEmployee(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card rounded-2xl p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-semibold text-xl">Employee Profile</h2>
                <button onClick={() => setSelectedEmployee(null)} className="p-1 rounded-md hover:bg-secondary transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
                  {selectedEmployee.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{selectedEmployee.name}</h3>
                  <p className="text-muted-foreground text-sm">{selectedEmployee.role}</p>
                  <span className={selectedEmployee.status === "Active" ? "status-active" : "status-inactive"}>
                    {selectedEmployee.status}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { icon: Mail, label: "Email", value: selectedEmployee.email },
                  { icon: Phone, label: "Phone", value: selectedEmployee.phone },
                  { icon: MapPin, label: "Location", value: selectedEmployee.location },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-secondary/50">
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="py-2 px-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Department</p>
                    <p className="text-sm font-medium">{selectedEmployee.department}</p>
                  </div>
                  <div className="py-2 px-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Salary</p>
                    <p className="text-sm font-medium">{selectedEmployee.salary}</p>
                  </div>
                  <div className="py-2 px-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Join Date</p>
                    <p className="text-sm font-medium">{selectedEmployee.joinDate}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Employees;
