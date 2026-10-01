import React from 'react';

export const SloganBanner: React.FC = () => {
  return (
    <div className="relative inline-flex items-center select-none animate-float">
      {/* Left ribbon flower accent */}
      <span className="relative z-10 -mr-2 text-sm md:text-base filter drop-shadow">🌸</span>

      {/* Main ribbon body with pixel stepped borders */}
      <div className="relative bg-[#FDE5C8] px-4 md:px-6 py-1.5 border-2 border-[#5C223D] shadow-[0_3px_6px_rgba(0,0,0,0.35)] flex items-center justify-center">
        {/* Notch details on sides */}
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-3 bg-[#E09B5A]" />
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-3 bg-[#E09B5A]" />

        <p className="text-xs md:text-sm lg:text-base font-bold text-[#5C223D] tracking-wide whitespace-nowrap drop-shadow-[0_1px_0_rgba(255,255,255,0.7)] font-serif">
          Một tà áo. Muôn câu chuyện.
        </p>
      </div>

      {/* Right ribbon flower accent */}
      <span className="relative z-10 -ml-2 text-sm md:text-base filter drop-shadow">🌸</span>
    </div>
  );
};
