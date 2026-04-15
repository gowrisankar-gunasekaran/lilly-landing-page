"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCircle, CaretDown } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { LillyLogo } from "@/components/shared/icons/LillyLogo";
import { CARDS } from "@/constants/cards";
import "@/styles/landing.css";

export default function LandingPage() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#5D1D1C] flex flex-col items-center overflow-y-auto overflow-x-hidden selection:bg-red-100">
      {/* Header - Transparent Bar with Black Pills */}
      <header className="w-full mt-4 h-18 flex items-center justify-between px-6 z-50">
        {/* Left Pill */}
        <div className="bg-black rounded-full h-14 flex items-center px-8 gap-6 shadow-lg border border-white/5">
          <div className="flex items-center transform scale-90">
            <LillyLogo name="Lilly" />
          </div>
          <div className="h-6 w-[1px] bg-white/30" />
          <span className="text-white font-bold text-xl tracking-wide">
            C.A. 360
          </span>
        </div>

        {/* Right Pill */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 bg-black hover:bg-black/80 transition-all h-14 px-6 rounded-full text-white group shadow-lg border border-white/5"
          >
            <UserCircle size={28} weight="light" className="text-white/80" />
            <span className="font-bold text-sm">Kruna Kumar</span>
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-48 bg-[#151515] rounded-2xl p-2 shadow-2xl border border-white/5"
              >
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-colors text-sm font-medium">
                  <span className="opacity-70">Signout</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="w-[96%] bg-[#FDF8F6] rounded-[20px] shadow-[0_40px_100px_rgba(0,0,0,0.4)] flex flex-col min-h-[90vh] mt-4 mb-12 z-10">
        {/* Card Grid Area */}
        <div className="px-8 lg:px-24 py-20 grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-24">
          {CARDS.map((card, index) => {
            const isActive = card.status === "active";
            const accentBg = isActive ? "#FFE4E4" : "#E5E7EB";

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`relative flex flex-col h-full pt-10 ${index === 4 ? "lg:col-start-1" : ""}`}
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
                <div className="relative z-10 w-full flex flex-col flex-1 bg-white rounded-[20px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#E5E7EB] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                  <h2 className="text-[26px] font-bold text-[#1f2937] mb-3 tracking-tight">
                    {card.title}
                  </h2>
                  <p className="text-[#4b5563] text-[16px] mb-8 leading-relaxed flex-1">
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
                        <button className="bg-[#cc2222] hover:bg-[#b31e1e] text-white px-5 py-2.5 h-auto flex items-center justify-center rounded-[8px] font-bold text-[15px] shadow-sm transition-colors border-none cursor-pointer">
                          {card.buttonText}
                        </button>
                      ) : (
                        <button className="inline-flex items-center px-5 py-2.5 bg-[#F3F4F6] text-[#6b7280] rounded-[8px] font-bold text-[15px] border border-[#E5E7EB] hover:bg-[#E5E7EB] transition-colors cursor-pointer">
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
