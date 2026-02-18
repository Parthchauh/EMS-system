import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Users, Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useDepartments, getColorClass } from "@/hooks/useDepartments";
import { DepartmentDialog } from "@/components/departments/DepartmentDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Department } from "@/hooks/useDepartments";

const Departments = () => {
  const { departments, isLoading, addDepartment, updateDepartment, deleteDepartment, isAdding } = useDepartments();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Department | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Department | null>(null);

  const handleSubmit = async (data: any) => {
    if (editing) {
      await updateDepartment({ id: editing.id, ...data });
    } else {
      await addDepartment(data);
    }
    setDialogOpen(false);
    setEditing(null);
  };

  const handleEdit = (dept: Department) => {
    setEditing(dept);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (deleteTarget) {
      await deleteDepartment(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="section-title">Departments</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {departments.length} department{departments.length !== 1 ? "s" : ""} in your organization
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { setEditing(null); setDialogOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm shadow-lg shadow-primary/25"
        >
          <Plus className="w-4 h-4" />
          Add Department
        </motion.button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card rounded-xl p-5 animate-pulse h-40" />
          ))}
        </div>
      ) : departments.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center">
          <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-1">No departments yet</h3>
          <p className="text-muted-foreground text-sm">Create your first department to get started.</p>
        </div>
      ) : (
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
                <div className={`p-3 rounded-xl ${getColorClass(dept.color_variant)}`}>
                  <Building2 className="w-5 h-5" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 rounded-md hover:bg-secondary transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(dept)}>
                      <Pencil className="w-4 h-4 mr-2" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDeleteTarget(dept)} className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h3 className="font-display font-semibold">{dept.name}</h3>
              {dept.head && <p className="text-xs text-muted-foreground mt-1">Head: {dept.head}</p>}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  {dept.employee_count} members
                </div>
                {dept.budget && <p className="text-xs font-medium text-primary">{dept.budget}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <DepartmentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        department={editing}
        loading={isAdding}
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{deleteTarget?.name}"?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Departments;
