import { motion } from "framer-motion";
import { Building2, Shield, Palette, Sliders, Save } from "lucide-react";

const Settings = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="section-title">Settings</h1>
          <p className="text-muted-foreground text-sm mt-1">Configure your system preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Company Profile */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10 text-primary"><Building2 className="w-5 h-5" /></div>
              <h3 className="font-display font-semibold text-lg">Company Profile</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Company Name", value: "Acme Corporation", type: "text" },
                { label: "Industry", value: "Technology", type: "text" },
                { label: "Email", value: "admin@acme.com", type: "email" },
                { label: "Phone", value: "+1 234 567 890", type: "tel" },
                { label: "Address", value: "123 Business Ave, NY", type: "text" },
                { label: "Website", value: "www.acme.com", type: "url" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{field.label}</label>
                  <input
                    type={field.type}
                    defaultValue={field.value}
                    className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
                <Save className="w-4 h-4" />
                Save Changes
              </motion.button>
            </div>
          </motion.div>

          {/* Roles */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-warning/10 text-warning"><Shield className="w-5 h-5" /></div>
              <h3 className="font-display font-semibold text-lg">Roles & Permissions</h3>
            </div>
            <div className="space-y-3">
              {[
                { role: "Administrator", desc: "Full system access", users: 2 },
                { role: "HR Manager", desc: "Employee & leave management", users: 4 },
                { role: "Manager", desc: "Team and performance management", users: 12 },
                { role: "Employee", desc: "Self-service access only", users: 192 },
              ].map((r) => (
                <div key={r.role} className="flex items-center justify-between py-3 px-4 rounded-lg bg-secondary/30">
                  <div>
                    <p className="text-sm font-medium">{r.role}</p>
                    <p className="text-xs text-muted-foreground">{r.desc}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{r.users} users</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent/10 text-accent"><Sliders className="w-5 h-5" /></div>
              <h3 className="font-display font-semibold">Preferences</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: "Email Notifications", enabled: true },
                { label: "Auto Attendance", enabled: true },
                { label: "Two-Factor Auth", enabled: false },
                { label: "Activity Logs", enabled: true },
              ].map((pref) => (
                <div key={pref.label} className="flex items-center justify-between">
                  <span className="text-sm">{pref.label}</span>
                  <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${pref.enabled ? "bg-primary" : "bg-muted"}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-card shadow transition-transform ${pref.enabled ? "right-1" : "left-1"}`} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
