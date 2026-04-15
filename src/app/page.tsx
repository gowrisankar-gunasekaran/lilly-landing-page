"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCircle, CaretDown, SignOut } from "@phosphor-icons/react";
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
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
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
        background:
          "linear-gradient(145deg, #0F172A 0%, #1E293B 40%, #0F172A 100%)",
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

        {/* Right Pill */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 bg-black hover:bg-black/80 transition-all h-12 px-5 rounded-full text-white group shadow-lg border border-white/5"
          >
            <UserCircle size={24} weight="light" className="text-white/80" />
            <span className="font-bold text-xs">Kruna Kumar</span>
            <CaretDown
              size={12}
              weight="bold"
              className={`ml-1 transition-transform ${profileOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-56 bg-[#131313] rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/8 overflow-hidden"
              >
                {/* Profile Label */}
                <div className="px-5 pt-4 pb-1">
                  <span className="text-xs font-semibold text-white/40 tracking-widest uppercase">
                    Profile
                  </span>
                </div>

                {/* User Row */}
                <div className="flex items-center gap-3 px-5 py-3">
                  <UserCircle
                    size={32}
                    weight="light"
                    className="text-white/70 shrink-0"
                  />
                  <span className="font-bold text-white text-[14px]">
                    Kruna Kumar
                  </span>
                </div>

                {/* Divider */}
                <div className="mx-5 my-2 h-[1px] bg-white/8" />

                {/* Signout Button */}
                <div className="px-4 pb-4 pt-1">
                  <button className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-full border-2 border-[#E05252] text-[#E05252] hover:bg-[#E05252]/10 transition-all duration-200 font-bold text-[13px] cursor-pointer">
                    <SignOut size={16} weight="bold" />
                    Signout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="w-[92%] bg-[#FDF8F6] rounded-[20px] shadow-[0_40px_100px_rgba(0,0,0,0.4)] flex flex-col min-h-[90vh] mt-2 mb-8 z-10">
        {/* Card Grid Area */}
        <div className="px-8 lg:px-20 py-16 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-20">
          {CARDS.map((card, index) => {
            const isActive = card.status === "active";
            const accentBg = isActive ? "#EEF2FF" : "#E5E7EB";

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`relative flex flex-col h-full pt-8 ${index === 4 ? "lg:col-start-1" : ""}`}
              >
                {/* Accent Background Layer */}
                <div
                  className="absolute top-0 left-[-2px] right-[-3px] h-[101%] rounded-[20px] z-0"
                  style={{ backgroundColor: accentBg }}
                >
                  {/* Dashboard Graphic */}
                  <div
                    className={`absolute top-[-40px] bottom-[auto] left-[auto] right-[20px] w-[52%] h-[105%] rounded-[12px] overflow-hidden shadow-[-4px_4px_15px_rgba(0,0,0,0.05)] border border-black/[0.1] transition-all duration-700 ${!isActive ? "grayscale opacity-40" : "opacity-100"}`}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-fill rounded-[12px]"
                    />
                  </div>
                </div>

                {/* Main White Card Body */}
                <div className="relative z-10 w-full flex flex-col flex-1 bg-white rounded-[20px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#E5E7EB] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
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
