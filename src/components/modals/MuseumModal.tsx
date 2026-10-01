import React, { useState } from 'react';
import { X, BookOpen, Award } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface MuseumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MuseumModal: React.FC<MuseumModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'garments' | 'accessories' | 'culture'>('garments');

  if (!isOpen) return null;

  const cultureEntries = [
    {
      title: 'Áo Ngũ Thân Tay Chẽn & Tay Thụng',
      era: 'Triều Nguyễn (1802 - 1945)',
      description: 'Năm thân áo tượng trưng cho tứ thân phụ mẫu (cha mẹ đẻ, cha mẹ chồng/vợ) và người mặc ở giữa. Năm chiếc cúc khuy cài tượng trưng cho Ngũ Thường (Nhân, Lễ, Nghĩa, Trí, Tín).',
      tag: 'Chuẩn Mực Hoàng Triều'
    },
    {
      title: 'Áo Tứ Thân & Nón Ba Tầm Quai Thao',
      era: 'Đồng Bằng Bắc Bộ',
      description: 'Tà áo buông thả hoặc buộc vạt trước bụng, kết hợp yếm hoa đào, khăn mỏ quạ và nón quai thao dệt bằng lá cọ. Biểu tượng mộc mạc, bền bỉ của người phụ nữ Việt.',
      tag: 'Dân Gian Bắc Bộ'
    },
    {
      title: 'Cuộc Cải Cách Áo Dài Lemur 1934',
      era: 'Hà Nội Thập Niên 1930',
      description: 'Họa sĩ Cát Tường (bút danh Le Mur) trên tuần báo Phong Hóa đã cải biến áo ngũ thân: chiết eo thon gọn, cổ lá sen mở rộng, tay bồng kiểu phương Tây, mở ra kỷ nguyên thời trang hiện đại.',
      tag: 'Tân Thời Phong Hóa'
    },
    {
      title: 'Kỹ Thuật Ráp Tay Raglan 1960',
      era: 'Sài Gòn - Đa Kao',
      description: 'Kỹ thuật ráp tay chéo nối từ cổ nách xuống thân áo do nhà may Dung ở Đa Kao sáng tạo năm 1960, giúp nách áo phẳng phiu, không bị nhăn gập khi người phụ nữ cử động.',
      tag: 'Đột Phá Kỹ Thuật'
    },
    {
      title: 'Bí Quyết Nhuộm Tự Nhiên Cổ Truyền',
      era: 'Ngàn Năm Nghề Dệt',
      description: 'Củ nâu tạo sắc nâu đất bền bỉ chống bùn nước; lá chàm ủ vôi tạo sắc xanh đen thăm thẳm; cánh kiến và gỗ vang tạo sắc đỏ son vương giả.',
      tag: 'Di Sản Nhuộm Tự Nhiên'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#411D3A] p-1 shadow-2xl border-2 border-[#E09B5A] animate-in fade-in zoom-in-95 duration-200">
        <div className="p-1 bg-[#D37C74]">
          <div className="bg-[#FDE5C8] p-4 md:p-6 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#5C223D]/30 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">📜</span>
                <h2 className="text-lg md:text-xl font-black text-[#5C223D] font-pixel-display">
                  BẢO TÀNG Y PHỤC VIỆT NAM
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

            {/* Intro text */}
            <p className="text-xs text-[#7B3248] mb-4 leading-relaxed italic">
              "Một tà áo không chỉ che chở nắng mưa, mà là trang sử sống động chuyên chở tinh hoa mỹ thuật, cốt cách và ước mơ của bao thế hệ người Việt."
            </p>

            {/* Knowledge Cards */}
            <div className="space-y-3.5">
              {cultureEntries.map((entry, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 p-4 border-2 border-[#E09B5A] shadow-sm hover:border-[#E75788] transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#5C223D] text-[#FDE5C8] font-pixel-display">
                      {entry.tag}
                    </span>
                    <span className="text-xs font-semibold text-[#B83A24]">
                      {entry.era}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm md:text-base text-[#1E1523] mb-1">
                    {entry.title}
                  </h3>
                  <p className="text-xs text-[#5C223D] leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-3 border-t-2 border-[#5C223D]/30 flex justify-end">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="px-5 py-2 border-2 border-[#5C223D] bg-white text-[#5C223D] text-xs font-bold hover:bg-[#FDEACE] cursor-pointer"
              >
                Trở Về Sân Tiệm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
