import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface TopHudProps {
  senNgoc: number;
  isMuted: boolean;
  avatarUrl?: string;
  onToggleMute: () => void;
  onOpenProfile: () => void;
  onOpenShop: () => void;
}

export const TopHud: React.FC<TopHudProps> = ({
  senNgoc,
  isMuted,
  avatarUrl = '/assets/protagonist-avatar.jpg',
  onToggleMute,
  onOpenProfile,
  onOpenShop
}) => {
  return (
    <div className="flex items-center gap-2 select-none">
      {/* 1. Currency: Sen Ngọc with Glowing Lotus Gem */}
      <button
        onClick={() => {
          soundManager.playClick();
          onOpenShop();
        }}
        className="flex items-center gap-2 bg-[#251728]/95 px-3 py-1.5 border-2 border-[#E09B5A] shadow-[0_3px_8px_rgba(0,0,0,0.5)] transition-transform duration-150 hover:scale-105 active:scale-95 cursor-pointer group"
        title="Sen Ngọc - Nhấp để xem cửa hàng"
      >
        <div className="relative w-6 h-6 rounded-full overflow-hidden flex items-center justify-center border border-[#FF80AA] bg-gradient-to-tr from-[#9B1D56] to-[#FB6F92] shadow-[0_0_8px_#E75788]">
          <span className="text-xs filter drop-shadow">🪷</span>
        </div>
        <span className="font-extrabold text-sm md:text-base text-[#FDE5C8] tracking-wider font-pixel-display leading-none">
          {senNgoc.toLocaleString('vi-VN')}
        </span>
      </button>

      {/* 2. Audio Toggle Button */}
      <button
        onClick={() => {
          soundManager.playClick();
          onToggleMute();
        }}
        className={`w-9 h-9 flex items-center justify-center bg-[#251728]/95 border-2 border-[#E09B5A] shadow-[0_3px_8px_rgba(0,0,0,0.5)] transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer ${
          isMuted ? 'text-[#F3C098]/60 hover:text-[#F3C098]' : 'text-[#FDE5C8] bg-[#411D3A]/90'
        }`}
        title={isMuted ? 'Bật âm thanh sảnh tiệm' : 'Tắt âm thanh sảnh tiệm'}
        aria-label="Toggle audio"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5 text-[#E75788] animate-pulse" />
        )}
      </button>

      {/* 3. Player Portrait Circle */}
      <button
        onClick={() => {
          soundManager.playClick();
          onOpenProfile();
        }}
        className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#E09B5A] bg-[#411D3A] shadow-[0_0_10px_rgba(224,155,90,0.6)] transition-transform duration-150 hover:scale-110 active:scale-95 cursor-pointer group"
        title="Hồ sơ nhân vật"
      >
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-full h-full object-cover object-top pixel-art group-hover:brightness-110"
          onError={(e) => {
            const target = e.currentTarget;
            target.src = '/assets/protagonist-avatar.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#251728]/40 to-transparent pointer-events-none" />
      </button>
    </div>
  );
};
