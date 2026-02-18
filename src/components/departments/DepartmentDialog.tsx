import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Department } from "@/hooks/useDepartments";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string; head: string; budget: string; employee_count: number; color_variant: number }) => void;
  department?: Department | null;
  loading?: boolean;
}

export function DepartmentDialog({ open, onOpenChange, onSubmit, department, loading }: Props) {
  const [name, setName] = useState("");
  const [head, setHead] = useState("");
  const [budget, setBudget] = useState("");
  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    if (department) {
      setName(department.name);
      setHead(department.head ?? "");
      setBudget(department.budget ?? "");
      setEmployeeCount(department.employee_count);
    } else {
      setName("");
      setHead("");
      setBudget("");
      setEmployeeCount(0);
    }
  }, [department, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      head,
      budget,
      employee_count: employeeCount,
      color_variant: department?.color_variant ?? Math.floor(Math.random() * 5),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{department ? "Edit Department" : "Add Department"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Department Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Engineering" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="head">Department Head</Label>
            <Input id="head" value={head} onChange={(e) => setHead(e.target.value)} placeholder="e.g. James Wilson" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g. $2.1M" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="count">Employees</Label>
              <Input id="count" type="number" min={0} value={employeeCount} onChange={(e) => setEmployeeCount(Number(e.target.value))} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{department ? "Save Changes" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
