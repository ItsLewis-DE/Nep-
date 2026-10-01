import React, { useState } from 'react';
import { X, Sparkles, Check, ShoppingBag } from 'lucide-react';
import { ACCESSORIES_CATALOG } from '../../data/catalog';
import { soundManager } from '../../utils/audio';

interface ClosetModalProps {
  isOpen: boolean;
  onClose: () => void;
  senNgoc: number;
  onUpdateSenNgoc: (newAmount: number) => void;
}

export const ClosetModal: React.FC<ClosetModalProps> = ({
  isOpen,
  onClose,
  senNgoc,
  onUpdateSenNgoc
}) => {
  const [ownedAccessories, setOwnedAccessories] = useState<string[]>([
    'khan-van-den',
    'guoc-moc-quai-nhung'
  ]);

  if (!isOpen) return null;

  const handleBuy = (acc: typeof ACCESSORIES_CATALOG[0]) => {
    if (senNgoc < acc.sen_ngoc_price) {
      alert('Bạn không đủ Sen Ngọc! Hãy đọc thêm cốt truyện để nhận thưởng nhé.');
      return;
    }
    soundManager.playChime();
    onUpdateSenNgoc(senNgoc - acc.sen_ngoc_price);
    setOwnedAccessories((prev) => [...prev, acc.id]);
  };

  const handleClaimDailyGift = () => {
    soundManager.playChime();
    onUpdateSenNgoc(senNgoc + 50);
    alert('Nhận thành công quà điểm danh ngày: +50 Sen Ngọc!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#411D3A] p-1 shadow-2xl border-2 border-[#E09B5A] animate-in fade-in zoom-in-95 duration-200">
        <div className="p-1 bg-[#D37C74]">
          <div className="bg-[#FDE5C8] p-4 md:p-6 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#5C223D]/30 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧥</span>
                <h2 className="text-lg md:text-xl font-black text-[#5C223D] font-pixel-display">
                  TỦ ĐỒ & XƯỞNG MAY PHỤ KIỆN
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

            {/* Current Balance Bar */}
            <div className="flex items-center justify-between bg-[#251728] text-[#FDE5C8] p-3 border-2 border-[#E09B5A] mb-4">
              <div className="flex items-center gap-2">
                <span className="text-base">🪷</span>
                <span className="text-xs font-bold uppercase tracking-wider">
                  Số Dư Sen Ngọc:
                </span>
                <span className="text-base font-extrabold text-[#FDE5C8] font-pixel-display">
                  {senNgoc.toLocaleString('vi-VN')}
                </span>
              </div>
              <button
                onClick={handleClaimDailyGift}
                className="pixel-btn-primary px-3 py-1 text-xs font-bold text-white flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Điểm danh (+50)
              </button>
            </div>

            {/* Accessory catalog */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ACCESSORIES_CATALOG.map((acc) => {
                const isOwned = ownedAccessories.includes(acc.id);

                return (
                  <div
                    key={acc.id}
                    className="p-3 bg-white/90 border-2 border-[#E09B5A] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-extrabold text-sm text-[#1E1523]">
                          {acc.name}
                        </h4>
                        <span className="text-[10px] uppercase font-bold text-[#7B3248] bg-[#FDEACE] px-1.5 py-0.5 border border-[#D37C74]/40">
                          {acc.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#5C223D] mb-2 leading-relaxed">
                        {acc.cultural_note}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#D37C74]/30 mt-2">
                      <div className="flex items-center gap-1">
                        <span className="text-xs">🪷</span>
                        <span className="text-xs font-bold text-[#5C223D]">
                          {acc.sen_ngoc_price === 0 ? 'Miễn phí' : `${acc.sen_ngoc_price} Ngọc`}
                        </span>
                      </div>

                      {isOwned ? (
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Đã có trong tủ
                        </span>
                      ) : (
                        <button
                          onClick={() => handleBuy(acc)}
                          className="pixel-btn-primary px-3 py-1 text-xs font-bold text-white flex items-center gap-1 cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3" /> Mua ngay
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 pt-3 border-t-2 border-[#5C223D]/30 flex justify-end">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="px-5 py-2 border-2 border-[#5C223D] bg-white text-[#5C223D] text-xs font-bold hover:bg-[#FDEACE] cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
