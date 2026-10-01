import React from 'react';
import { soundManager } from '../utils/audio';

interface BottomActionCardProps {
  hasCharacter?: boolean;
  characterName?: string;
  currentGarment?: string;
  avatarUrl?: string;
  onStartStory: () => void;
  onGoToStudio: () => void;
  onExploreCourtyard: () => void;
  isExploreMode: boolean;
}

export const BottomActionCard: React.FC<BottomActionCardProps> = ({
  hasCharacter = false,
  characterName = 'An',
  currentGarment = 'Áo dài trắng sen vàng',
  avatarUrl = '/assets/protagonist-avatar.jpg',
  onStartStory,
  onGoToStudio,
  onExploreCourtyard,
  isExploreMode
}) => {
  return (
    <div className="relative inline-block max-w-xl w-full mx-auto select-none transition-all duration-300">
      {/* Corner Lotus Blossom Ornaments */}
      <span className="absolute -top-3.5 -left-3.5 text-xl md:text-2xl z-30 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] animate-pulse">
        🪷
      </span>
      <span className="absolute -top-3.5 -right-3.5 text-xl md:text-2xl z-30 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] animate-pulse">
        🪷
      </span>
      <span className="absolute -bottom-3.5 -left-3.5 text-xl md:text-2xl z-30 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
        🌸
      </span>
      <span className="absolute -bottom-3.5 -right-3.5 text-xl md:text-2xl z-30 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
        🌸
      </span>

      {/* Main 3-layer pixel border box: outer #411D3A, middle #E09B5A, inner #D37C74 */}
      <div className="relative p-1 bg-[#411D3A] shadow-[0_8px_20px_rgba(0,0,0,0.6)]">
        <div className="p-0.5 bg-[#E09B5A]">
          <div className="p-0.5 bg-[#D37C74]">
            {/* Inner Cream-Peach Card Canvas */}
            <div className="bg-[#FDE5C8] px-4 py-3 md:px-5 md:py-3.5 flex items-center gap-4">
              
              {/* Left: Protagonist Portrait in pink/rose frame */}
              <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 p-1 bg-[#D37C74] border-2 border-[#E75788] shadow-md relative group">
                <div className="w-full h-full overflow-hidden bg-[#411D3A]">
                  <img
                    src={avatarUrl}
                    alt={characterName}
                    className="w-full h-full object-cover object-top pixel-art group-hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = '/assets/protagonist-avatar.jpg';
                    }}
                  />
                </div>
                {/* Tiny corner detail */}
                <div className="absolute -bottom-1 -right-1 text-xs">✨</div>
              </div>

              {/* Right: Content & Action Buttons */}
              <div className="flex-1 flex flex-col justify-center min-w-0">
                {hasCharacter ? (
                  /* ================= STATE 2: ĐÃ CÓ NHÂN VẬT ================= */
                  <>
                    <h3 className="font-black text-base md:text-lg lg:text-xl text-[#1E1523] leading-tight tracking-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                      Chào {characterName}, hôm nay mặc gì?
                    </h3>
                    <p className="text-xs md:text-sm text-[#7B3248] font-medium mt-0.5 mb-2 leading-snug line-clamp-1">
                      Đang mặc: <span className="font-bold text-[#5C223D]">{currentGarment}</span>
                    </p>

                    {/* Pink Button: Vào Phòng phối đồ ▸ */}
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        onGoToStudio();
                      }}
                      className="pixel-btn-primary cursor-pointer w-full py-2 px-4 flex items-center justify-center gap-1.5 text-center text-[#FDE5C8] font-bold text-xs md:text-sm tracking-wide select-none group"
                    >
                      <span>Vào Phòng phối đồ</span>
                      <span className="text-[#FDE5C8] group-hover:translate-x-1 transition-transform">▸</span>
                    </button>
                  </>
                ) : (
                  /* ================= STATE 1: CHƯA CÓ NHÂN VẬT ================= */
                  <>
                    <h3 className="font-black text-base md:text-lg lg:text-xl text-[#1E1523] leading-tight tracking-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                      Bắt đầu câu chuyện của bạn
                    </h3>
                    <p className="text-xs md:text-sm text-[#7B3248] font-medium mt-0.5 mb-2 leading-snug line-clamp-1 md:line-clamp-none">
                      Từ ảnh của bạn đến nhân vật pixel và lookbook 4 góc.
                    </p>

                    {/* Primary Button */}
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        onStartStory();
                      }}
                      className="pixel-btn-primary cursor-pointer w-full py-2 px-4 flex items-center justify-center gap-1.5 text-center text-[#FDE5C8] font-bold text-xs md:text-sm tracking-wide select-none group"
                    >
                      <span>Tạo nhân vật từ ảnh</span>
                      <span className="text-[#FDE5C8] group-hover:translate-x-1 transition-transform">▸</span>
                    </button>
                  </>
                )}

                {/* Sublink: Dạo quanh sân nhà */}
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onExploreCourtyard();
                  }}
                  className="mt-1.5 text-[11px] md:text-xs font-semibold text-[#5C223D] hover:text-[#E75788] underline underline-offset-2 transition-colors self-center flex items-center gap-0.5 cursor-pointer"
                >
                  <span>{isExploreMode ? 'Hiện thanh công cụ ▾' : 'Dạo quanh sân nhà ▸'}</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
