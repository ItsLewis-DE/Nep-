import React from 'react';

interface LogoClusterProps {
  onLogoClick?: () => void;
}

export const LogoCluster: React.FC<LogoClusterProps> = ({ onLogoClick }) => {
  return (
    <div 
      onClick={onLogoClick}
      className="cursor-pointer select-none group transition-transform duration-200 hover:scale-105 active:scale-95 flex items-center"
      title="Tiệm May Nếp - Việt phục Remix"
    >
      {/* Decorative backdrop plate */}
      <div className="relative flex items-center bg-[#251728]/95 px-3 py-1.5 border-2 border-[#E09B5A] shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
        {/* Corner decorative golden notches */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#E09B5A] border border-[#251728]" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#E09B5A] border border-[#251728]" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#E09B5A] border border-[#251728]" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#E09B5A] border border-[#251728]" />

        {/* Diamond Rhombus Lotus Crest */}
        <div className="relative mr-3 w-10 h-10 flex items-center justify-center">
          <div className="absolute w-9 h-9 rotate-45 bg-[#411D3A] border-2 border-[#E09B5A] shadow-inner" />
          <div className="relative z-10 text-xl filter drop-shadow-[0_0_6px_#FF80AA] animate-pulse">
            🪷
          </div>
        </div>

        {/* Logo Typography */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-xl md:text-2xl text-[#FDE5C8] tracking-wider uppercase font-pixel-display leading-none drop-shadow-[2px_2px_0_#411D3A]">
              VIỆT PHỤC
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] md:text-xs text-[#F3C098] font-bold tracking-[0.3em] uppercase leading-none mt-1">
            <span>•</span>
            <span>REMIX</span>
            <span>•</span>
          </div>
        </div>

        {/* Lotus blossoms accent at the edges */}
        <div className="absolute -right-3 -top-2 text-xs filter drop-shadow-[0_0_4px_#FF80AA]">🌸</div>
        <div className="absolute -left-2 -bottom-2 text-xs filter drop-shadow-[0_0_4px_#FF80AA]">🌸</div>
      </div>
    </div>
  );
};
