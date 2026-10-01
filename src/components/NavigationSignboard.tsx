import React from 'react';
import { soundManager } from '../utils/audio';

export type SignboardId = 'studio' | 'journey' | 'museum' | 'closet';

interface NavigationSignboardProps {
  id: SignboardId;
  label: string;
  icon?: string;
  rotation?: string; // e.g. "-rotate-3", "rotate-3", "rotate-0"
  isHovered?: boolean;
  isSelectedMobile?: boolean;
  onClick: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  className?: string;
}

export const NavigationSignboard: React.FC<NavigationSignboardProps> = ({
  id,
  label,
  icon,
  rotation = 'rotate-0',
  isHovered = false,
  isSelectedMobile = false,
  onClick,
  onHoverStart,
  onHoverEnd,
  className = ''
}) => {
  const isHighlighted = isHovered || isSelectedMobile;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playChime();
    onClick();
  };

  return (
    <div
      id={`signboard-${id}`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={handleClick}
      className={`group relative inline-flex flex-col items-center cursor-pointer select-none transition-all duration-300 transform z-20 ${rotation} ${
        isHighlighted ? '-translate-y-2.5 scale-110' : 'translate-y-0 scale-100 hover:-translate-y-2 hover:scale-105'
      } ${className}`}
      aria-label={`Đi tới ${label}`}
    >
      {/* Hanging cords with animated stretch */}
      <div 
        className={`absolute -top-3.5 left-3 w-0.5 bg-[#5C223D] transition-all duration-300 ${
          isHighlighted ? 'h-4.5 bg-[#E09B5A]' : 'h-3.5'
        }`} 
      />
      <div 
        className={`absolute -top-3.5 right-3 w-0.5 bg-[#5C223D] transition-all duration-300 ${
          isHighlighted ? 'h-4.5 bg-[#E09B5A]' : 'h-3.5'
        }`} 
      />

      {/* Wooden sign body with pixel stepped borders */}
      <div
        className={`relative flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 border-2 transition-all duration-200 ${
          isHighlighted
            ? 'bg-[#FFFDF5] border-[#FFE082] shadow-[0_0_20px_rgba(255,224,130,0.95)] ring-2 ring-[#E09B5A]'
            : 'bg-[#FDE5C8] border-[#5C223D] shadow-[0_4px_10px_rgba(0,0,0,0.45)] group-hover:bg-[#FFFDF5] group-hover:border-[#E09B5A] group-hover:shadow-[0_0_15px_rgba(224,155,90,0.8)]'
        }`}
      >
        {/* Corner tiny flowers */}
        <span className={`absolute -top-1.5 -left-1.5 text-[11px] leading-none filter drop-shadow transition-transform duration-200 ${isHighlighted ? 'scale-125' : ''}`}>
          🌸
        </span>
        <span className={`absolute -bottom-1.5 -right-1.5 text-[11px] leading-none filter drop-shadow transition-transform duration-200 ${isHighlighted ? 'scale-125' : ''}`}>
          🌸
        </span>

        {/* Optional icon */}
        {icon && (
          <span className="text-xs md:text-sm filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
            {icon}
          </span>
        )}

        {/* Sign Label */}
        <span className="font-extrabold text-xs md:text-sm text-[#5C223D] tracking-wide font-pixel-display whitespace-nowrap drop-shadow-[0_1px_0_#FFF]">
          {label}
        </span>

        {/* Highlight sheen animation */}
        {isHighlighted && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none animate-pulse" />
        )}
      </div>

      {/* Mobile two-tap hint */}
      {isSelectedMobile && (
        <div className="absolute top-full mt-1.5 px-2 py-0.5 bg-[#411D3A] text-[#FDE5C8] text-[9px] font-bold border border-[#E09B5A] whitespace-nowrap shadow-lg animate-bounce z-30">
          Chạm thêm lần nữa để vào ▸
        </div>
      )}
    </div>
  );
};
