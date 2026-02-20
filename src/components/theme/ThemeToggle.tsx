import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setDark(!dark)}
      className="p-2 rounded-lg hover:bg-secondary transition-colors"
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="w-5 h-5 text-muted-foreground" /> : <Moon className="w-5 h-5 text-muted-foreground" />}
    </motion.button>
  );
}
