import { motion } from "framer-motion";
import { Building2, Users, Plus, MoreHorizontal } from "lucide-react";

const departments = [
  { id: 1, name: "Engineering", head: "James Wilson", employees: 45, budget: "$2.1M", color: "bg-primary/10 text-primary" },
  { id: 2, name: "Marketing", head: "Sarah Connor", employees: 28, budget: "$890K", color: "bg-accent/10 text-accent" },
  { id: 3, name: "Sales", head: "Mike Johnson", employees: 32, budget: "$1.5M", color: "bg-warning/10 text-warning" },
  { id: 4, name: "Human Resources", head: "Emily Davis", employees: 15, budget: "$450K", color: "bg-success/10 text-success" },
  { id: 5, name: "Finance", head: "Robert Brown", employees: 20, budget: "$680K", color: "bg-destructive/10 text-destructive" },
  { id: 6, name: "Design", head: "Lisa Wilson", employees: 18, budget: "$720K", color: "bg-primary/10 text-primary" },
  { id: 7, name: "Operations", head: "Tom Harris", employees: 22, budget: "$950K", color: "bg-accent/10 text-accent" },
  { id: 8, name: "Legal", head: "Karen White", employees: 10, budget: "$380K", color: "bg-warning/10 text-warning" },
];

const Departments = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="section-title">Departments</h1>
          <p className="text-muted-foreground text-sm mt-1">{departments.length} departments in your organization</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm shadow-lg shadow-primary/25">
          <Plus className="w-4 h-4" />
          Add Department
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {departments.map((dept, i) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="glass-card-hover rounded-xl p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${dept.color}`}>
                <Building2 className="w-5 h-5" />
              </div>
              <button className="p-1 rounded-md hover:bg-secondary transition-colors">
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <h3 className="font-display font-semibold">{dept.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">Head: {dept.head}</p>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                {dept.employees} members
              </div>
              <p className="text-xs font-medium text-primary">{dept.budget}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Departments;
