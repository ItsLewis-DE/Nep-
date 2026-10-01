import React, { useState, useEffect } from 'react';
import { X, BookOpen, Lock, Sparkles, CheckCircle2, Play } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export interface ChapterInfo {
  id: number;
  tag: string;
  title: string;
  period: string;
  desc: string;
  reward: number;
  unlocked: boolean;
  items: string[];
}

export const CHAPTERS_DATA: ChapterInfo[] = [
  {
    id: 1,
    tag: 'CHƯƠNG 01',
    title: 'Căn Gác Thu 2026',
    period: 'Hiện đại - Ký ức gia đình',
    desc: 'Một chiều thu tĩnh lặng, bạn dọn dẹp căn gác xép của tiệm may cũ và tìm thấy chiếc rương gỗ mun khóa đồng cùng thước gỗ thợ may 1888.',
    reward: 100,
    unlocked: true,
    items: ['Thước gỗ thợ may 1888', 'Chìa khóa đồng cũ']
  },
  {
    id: 2,
    tag: 'CHƯƠNG 02',
    title: 'Phố Hàng Đào 1934',
    period: 'Hà Nội thập niên 1930',
    desc: 'Ngược dòng thời gian về tiệm tơ lụa Hàng Đào, nơi làn sóng áo dài Lemur tân thời của họa sĩ Cát Tường đang mở ra một trang sử mới.',
    reward: 150,
    unlocked: true,
    items: ['Mảnh bản vẽ áo dài Lemur', 'Biên lai kho vải 1935']
  },
  {
    id: 3,
    tag: 'CHƯƠNG 03',
    title: 'Đa Kao 1968',
    period: 'Sài Gòn thập niên 1960',
    desc: 'Khám phá tiệm may thanh lịch vùng Đa Kao giữa tiếng nhạc máy quay đĩa và kỹ thuật ráp tay Raglan phóng khoáng.',
    reward: 200,
    unlocked: false,
    items: ['Cuộn nhật ký tiệm may', 'Băng dải lụa hoa']
  },
  {
    id: 4,
    tag: 'CHƯƠNG 04',
    title: 'Căn Hộ Tập Thể 1982',
    period: 'Thời bao cấp',
    desc: 'Những năm tháng gian khó chắt chiu từng mảnh vải vụn, từng cuộn chỉ tơ đào để gìn giữ nếp áo truyền thống qua bao thăng trầm.',
    reward: 250,
    unlocked: false,
    items: ['Cuộn chỉ tơ đào', 'Kim thêu thép']
  },
  {
    id: 5,
    tag: 'CHƯƠNG 05',
    title: 'Đêm Hội Sinh 2026',
    period: 'Hồi sinh thời đại mới',
    desc: 'Đêm catwalk định mệnh đưa tà áo ngũ thân cách tân bước ra ánh đèn sân khấu quốc tế, hóa giải lời nguyền năm thế hệ thợ may họ Bùi.',
    reward: 500,
    unlocked: false,
    items: ['Hồ sơ giám định 2026', 'Tà áo Remix hoàn mỹ']
  }
];

interface JourneyModalProps {
  isOpen: boolean;
  activeChapterId: number;
  onClose: () => void;
  onClaimReward: (amount: number) => void;
  onSelectChapter: (chapter: ChapterInfo) => void;
}

export const JourneyModal: React.FC<JourneyModalProps> = ({
  isOpen,
  activeChapterId,
  onClose,
  onClaimReward,
  onSelectChapter
}) => {
  const [claimedChapters, setClaimedChapters] = useState<number[]>(() => {
    const saved = localStorage.getItem('tiem_may_claimed_chapters');
    return saved ? JSON.parse(saved) : [1];
  });

  const [chapters, setChapters] = useState<ChapterInfo[]>(() => {
    const saved = localStorage.getItem('tiem_may_unlocked_chapters');
    const unlockedIds: number[] = saved ? JSON.parse(saved) : [1, 2];
    return CHAPTERS_DATA.map((ch) => ({
      ...ch,
      unlocked: unlockedIds.includes(ch.id)
    }));
  });

  useEffect(() => {
    localStorage.setItem('tiem_may_claimed_chapters', JSON.stringify(claimedChapters));
  }, [claimedChapters]);

  if (!isOpen) return null;

  const handleClaim = (ch: ChapterInfo) => {
    soundManager.playChime();
    setClaimedChapters((prev) => {
      const nextClaimed = [...prev, ch.id];
      return nextClaimed;
    });
    onClaimReward(ch.reward);

    // Unlock next chapter
    const nextChapterId = ch.id + 1;
    if (nextChapterId <= CHAPTERS_DATA.length) {
      setChapters((prev) =>
        prev.map((c) => (c.id === nextChapterId ? { ...c, unlocked: true } : c))
      );
      const nextCh = CHAPTERS_DATA.find((c) => c.id === nextChapterId);
      if (nextCh) {
        onSelectChapter({ ...nextCh, unlocked: true });
      }
    }
  };

  const handlePlayChapter = (ch: ChapterInfo) => {
    soundManager.playClick();
    onSelectChapter(ch);
    alert(`Đang tiếp tục: ${ch.tag} - ${ch.title}! Bạn có thể thu thập các mảnh vải và manh mối tại các phân khu.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-2xl bg-[#411D3A] p-1 shadow-2xl border-2 border-[#E09B5A] animate-in fade-in zoom-in-95 duration-200">
        <div className="p-1 bg-[#D37C74]">
          <div className="bg-[#FDE5C8] p-4 md:p-6 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#5C223D]/30 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">📖</span>
                <h2 className="text-lg md:text-xl font-black text-[#5C223D] font-pixel-display">
                  CỐT TRUYỆN: HÀNH TRÌNH TÀ ÁO
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

            {/* Chapter List */}
            <div className="space-y-3">
              {chapters.map((ch) => {
                const isClaimed = claimedChapters.includes(ch.id);
                const isCurrentPlaying = activeChapterId === ch.id;

                return (
                  <div
                    key={ch.id}
                    className={`p-3 md:p-4 border-2 transition-all ${
                      isCurrentPlaying
                        ? 'bg-[#FFFDF5] border-[#E75788] shadow-md ring-2 ring-[#E09B5A]'
                        : ch.unlocked
                        ? 'bg-white/90 border-[#E09B5A] shadow-sm'
                        : 'bg-black/5 border-dashed border-[#5C223D]/40 opacity-70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 font-pixel-display ${
                            isCurrentPlaying
                              ? 'bg-[#E75788] text-white'
                              : 'bg-[#411D3A] text-[#FDE5C8]'
                          }`}>
                            {ch.tag}
                          </span>
                          <span className="text-xs font-semibold text-[#7B3248]">
                            {ch.period}
                          </span>
                          {isCurrentPlaying && (
                            <span className="text-[10px] font-extrabold text-[#B83A24] bg-[#FFE0B2] px-1.5 py-0.5 border border-[#E09B5A]">
                              ★ Đang chơi dở
                            </span>
                          )}
                        </div>
                        <h3 className="font-extrabold text-sm md:text-base text-[#1E1523] mt-1">
                          {ch.title}
                        </h3>
                        <p className="text-xs text-[#5C223D] mt-1 leading-relaxed">
                          {ch.desc}
                        </p>

                        {/* Items preview */}
                        {ch.unlocked && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {ch.items.map((it, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] bg-[#FDEACE] text-[#5C223D] px-2 py-0.5 border border-[#D37C74]/50"
                              >
                                🔍 {it}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right action */}
                      <div className="flex flex-col items-end justify-between self-stretch flex-shrink-0 gap-2">
                        {ch.unlocked ? (
                          <>
                            {isClaimed ? (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 border border-emerald-400">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Đã nhận
                              </span>
                            ) : (
                              <button
                                onClick={() => handleClaim(ch)}
                                className="pixel-btn-primary px-3 py-1.5 text-[11px] font-bold text-white flex items-center gap-1 cursor-pointer"
                              >
                                <Sparkles className="w-3 h-3" />
                                Nhận +{ch.reward} Ngọc
                              </button>
                            )}

                            <button
                              onClick={() => handlePlayChapter(ch)}
                              className={`px-3 py-1 text-[11px] font-bold border cursor-pointer flex items-center gap-1 ${
                                isCurrentPlaying
                                  ? 'bg-[#E09B5A] text-[#1E1523] border-[#5C223D]'
                                  : 'bg-white text-[#5C223D] border-[#D37C74] hover:bg-[#FDEACE]'
                              }`}
                            >
                              <Play className="w-3 h-3" />
                              {isCurrentPlaying ? 'Tiếp tục' : 'Chọn màn'}
                            </button>
                          </>
                        ) : (
                          <div className="flex items-center gap-1 text-xs text-[#7B3248] bg-black/5 px-2 py-1 border border-[#5C223D]/30">
                            <Lock className="w-3 h-3" />
                            Khóa
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t-2 border-[#5C223D]/30 flex justify-end">
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
