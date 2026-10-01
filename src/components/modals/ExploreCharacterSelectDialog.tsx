import React, { useState } from 'react';
import { Check, Sparkles, X, User } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface ExploreCharacterSelectDialogProps {
  isOpen: boolean;
  initialGender?: 'female' | 'male';
  initialName?: string;
  onConfirm: (gender: 'female' | 'male', name: string) => void;
  onClose: () => void;
}

export const ExploreCharacterSelectDialog: React.FC<ExploreCharacterSelectDialogProps> = ({
  isOpen,
  initialGender = 'female',
  initialName = 'Thợ May Mới',
  onConfirm,
  onClose
}) => {
  const [selectedGender, setSelectedGender] = useState<'female' | 'male'>(initialGender);
  const [characterName, setCharacterName] = useState<string>(initialName);

  if (!isOpen) return null;

  const handleStart = () => {
    soundManager.playChime();
    const finalName = characterName.trim() || 'Thợ May Mới';
    onConfirm(selectedGender, finalName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs select-none">
      {/* 3-layer pixel border box: outer #411D3A, middle #E09B5A, inner #D37C74 */}
      <div className="relative w-full max-w-md bg-[#411D3A] p-1 shadow-[0_12px_36px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-150">
        <div className="p-0.5 bg-[#E09B5A]">
          <div className="p-0.5 bg-[#D37C74]">
            {/* Inner Cream-Peach Card Canvas */}
            <div className="bg-[#FDE5C8] p-5 md:p-6">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#5C223D]/30 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎋</span>
                  <h3 className="font-black text-base md:text-lg text-[#5C223D] uppercase font-pixel-display tracking-wide">
                    CHỌN NHÂN VẬT DẠO SÂN
                  </h3>
                </div>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                  }}
                  className="w-7 h-7 flex items-center justify-center bg-[#411D3A] text-[#FDE5C8] hover:bg-[#A53556] border border-[#E09B5A] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Instructions */}
              <p className="text-xs text-[#7B3248] font-medium mb-3.5 text-center">
                Chọn người đồng hành dạo bước trong khoảng sân hoàng hôn ấm áp:
              </p>

              {/* Two Character Options: Nữ & Nam */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                
                {/* 1. Nữ */}
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedGender('female');
                  }}
                  className={`relative p-3 border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                    selectedGender === 'female'
                      ? 'bg-[#FFF9F2] border-[#E75788] ring-2 ring-[#E75788] shadow-md -translate-y-1'
                      : 'bg-white/70 border-[#D37C74]/50 hover:bg-white'
                  }`}
                >
                  {selectedGender === 'female' && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#E75788] text-white flex items-center justify-center text-xs">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className="w-20 h-24 overflow-hidden rounded bg-[#411D3A]/10 border border-[#D37C74] mb-2 flex items-center justify-center">
                    <img
                      src="/assets/protagonist-avatar.jpg"
                      alt="Nhân vật Nữ"
                      className="w-full h-full object-cover object-top pixel-art"
                    />
                  </div>
                  <span className="font-black text-xs md:text-sm text-[#1E1523]">
                    Thiếu Nữ (Nữ)
                  </span>
                  <span className="text-[10px] text-[#7B3248] mt-0.5">
                    Áo dài trắng sen vàng
                  </span>
                </button>

                {/* 2. Nam */}
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedGender('male');
                  }}
                  className={`relative p-3 border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                    selectedGender === 'male'
                      ? 'bg-[#FFF9F2] border-[#E75788] ring-2 ring-[#E75788] shadow-md -translate-y-1'
                      : 'bg-white/70 border-[#D37C74]/50 hover:bg-white'
                  }`}
                >
                  {selectedGender === 'male' && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#E75788] text-white flex items-center justify-center text-xs">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className="w-20 h-24 overflow-hidden rounded bg-[#411D3A]/10 border border-[#D37C74] mb-2 flex items-center justify-center">
                    <img
                      src="/assets/protagonist-male.png"
                      alt="Nhân vật Nam"
                      className="w-full h-full object-contain object-top pixel-art filter drop-shadow"
                    />
                  </div>
                  <span className="font-black text-xs md:text-sm text-[#1E1523]">
                    Thư Sinh (Nam)
                  </span>
                  <span className="text-[10px] text-[#7B3248] mt-0.5">
                    Ngũ thân chẽn lam
                  </span>
                </button>

              </div>

              {/* Name Input Box - Default: "Thợ May Mới" */}
              <div className="mb-5 bg-[#FDEACE] p-3 border border-[#E09B5A]">
                <label className="block text-[11px] font-bold text-[#5C223D] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#E75788]" />
                  <span>Đặt tên nhân vật:</span>
                </label>
                <input
                  type="text"
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                  placeholder="Thợ May Mới"
                  className="w-full px-3 py-2 bg-white border-2 border-[#5C223D] text-xs md:text-sm font-bold text-[#1E1523] focus:outline-none focus:ring-2 focus:ring-[#E75788]"
                  maxLength={24}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#5C223D]/25">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                  }}
                  className="pixel-btn-secondary px-4 py-2 font-bold text-xs cursor-pointer"
                >
                  Để sau
                </button>
                <button
                  type="button"
                  onClick={handleStart}
                  className="pixel-btn-primary px-5 py-2 font-bold text-xs text-[#FDE5C8] cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Bắt đầu dạo sân ▸</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
