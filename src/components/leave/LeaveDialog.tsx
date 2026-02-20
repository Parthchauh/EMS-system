import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { differenceInCalendarDays } from "date-fns";

const leaveTypes = ["Annual Leave", "Sick Leave", "Personal Leave", "Maternity Leave", "Paternity Leave", "Unpaid Leave"];

interface LeaveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    employee_name: string;
    leave_type: string;
    from_date: string;
    to_date: string;
    days: number;
    reason: string;
  }) => void;
  loading: boolean;
  userName?: string;
}

export function LeaveDialog({ open, onOpenChange, onSubmit, loading, userName }: LeaveDialogProps) {
  const [form, setForm] = useState({
    employee_name: userName || "",
    leave_type: leaveTypes[0],
    from_date: "",
    to_date: "",
    reason: "",
  });

  useEffect(() => {
    if (userName) setForm((f) => ({ ...f, employee_name: userName }));
  }, [userName]);

  const days =
    form.from_date && form.to_date
      ? Math.max(1, differenceInCalendarDays(new Date(form.to_date), new Date(form.from_date)) + 1)
      : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...form, days });
    setForm({ employee_name: userName || "", leave_type: leaveTypes[0], from_date: "", to_date: "", reason: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Apply for Leave</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Employee Name</label>
            <input
              required
              value={form.employee_name}
              onChange={(e) => setForm({ ...form, employee_name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Leave Type</label>
            <select
              value={form.leave_type}
              onChange={(e) => setForm({ ...form, leave_type: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
            >
              {leaveTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">From</label>
              <input
                type="date"
                required
                value={form.from_date}
                onChange={(e) => setForm({ ...form, from_date: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">To</label>
              <input
                type="date"
                required
                value={form.to_date}
                min={form.from_date}
                onChange={(e) => setForm({ ...form, to_date: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
              />
            </div>
          </div>
          {days > 0 && (
            <p className="text-xs text-muted-foreground">Duration: <span className="font-semibold text-foreground">{days} day{days > 1 ? "s" : ""}</span></p>
          )}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Reason</label>
            <textarea
              required
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              rows={3}
              maxLength={500}
              className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading || days === 0}
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm shadow-lg shadow-primary/25 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
