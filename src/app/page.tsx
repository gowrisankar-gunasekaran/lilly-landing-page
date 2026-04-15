"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { CARDS } from "@/constants/cards";
import "@/styles/landing.css";

export default function LandingPage() {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center overflow-y-auto overflow-x-hidden selection:bg-indigo-100"
      style={{ background: "#1e2a30" }}
    >
      <Header />

      <main className="w-[98%] bg-[#F3F7FA] rounded-xl shadow-[0_40px_100px_rgba(0,0,0,0.4)] flex flex-col mt-2 mb-4 z-10">
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
                {/* Accent Background */}
                <div
                  className="absolute inset-0 rounded-[16px] z-0"
                  style={{ backgroundColor: accentBg }}
                >
                  <div
                    className={`absolute -top-10 bottom-auto left-auto right-5 w-[52%] h-[105%] rounded-lg overflow-hidden shadow-[-4px_4px_15px_rgba(0,0,0,0.05)] border border-black/10 transition-all duration-700 ${!isActive ? "grayscale opacity-40" : "opacity-100"}`}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 26vw"
                      className="object-fill rounded-lg"
                    />
                  </div>
                </div>

                {/* Card Body */}
                <div className="relative z-10 w-full flex flex-col flex-1 bg-white rounded-[16px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#E5E7EB] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                  <h2 className="text-[24px] font-bold text-[#1f2937] mb-3 tracking-tight">
                    {card.title}
                  </h2>
                  <p className="text-[#4b5563] text-[15px] mb-8 leading-relaxed flex-1">
                    {card.description}
                  </p>

                  <div className="flex">
                    {isActive ? (
                      <Link
                        href={card.href || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#12518E] hover:bg-[#0e406e] text-white px-4 py-2 flex items-center justify-center rounded-lg font-bold text-[14px] shadow-sm transition-all duration-200 hover:shadow-[0_4px_14px_rgba(18,81,142,0.4)]"
                      >
                        {card.buttonText}
                      </Link>
                    ) : (
                      <span className="inline-flex items-center px-4 py-2 bg-[#F3F4F6] text-[#6b7280] rounded-lg font-bold text-[14px] border border-[#E5E7EB]">
                        {card.buttonText}
                      </span>
                    )}
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
