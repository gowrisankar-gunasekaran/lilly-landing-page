import { LillyLogo } from "@/components/shared/icons/LillyLogo";
import { ProfileDropdown } from "@/components/shared/ProfileDropdown";

export function Header() {
  return (
    <header className="w-full mt-2 h-16 flex items-center justify-between px-4 z-50">
      {/* Left Pill */}
      <div className="bg-black rounded-full h-12 flex items-center px-6 gap-6 shadow-lg border border-white/5">
        <div className="flex items-center transform scale-90">
          <LillyLogo name="Lilly" />
        </div>
        <div className="h-6 w-px bg-white/30" />
        <span className="text-white font-bold text-lg tracking-wide">C.A. 360</span>
      </div>

      {/* Right Pill - Profile */}
      <ProfileDropdown />
    </header>
  );
}
