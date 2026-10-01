import React from 'react';
import { soundManager } from '../utils/audio';

interface ChapterCardProps {
  onOpenChapter: () => void;
  chapterNumber?: string;
  chapterTitle?: string;
  rewardAmount?: number;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  onOpenChapter,
  chapterNumber = 'CHƯƠNG 01',
  chapterTitle = 'Tà áo ngày tự trường',
  rewardAmount = 100
}) => {
  return (
    <div
      onClick={() => {
        soundManager.playChime();
        onOpenChapter();
      }}
      className="relative group cursor-pointer select-none transition-transform duration-200 hover:-translate-y-1 active:translate-y-0"
      title="Tiếp tục chương truyện - Nhận thưởng Sen Ngọc"
    >
      {/* Hanging red string & tassel on the left */}
      <div className="absolute -top-3 left-3 w-0.5 h-3 bg-[#B83A24]" />
      <div className="absolute -left-2 top-8 flex flex-col items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-[#B83A24]" />
        <div className="w-0.5 h-6 bg-[#B83A24]" />
        <div className="w-1.5 h-3 bg-[#B83A24] rounded-b-sm" />
      </div>

      {/* Main vertical scroll body */}
      <div className="relative bg-[#FDE5C8] w-36 md:w-40 px-3 py-3 border-2 border-[#E09B5A] shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover:border-[#E75788] group-hover:shadow-[0_0_12px_rgba(231,87,136,0.6)]">
        {/* Subtle decorative inner hairline border */}
        <div className="absolute inset-1 border border-[#D37C74]/50 pointer-events-none" />

        {/* Top Tag: CHƯƠNG 01 / MỞ ĐẦU */}
        <div className="text-center">
          <span className="font-extrabold text-[10px] md:text-xs text-[#B83A24] tracking-widest uppercase font-pixel-display">
            {chapterNumber}
          </span>
        </div>

        {/* Chapter Title */}
        <div className="text-center my-1">
          <p className="font-black text-xs md:text-sm text-[#1E1523] leading-snug">
            {chapterTitle}
          </p>
        </div>

        {/* Center Pixel Jasmine Flower & Red Tassel Icon */}
        <div className="my-2 flex justify-center">
          <div className="w-10 h-10 md:w-12 md:h-12 overflow-hidden flex items-center justify-center p-0.5 rounded border border-[#E09B5A]/40 bg-white/40">
            <img
              src="/assets/jasmine-tassel.jpg"
              alt="Hoa nhài tua đỏ"
              className="w-full h-full object-contain pixel-art filter drop-shadow group-hover:scale-110 transition-transform duration-200"
              onError={(e) => {
                // In case image not ready, render pixel emoji
                const target = e.currentTarget;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Bottom Reward Gem + Amount */}
        <div className="flex items-center justify-center gap-1.5 pt-1 border-t border-[#D37C74]/40">
          <div className="w-4 h-4 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-[#9B1D56] to-[#FB6F92] border border-[#FF80AA]">
            <span className="text-[9px]">🪷</span>
          </div>
          <span className="font-bold text-[11px] md:text-xs text-[#5C223D]">
            +{rewardAmount} Sen Ngọc
          </span>
        </div>
      </div>
    </div>
  );
};
