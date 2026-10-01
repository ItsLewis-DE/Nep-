import React, { useState } from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import { GARMENTS_CATALOG, ACCESSORIES_CATALOG } from '../../data/catalog';
import { soundManager } from '../../utils/audio';

interface StudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOutfitChange?: (garmentName: string) => void;
}

export const StudioModal: React.FC<StudioModalProps> = ({
  isOpen,
  onClose,
  onOutfitChange
}) => {
  const [selectedGarment, setSelectedGarment] = useState(GARMENTS_CATALOG[0]);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([
    ACCESSORIES_CATALOG[0].id
  ]);
  const [selectedColor, setSelectedColor] = useState('#F5EFEB');

  if (!isOpen) return null;

  const toggleAccessory = (id: string) => {
    soundManager.playClick();
    setSelectedAccessories((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    soundManager.playChime();
    if (onOutfitChange) {
      onOutfitChange(selectedGarment.name);
    }
    onClose();
  };

  const heritageColors = [
    { name: 'Giấy Dó (Trắng Ngà)', hex: '#F5EFEB' },
    { name: 'Hoàng Yến (Vàng Tơ)', hex: '#CFA449' },
    { name: 'Son Điều (Đỏ Thắm)', hex: '#B83A24' },
    { name: 'Men Lam (Xanh Ngọc)', hex: '#2D6A5D' },
    { name: 'Lá Chàm (Xanh Đen)', hex: '#1E2A38' },
    { name: 'Củ Nâu (Mộc Mạc)', hex: '#6B4423' },
    { name: 'Hồng Sen (Ngọt Ngào)', hex: '#E75788' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#411D3A] p-1 shadow-2xl border-2 border-[#E09B5A] animate-in fade-in zoom-in-95 duration-200">
        <div className="p-1 bg-[#D37C74]">
          <div className="bg-[#FDE5C8] p-4 md:p-6 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#5C223D]/30 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🪞</span>
                <h2 className="text-lg md:text-xl font-black text-[#5C223D] font-pixel-display">
                  PHÒNG PHỐI ĐỒ (STUDIO)
                </h2>
              </div>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="w-8 h-8 flex items-center justify-center bg-[#411D3A] text-[#FDE5C8] hover:bg-[#A53556] border border-[#E09B5A] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Preview */}
              <div className="flex flex-col items-center justify-center p-4 bg-[#FDEACE] border-2 border-[#E09B5A] relative">
                <div className="w-36 h-48 relative flex items-center justify-center overflow-hidden bg-[#251728]/10 border border-[#D37C74]">
                  <img
                    src="/assets/protagonist-standing.jpg"
                    alt="Mannequin"
                    className="w-full h-full object-contain pixel-art filter drop-shadow-md"
                  />
                  {/* Color tint indicator */}
                  <div
                    className="absolute bottom-2 right-2 w-6 h-6 border-2 border-[#411D3A] shadow"
                    style={{ backgroundColor: selectedColor }}
                    title={`Màu vải: ${selectedColor}`}
                  />
                </div>
                <p className="mt-3 font-bold text-sm text-[#1E1523] text-center">
                  {selectedGarment.name}
                </p>
                <p className="text-xs text-[#7B3248] text-center mt-1 leading-relaxed">
                  {selectedGarment.cultural_summary}
                </p>
              </div>

              {/* Right: Customization Controls */}
              <div className="space-y-4">
                {/* 1. Silhouette selection */}
                <div>
                  <h4 className="text-xs font-bold text-[#5C223D] uppercase tracking-wider mb-2">
                    1. Chọn Cổ & Thân Áo
                  </h4>
                  <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto pr-1">
                    {GARMENTS_CATALOG.map((garment) => (
                      <button
                        key={garment.id}
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedGarment(garment);
                        }}
                        className={`text-left px-2.5 py-1.5 text-xs font-medium border cursor-pointer transition-all flex items-center justify-between ${
                          selectedGarment.id === garment.id
                            ? 'bg-[#E75788] text-white border-[#411D3A] font-bold shadow'
                            : 'bg-white/80 text-[#1E1523] border-[#D37C74]/50 hover:bg-white'
                        }`}
                      >
                        <span className="truncate">{garment.name}</span>
                        {selectedGarment.id === garment.id && (
                          <Check className="w-3.5 h-3.5 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Traditional Color Palette */}
                <div>
                  <h4 className="text-xs font-bold text-[#5C223D] uppercase tracking-wider mb-2">
                    2. Màu Vải Tự Nhiên
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {heritageColors.map((color) => (
                      <button
                        key={color.hex}
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedColor(color.hex);
                        }}
                        className={`w-7 h-7 border-2 cursor-pointer transition-transform hover:scale-110 relative ${
                          selectedColor === color.hex
                            ? 'border-[#411D3A] ring-2 ring-[#E75788] scale-110'
                            : 'border-white/80'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* 3. Accessories */}
                <div>
                  <h4 className="text-xs font-bold text-[#5C223D] uppercase tracking-wider mb-2">
                    3. Phụ Kiện Đi Kèm
                  </h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    {ACCESSORIES_CATALOG.map((acc) => {
                      const isSelected = selectedAccessories.includes(acc.id);
                      return (
                        <button
                          key={acc.id}
                          onClick={() => toggleAccessory(acc.id)}
                          className={`text-left px-2 py-1.5 text-[11px] border cursor-pointer transition-colors truncate ${
                            isSelected
                              ? 'bg-[#411D3A] text-[#FDE5C8] border-[#E09B5A]'
                              : 'bg-white/60 text-[#5C223D] border-[#D37C74]/40 hover:bg-white'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {acc.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-3 border-t-2 border-[#5C223D]/30 flex justify-end gap-3">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="px-4 py-2 border-2 border-[#5C223D] bg-white text-[#5C223D] text-xs font-bold hover:bg-[#FDEACE] cursor-pointer"
              >
                Đóng
              </button>
              <button
                onClick={handleApply}
                className="pixel-btn-primary px-5 py-2 text-[#FDE5C8] text-xs font-bold cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Mặc Lên Người
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
