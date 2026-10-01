import React, { useState } from 'react';
import { X, Upload, Sparkles, Camera, Check, RefreshCw } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface CharacterCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveAvatar: (avatarUrl: string, name: string) => void;
}

export const CharacterCreatorModal: React.FC<CharacterCreatorModalProps> = ({
  isOpen,
  onClose,
  onSaveAvatar
}) => {
  const [characterName, setCharacterName] = useState('An');
  const [selectedHairstyle, setSelectedHairstyle] = useState('wavy_flower');
  const [selectedOutfit, setSelectedOutfit] = useState('white_lotus');
  const [selectedExpression, setSelectedExpression] = useState('gentle_smile');
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    soundManager.playClick();
    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      setTimeout(() => {
        setUploadedPhotoUrl(event.target?.result as string);
        setIsProcessing(false);
        soundManager.playChime();
      }, 700);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    soundManager.playChime();
    onSaveAvatar('/assets/protagonist-avatar.jpg', characterName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#411D3A] p-1 shadow-2xl border-2 border-[#E09B5A] animate-in fade-in zoom-in-95 duration-200">
        <div className="p-1 bg-[#D37C74]">
          <div className="bg-[#FDE5C8] p-4 md:p-6 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#5C223D]/30 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <h2 className="text-lg md:text-xl font-black text-[#5C223D] font-pixel-display">
                  TẠO NHÂN VẬT & LOOKBOOK 4 GÓC
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

            {/* Split layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Preview Lookbook */}
              <div className="flex flex-col items-center p-4 bg-[#FDEACE] border-2 border-[#E09B5A]">
                <div className="relative w-36 h-48 border-2 border-[#D37C74] bg-[#251728]/15 flex items-center justify-center overflow-hidden">
                  <img
                    src="/assets/protagonist-avatar.jpg"
                    alt="Pixel Avatar"
                    className="w-full h-full object-cover pixel-art filter drop-shadow"
                  />
                  {uploadedPhotoUrl && (
                    <div className="absolute top-2 right-2 w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow">
                      <img
                        src={uploadedPhotoUrl}
                        alt="Selfie"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {isProcessing && (
                    <div className="absolute inset-0 bg-[#251728]/85 flex flex-col items-center justify-center text-white text-xs p-2 text-center">
                      <RefreshCw className="w-6 h-6 animate-spin text-[#E75788] mb-2" />
                      <span>Đang chuyển ảnh thành nét pixel art...</span>
                    </div>
                  )}
                </div>

                {/* 4-angle Lookbook indicator */}
                <div className="mt-3 text-center">
                  <span className="text-[11px] font-bold text-[#5C223D] uppercase tracking-wider">
                    Lookbook 4 Góc Nhìn:
                  </span>
                  <div className="flex gap-2 mt-1 justify-center">
                    {['Chính Diện', 'Nghiêng 45°', 'Góc Cạnh', 'Sau Lưng'].map((angle, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] px-1.5 py-0.5 bg-white border border-[#D37C74]/50 text-[#7B3248] font-medium"
                      >
                        {angle}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Character Name Input */}
                <div className="mt-4 w-full">
                  <label className="block text-[11px] font-bold text-[#5C223D] uppercase mb-1">
                    Tên Nhân Vật:
                  </label>
                  <input
                    type="text"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#5C223D] text-xs font-bold text-[#1E1523] focus:outline-none focus:ring-1 focus:ring-[#E75788]"
                    placeholder="Nhập tên nhân vật..."
                  />
                </div>
              </div>

              {/* Right Column: Customization Controls & Photo Upload */}
              <div className="space-y-4">
                {/* 1. Upload Photo / Selfie */}
                <div>
                  <h4 className="text-xs font-bold text-[#5C223D] uppercase tracking-wider mb-1.5">
                    1. Tải Ảnh Chân Dung / Selfie
                  </h4>
                  <label className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-[#5C223D]/50 bg-white/70 hover:bg-white cursor-pointer transition-colors">
                    <Camera className="w-5 h-5 text-[#E75788] mb-1" />
                    <span className="text-xs font-bold text-[#5C223D]">
                      Chọn ảnh chân dung từ thiết bị
                    </span>
                    <span className="text-[10px] text-[#7B3248]">
                      Tự động trích xuất kiểu tóc và tông da sang pixel art
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* 2. Hairstyle selector */}
                <div>
                  <h4 className="text-xs font-bold text-[#5C223D] uppercase tracking-wider mb-1.5">
                    2. Kiểu Tóc Truyền Thống
                  </h4>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {[
                      { id: 'wavy_flower', name: 'Tóc lượn sóng cài hoa' },
                      { id: 'khan_van', name: 'Búi vấn khăn nhung' },
                      { id: 'braid', name: 'Tết bím đôi thiếu nữ' },
                      { id: 'lemur_bob', name: 'Uốn ngắn Lemur 1934' }
                    ].map((hair) => (
                      <button
                        key={hair.id}
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedHairstyle(hair.id);
                        }}
                        className={`p-1.5 text-left border cursor-pointer truncate ${
                          selectedHairstyle === hair.id
                            ? 'bg-[#E75788] text-white border-[#411D3A] font-bold'
                            : 'bg-white/70 border-[#D37C74]/40 text-[#5C223D] hover:bg-white'
                        }`}
                      >
                        {selectedHairstyle === hair.id ? '✓ ' : ''}
                        {hair.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Garment Selection */}
                <div>
                  <h4 className="text-xs font-bold text-[#5C223D] uppercase tracking-wider mb-1.5">
                    3. Tà Áo Khởi Đầu
                  </h4>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {[
                      { id: 'white_lotus', name: 'Áo dài trắng sen vàng' },
                      { id: 'son_dieu', name: 'Áo tứ thân son điều' },
                      { id: 'men_lam', name: 'Ngũ thân tay chẽn lam' },
                      { id: 'hoang_yen', name: 'Áo Lemur hoàng yến' }
                    ].map((outfit) => (
                      <button
                        key={outfit.id}
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedOutfit(outfit.id);
                        }}
                        className={`p-1.5 text-left border cursor-pointer truncate ${
                          selectedOutfit === outfit.id
                            ? 'bg-[#E75788] text-white border-[#411D3A] font-bold'
                            : 'bg-white/70 border-[#D37C74]/40 text-[#5C223D] hover:bg-white'
                        }`}
                      >
                        {selectedOutfit === outfit.id ? '✓ ' : ''}
                        {outfit.name}
                      </button>
                    ))}
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
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="pixel-btn-primary px-5 py-2 text-[#FDE5C8] text-xs font-bold cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                Lưu Nhân Vật
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
