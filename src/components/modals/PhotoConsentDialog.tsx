import React from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface PhotoConsentDialogProps {
  isOpen: boolean;
  onAgree: () => void;
  onCancel: () => void;
}

export const PhotoConsentDialog: React.FC<PhotoConsentDialogProps> = ({
  isOpen,
  onAgree,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs select-none">
      {/* 3-layer pixel border box: outer #411D3A, middle #E09B5A, inner #D37C74 */}
      <div className="relative w-full max-w-sm bg-[#411D3A] p-1 shadow-[0_12px_32px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-150">
        <div className="p-0.5 bg-[#E09B5A]">
          <div className="p-0.5 bg-[#D37C74]">
            {/* Inner Cream-Peach Card Canvas */}
            <div className="bg-[#FDE5C8] p-5 md:p-6 text-center">
              
              {/* Corner tiny lotus blossom accents */}
              <span className="absolute top-2 left-2 text-sm leading-none filter drop-shadow">🌸</span>
              <span className="absolute top-2 right-2 text-sm leading-none filter drop-shadow">🌸</span>

              {/* Decorative Shield Icon */}
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded bg-[#411D3A] border-2 border-[#E09B5A] shadow-md">
                <ShieldCheck className="w-6 h-6 text-[#FDE5C8]" />
              </div>

              {/* Title */}
              <h3 className="font-black text-base md:text-lg text-[#1E1523] uppercase font-pixel-display tracking-wide mb-2.5 drop-shadow-[0_1px_0_#FFF]">
                BẢO MẬT HÌNH ẢNH
              </h3>

              {/* Exact Requested Disclaimer Text */}
              <p className="text-xs md:text-sm font-semibold text-[#5C223D] leading-relaxed mb-6 px-1">
                Tiệm chỉ dùng ảnh này một lần để đọc nếp áo, không lưu lại hình ảnh của bạn.
              </p>

              {/* Action Buttons: "Đồng ý" và "Để sau" */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onCancel();
                  }}
                  className="pixel-btn-secondary px-5 py-2 font-bold text-xs tracking-wide cursor-pointer w-1/2 flex items-center justify-center"
                >
                  Để sau
                </button>

                <button
                  onClick={() => {
                    soundManager.playChime();
                    onAgree();
                  }}
                  className="pixel-btn-primary px-5 py-2 font-bold text-xs text-[#FDE5C8] tracking-wide cursor-pointer w-1/2 flex items-center justify-center gap-1 shadow-md"
                >
                  <span>Đồng ý</span>
                  <span>▸</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
