import { Bell, Search, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function TopBar() {
  const { user } = useAuth();
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-30 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search employees, departments..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all input-field"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
        </motion.button>

        <div className="flex items-center gap-3 pl-3 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{displayName}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
}
