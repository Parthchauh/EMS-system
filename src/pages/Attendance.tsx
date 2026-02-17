import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const attendanceData = [
  { id: 1, name: "John Smith", dept: "Engineering", status: "Present", checkIn: "09:02 AM", checkOut: "06:15 PM", hours: "9h 13m" },
  { id: 2, name: "Sarah Connor", dept: "Marketing", status: "Present", checkIn: "08:55 AM", checkOut: "05:50 PM", hours: "8h 55m" },
  { id: 3, name: "Mike Johnson", dept: "Sales", status: "Late", checkIn: "09:45 AM", checkOut: "06:30 PM", hours: "8h 45m" },
  { id: 4, name: "Emily Davis", dept: "HR", status: "Present", checkIn: "09:00 AM", checkOut: "06:00 PM", hours: "9h 00m" },
  { id: 5, name: "Robert Brown", dept: "Finance", status: "Absent", checkIn: "-", checkOut: "-", hours: "-" },
  { id: 6, name: "Lisa Wilson", dept: "Design", status: "Present", checkIn: "08:50 AM", checkOut: "05:45 PM", hours: "8h 55m" },
  { id: 7, name: "David Lee", dept: "Engineering", status: "Half Day", checkIn: "09:00 AM", checkOut: "01:00 PM", hours: "4h 00m" },
  { id: 8, name: "Anna Martinez", dept: "Marketing", status: "Present", checkIn: "09:10 AM", checkOut: "06:05 PM", hours: "8h 55m" },
];

const statusStyles: Record<string, string> = {
  Present: "status-active",
  Absent: "status-inactive",
  Late: "status-pending",
  "Half Day": "bg-info/10 text-info status-badge",
};

const Attendance = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="section-title">Attendance</h1>
          <p className="text-muted-foreground text-sm mt-1">Today's attendance overview</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Present", value: 185, icon: CheckCircle, color: "bg-success/10 text-success" },
          { label: "Absent", value: 8, icon: XCircle, color: "bg-destructive/10 text-destructive" },
          { label: "Late", value: 12, icon: AlertTriangle, color: "bg-warning/10 text-warning" },
          { label: "Half Day", value: 5, icon: Clock, color: "bg-info/10 text-info" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="stat-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold font-display mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
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
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Check In</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Check Out</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Hours</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                >
                  <td className="py-3 px-4 text-sm font-medium">{row.name}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">{row.dept}</td>
                  <td className="py-3 px-4"><span className={statusStyles[row.status] || ""}>{row.status}</span></td>
                  <td className="py-3 px-4 text-sm text-muted-foreground hidden sm:table-cell">{row.checkIn}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground hidden sm:table-cell">{row.checkOut}</td>
                  <td className="py-3 px-4 text-sm font-medium hidden lg:table-cell">{row.hours}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
