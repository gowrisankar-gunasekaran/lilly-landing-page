"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCircle, ChevronDown, ChevronUp, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LillyLogo } from "@/components/shared/icons/LillyLogo";
import { CARDS } from "@/constants/cards";
import "@/styles/landing.css";

export default function LandingPage() {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center overflow-y-auto overflow-x-hidden selection:bg-indigo-100"
      style={{
        background: "#1e2a30",
      }}
    >
      {/* Header - Transparent Bar with Black Pills */}
      <header className="w-full mt-2 h-16 flex items-center justify-between px-4 z-50">
        {/* Left Pill */}
        <div className="bg-black rounded-full h-12 flex items-center px-6 gap-6 shadow-lg border border-white/5">
          <div className="flex items-center transform scale-90">
            <LillyLogo name="Lilly" />
          </div>
          <div className="h-6 w-[1px] bg-white/30" />
          <span className="text-white font-bold text-lg tracking-wide">
            C.A. 360
          </span>
        </div>

        {/* Right Pill - Expandable Profile */}
        <motion.div
          ref={profileRef}
          onClick={() => setProfileOpen(!profileOpen)}
          layout
          animate={profileOpen ? { borderRadius: "1.25rem" } : { borderRadius: "9999px" }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="bg-[#121212] text-white shadow-lg border border-white/5 cursor-pointer overflow-hidden"
          style={{ minWidth: "fit-content" }}
        >
          {/* Collapsed Row - always visible */}
          <motion.div layout className="flex items-center gap-3 h-12 px-5">
            <UserCircle size={24} strokeWidth={1.5} className="text-white/80" />
            <span className="font-bold text-xs">Kruna Kumar</span>
            <motion.span
              animate={{ rotate: profileOpen ? 180 : 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="ml-1"
            >
              <ChevronDown size={14} strokeWidth={2} />
            </motion.span>
          </motion.div>

          {/* Expanded Content */}
          <AnimatePresence initial={false}>
            {profileOpen && (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: "hidden" }}
              >
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ delay: 0.1, duration: 0.25, ease: "easeOut" }}
                  className="px-5 pb-5 pt-1"
                >
                  {/* Divider */}
                  <div className="h-px bg-white/10 mb-4" />
                  {/* User Info Row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <UserCircle size={26} strokeWidth={1.5} className="text-white" />
                      <span className="text-sm font-medium text-white">Kruna Kumar</span>
                    </div>
                    <ChevronUp size={18} strokeWidth={1.5} className="text-gray-400" />
                  </div>
                  {/* Signout Button */}
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
      </header>

      <main className="w-[98%] bg-[#F3F7FA] rounded-xl shadow-[0_40px_100px_rgba(0,0,0,0.4)] flex flex-col min-h-[90vh] mt-2 mb-4 z-10">
        {/* Card Grid Area */}
        <div className="px-12 lg:px-28 pt-28 pb-15 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-20">
          {CARDS.map((card, index) => {
            const isActive = card.status === "active";
            const accentBg = isActive ? "#D4E3FF" : "#E5E7EB";

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`relative flex flex-col h-auto pt-7 px-[1.5px] pb-[1.5px] gap-[10px] rounded-[16px] ${index === 4 ? "lg:col-start-1" : ""}`}
              >
                {/* Accent Background Layer */}
                <div
                  className="absolute inset-0 rounded-[16px] z-0"
                  style={{ backgroundColor: accentBg }}
                >
                  {/* Dashboard Graphic */}
                  <div
                    className={`absolute top-[-40px] bottom-[auto] left-[auto] right-[20px] w-[52%] h-[105%] rounded-[8px] overflow-hidden shadow-[-4px_4px_15px_rgba(0,0,0,0.05)] border border-black/[0.1] transition-all duration-700 ${!isActive ? "grayscale opacity-40" : "opacity-100"}`}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-fill rounded-[8px]"
                    />
                  </div>
                </div>

                {/* Main White Card Body */}
                <div className="relative z-10 w-full flex flex-col flex-1 bg-white rounded-[16px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#E5E7EB] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                  <h2 className="text-[24px] font-bold text-[#1f2937] mb-3 tracking-tight">
                    {card.title}
                  </h2>
                  <p className="text-[#4b5563] text-[15px] mb-8 leading-relaxed flex-1">
                    {card.description}
                  </p>

                  <div className="flex">
                    <Link
                      href={card.href || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      {isActive ? (
                        <button className="bg-[#12518E] hover:bg-[#0e406e] text-white px-4 py-2 h-auto flex items-center justify-center rounded-[8px] font-bold text-[14px] shadow-sm transition-all duration-200 hover:shadow-[0_4px_14px_rgba(18,81,142,0.4)] border-none cursor-pointer">
                          {card.buttonText}
                        </button>
                      ) : (
                        <button className="inline-flex items-center px-4 py-2 bg-[#F3F4F6] text-[#6b7280] rounded-[8px] font-bold text-[14px] border border-[#E5E7EB] hover:bg-[#E5E7EB] transition-colors cursor-pointer">
                          {card.buttonText}
                        </button>
                      )}
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
