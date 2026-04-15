"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCircle, ChevronDown, ChevronUp, LogOut } from "lucide-react";

const EASE = [0.4, 0, 0.2, 1] as const;

export function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <motion.div
      ref={ref}
      onClick={() => setOpen(!open)}
      layout
      animate={open ? { borderRadius: "1.25rem" } : { borderRadius: "9999px" }}
      transition={{ duration: 0.35, ease: EASE }}
      className="bg-[#121212] text-white shadow-lg border border-white/5 cursor-pointer overflow-hidden"
      style={{ minWidth: "fit-content" }}
    >
      {/* Collapsed Row */}
      <motion.div layout className="flex items-center gap-3 h-12 px-5">
        <UserCircle size={24} strokeWidth={1.5} className="text-white/80" />
        <span className="font-bold text-xs">Kruna Kumar</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="ml-1"
        >
          <ChevronDown size={14} strokeWidth={2} />
        </motion.span>
      </motion.div>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ delay: 0.1, duration: 0.25, ease: "easeOut" }}
              className="px-5 pb-5 pt-1"
            >
              <div className="h-px bg-white/10 mb-4" />
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <UserCircle size={26} strokeWidth={1.5} className="text-white" />
                  <span className="text-sm font-medium text-white">Kruna Kumar</span>
                </div>
                <ChevronUp size={18} strokeWidth={1.5} className="text-gray-400" />
              </div>
              <button
                onClick={(e) => e.stopPropagation()}
                className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#f0806e] text-[#f0806e] rounded-full hover:bg-[#f0806e] hover:text-white transition-colors duration-200 cursor-pointer text-sm"
              >
                <LogOut size={16} strokeWidth={1.5} />
                <span>Signout</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
