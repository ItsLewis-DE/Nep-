import React, { useState, useEffect, useRef } from 'react';
import { LogoCluster } from './components/LogoCluster';
import { SloganBanner } from './components/SloganBanner';
import { TopHud } from './components/TopHud';
import { NavigationSignboard, SignboardId } from './components/NavigationSignboard';
import { BottomActionCard } from './components/BottomActionCard';
import { ChapterCard } from './components/ChapterCard';
import { StudioModal } from './components/modals/StudioModal';
import { JourneyModal, ChapterInfo, CHAPTERS_DATA } from './components/modals/JourneyModal';
import { MuseumModal } from './components/modals/MuseumModal';
import { ClosetModal } from './components/modals/ClosetModal';
import { CharacterCreatorModal } from './components/modals/CharacterCreatorModal';
import { PhotoConsentDialog } from './components/modals/PhotoConsentDialog';
import { ExploreCharacterSelectDialog } from './components/modals/ExploreCharacterSelectDialog';
import { soundManager } from './utils/audio';

export default function App() {
  // 1. Sen Ngọc Currency State (persisted in localStorage)
  const [senNgoc, setSenNgoc] = useState<number>(() => {
    const saved = localStorage.getItem('tiem_may_sen_ngoc');
    return saved !== null ? parseInt(saved, 10) : 1250;
  });

  // 2. Character Persistence State
  const [hasCharacter, setHasCharacter] = useState<boolean>(() => {
    const saved = localStorage.getItem('tiem_may_has_character');
    return saved === 'true';
  });

  const [characterName, setCharacterName] = useState<string>(() => {
    return localStorage.getItem('tiem_may_char_name') || 'An';
  });

  const [characterGender, setCharacterGender] = useState<'female' | 'male'>(() => {
    return (localStorage.getItem('tiem_may_char_gender') as 'female' | 'male') || 'female';
  });

  const [characterAvatar, setCharacterAvatar] = useState<string>(() => {
    return localStorage.getItem('tiem_may_char_avatar') || '/assets/protagonist-avatar.jpg';
  });

  const [currentGarment, setCurrentGarment] = useState<string>(() => {
    return localStorage.getItem('tiem_may_char_garment') || 'Áo dài trắng sen vàng';
  });

  // 3. Current In-Progress Chapter (persisted in localStorage)
  const [currentChapter, setCurrentChapter] = useState<{
    id: number;
    tag: string;
    title: string;
    reward: number;
  }>(() => {
    const saved = localStorage.getItem('tiem_may_current_chapter');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      id: 1,
      tag: 'CHƯƠNG 01',
      title: 'Tà áo ngày tự trường',
      reward: 100
    };
  });

  // 4. Audio & Explore Mode State
  const [isMuted, setIsMuted] = useState<boolean>(() => soundManager.getMuted());
  const [isExploreMode, setIsExploreMode] = useState<boolean>(false);

  // 5. Modals & Dialogs State
  const [activeModal, setActiveModal] = useState<
    'studio' | 'journey' | 'museum' | 'closet' | 'creator' | null
  >(null);
  const [isPhotoConsentOpen, setIsPhotoConsentOpen] = useState<boolean>(false);
  const [isExploreSelectOpen, setIsExploreSelectOpen] = useState<boolean>(false);

  // 6. Interactive Zones Hover & Mobile Selection
  const [hoveredZone, setHoveredZone] = useState<SignboardId | null>(null);
  const [mobileSelectedZone, setMobileSelectedZone] = useState<SignboardId | null>(null);

  // 7. Cat State (Sleeping vs Awake)
  const [isCatAwake, setIsCatAwake] = useState<boolean>(false);
  const [catDialogue, setCatDialogue] = useState<string | null>(null);
  const catSleepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 8. Active dialogue speech bubbles on the courtyard
  const [activeDialogue, setActiveDialogue] = useState<{
    target: 'protagonist' | 'tailor' | 'lotusGirl';
    text: string;
  } | null>(null);

  const catRandomGreetings = [
    'Meo, hôm nay mặc gì đây?',
    'Meo! Nép dậy rồi nè, tà áo hôm nay duyên dáng quá!',
    'Meo, bạn ghé tiệm may chọn lụa tơ tằm à?',
    'Meo... nắng chiều đẹp quá, cùng đi dạo hồ sen nhé!',
    'Lụa Hà Đông trong tiệm vừa thơm vừa mượt đó meo~'
  ];

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('tiem_may_sen_ngoc', String(senNgoc));
  }, [senNgoc]);

  useEffect(() => {
    localStorage.setItem('tiem_may_has_character', String(hasCharacter));
  }, [hasCharacter]);

  useEffect(() => {
    localStorage.setItem('tiem_may_char_name', characterName);
  }, [characterName]);

  useEffect(() => {
    localStorage.setItem('tiem_may_char_gender', characterGender);
  }, [characterGender]);

  useEffect(() => {
    localStorage.setItem('tiem_may_char_avatar', characterAvatar);
  }, [characterAvatar]);

  useEffect(() => {
    localStorage.setItem('tiem_may_char_garment', currentGarment);
  }, [currentGarment]);

  useEffect(() => {
    localStorage.setItem('tiem_may_current_chapter', JSON.stringify(currentChapter));
  }, [currentChapter]);

  // Audio mute toggle
  const handleToggleMute = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
  };

  // Dialogue dismiss after timeout
  useEffect(() => {
    if (activeDialogue) {
      const timer = setTimeout(() => {
        setActiveDialogue(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeDialogue]);

  // Zone Navigation Handler
  const handleZoneNavigation = (zoneId: SignboardId) => {
    const isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    if (isTouchDevice && mobileSelectedZone !== zoneId) {
      soundManager.playChime();
      setMobileSelectedZone(zoneId);
      return;
    }

    setMobileSelectedZone(null);
    setHoveredZone(null);
    setActiveModal(zoneId);
  };

  // Cat Interaction Handler
  const handleCatInteraction = () => {
    soundManager.playCatMeow();
    setIsCatAwake(true);
    const greeting =
      catRandomGreetings[Math.floor(Math.random() * catRandomGreetings.length)];
    setCatDialogue(greeting);

    if (catSleepTimerRef.current) {
      clearTimeout(catSleepTimerRef.current);
    }

    catSleepTimerRef.current = setTimeout(() => {
      setIsCatAwake(false);
      setCatDialogue(null);
    }, 4500);
  };

  // Character Dialogue Handlers
  const handleProtagonistClick = () => {
    soundManager.playChime();
    setActiveDialogue({
      target: 'protagonist',
      text: `Chào bạn! Mình là ${characterName}. Cùng mình khám phá vẻ đẹp Việt phục nhé!`
    });
  };

  const handleTailorGirlClick = () => {
    soundManager.playClick();
    setActiveDialogue({
      target: 'tailor',
      text: 'Tà áo Lemur kết hợp cổ sen hay áo tấc hoàng triều đều đang chờ bạn thử đó!'
    });
  };

  const handleLotusGirlClick = () => {
    soundManager.playClick();
    setActiveDialogue({
      target: 'lotusGirl',
      text: 'Ngắm hoa sen nở trong hoàng hôn thật thanh tịnh. Bạn có thích sắc màu men lam không?'
    });
  };

  // Photo Creation Action Handlers
  const handlePhotoActionClick = () => {
    soundManager.playClick();
    setIsPhotoConsentOpen(true);
  };

  const handlePhotoConsentAgree = () => {
    setIsPhotoConsentOpen(false);
    setActiveModal('creator');
  };

  // Explore Mode Handlers
  const handleExploreActionClick = () => {
    soundManager.playClick();
    setIsExploreSelectOpen(true);
  };

  const handleConfirmExploreCharacter = (
    gender: 'female' | 'male',
    name: string
  ) => {
    const avatar =
      gender === 'female'
        ? '/assets/protagonist-avatar.jpg'
        : '/assets/protagonist-male.png';

    setHasCharacter(true);
    setCharacterGender(gender);
    setCharacterName(name);
    setCharacterAvatar(avatar);
    setIsExploreSelectOpen(false);
    setIsExploreMode(true);

    setActiveDialogue({
      target: 'protagonist',
      text: `Chào bạn! Mình là ${name}, cùng bạn dạo quanh khoảng sân hoàng hôn ấm áp nhé!`
    });
  };

  return (
    <div 
      onClick={() => setMobileSelectedZone(null)}
      className="relative w-screen h-screen overflow-hidden bg-[#251728] select-none flex flex-col justify-between font-sans"
    >
      
      {/* =========================================================================
          1. BACKGROUND PIXEL ART SCENERY & LIVING AMBIENCE
      ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/assets/hub-bg.jpg"
          alt="Sân tiệm may Nếp hoàng hôn"
          className="w-full h-full object-cover object-center pixel-art"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FB9A99]/15 via-transparent to-[#251728]/25 mix-blend-color-burn pointer-events-none" />

        {/* 1.1 Sparse, slowly drifting flower petals */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { left: '12%', duration: '18s', delay: '0s', size: '11px', opacity: 0.75 },
            { left: '28%', duration: '22s', delay: '4.5s', size: '9px', opacity: 0.65 },
            { left: '46%', duration: '19s', delay: '9s', size: '12px', opacity: 0.8 },
            { left: '68%', duration: '24s', delay: '2s', size: '10px', opacity: 0.7 },
            { left: '84%', duration: '20s', delay: '7s', size: '11px', opacity: 0.75 },
            { left: '38%', duration: '23s', delay: '12s', size: '8px', opacity: 0.6 },
            { left: '58%', duration: '17s', delay: '15s', size: '10px', opacity: 0.7 }
          ].map((petal, i) => (
            <div
              key={i}
              className="absolute top-0 petal-drift pointer-events-none select-none text-[#F38BA8]"
              style={{
                left: petal.left,
                animationDuration: petal.duration,
                animationDelay: petal.delay,
                fontSize: petal.size,
                opacity: petal.opacity
              }}
            >
              🌸
            </div>
          ))}
        </div>

        {/* 1.2 Soft lantern glows */}
        <div 
          className="absolute top-[23%] left-[4.8%] w-10 h-10 rounded-full bg-radial from-[#FFE082]/45 via-[#FFB74D]/20 to-transparent animate-lantern-glow pointer-events-none"
          style={{ animationDelay: '0s' }}
        />
        <div 
          className="absolute top-[25%] left-[15.5%] w-9 h-9 rounded-full bg-radial from-[#FFE082]/45 via-[#FFB74D]/20 to-transparent animate-lantern-glow pointer-events-none"
          style={{ animationDelay: '1.2s' }}
        />
        <div 
          className="absolute top-[21%] left-[34%] w-11 h-11 rounded-full bg-radial from-[#FFE082]/50 via-[#FF8A65]/25 to-transparent animate-lantern-glow pointer-events-none"
          style={{ animationDelay: '2.5s' }}
        />
        <div 
          className="absolute bottom-[27%] left-[27.8%] w-9 h-9 rounded-full bg-radial from-[#FFE082]/40 via-[#FFB74D]/15 to-transparent animate-lantern-glow pointer-events-none"
          style={{ animationDelay: '1.8s' }}
        />
        <div 
          className="absolute top-[35%] left-[42.5%] w-8 h-8 rounded-full bg-radial from-[#FFE082]/45 via-[#FFB74D]/15 to-transparent animate-lantern-glow pointer-events-none"
          style={{ animationDelay: '3.1s' }}
        />
        <div 
          className="absolute top-[21.5%] right-[25.5%] w-11 h-11 rounded-full bg-radial from-[#FFE082]/50 via-[#FF8A65]/25 to-transparent animate-lantern-glow pointer-events-none"
          style={{ animationDelay: '0.8s' }}
        />
        <div 
          className="absolute top-[23.5%] right-[34.5%] w-9 h-9 rounded-full bg-radial from-[#FFE082]/45 via-[#FFB74D]/20 to-transparent animate-lantern-glow pointer-events-none"
          style={{ animationDelay: '2.1s' }}
        />
        <div 
          className="absolute top-[39.5%] right-[34.8%] w-8 h-8 rounded-full bg-radial from-[#FFE082]/40 via-[#FFB74D]/15 to-transparent animate-lantern-glow pointer-events-none"
          style={{ animationDelay: '1.4s' }}
        />

        {/* 1.3 Periodic Sparkles */}
        <div 
          className="absolute top-[26.5%] left-[59.5%] text-lg text-[#FFF3B0] animate-periodic-sparkle pointer-events-none select-none z-10"
          style={{ animationDelay: '1.5s' }}
        >
          ✨
        </div>
        <div 
          className="absolute top-[52%] right-[13.5%] text-base text-[#FFF3B0] animate-periodic-sparkle pointer-events-none select-none z-10"
          style={{ animationDelay: '4.2s' }}
        >
          ✨
        </div>
      </div>

      {/* =========================================================================
          2. TOP HEADER HUD BAR
          - Avatar Circle renders exact characterAvatar
          - Sen Ngọc reflects real-time balance
      ========================================================================= */}
      <header className="relative z-30 w-full px-3 md:px-6 pt-3 md:pt-4 flex items-center justify-between pointer-events-auto">
        <div className="flex-1 flex justify-start">
          <LogoCluster onLogoClick={() => setActiveModal('museum')} />
        </div>

        <div className="hidden sm:flex flex-1 justify-center">
          <SloganBanner />
        </div>

        <div className="flex-1 flex justify-end">
          <TopHud
            senNgoc={senNgoc}
            isMuted={isMuted}
            avatarUrl={characterAvatar}
            onToggleMute={handleToggleMute}
            onOpenProfile={() => setIsExploreSelectOpen(true)}
            onOpenShop={() => setActiveModal('closet')}
          />
        </div>
      </header>

      {/* Mobile slogan banner */}
      <div className="sm:hidden relative z-20 flex justify-center mt-1 pointer-events-none">
        <SloganBanner />
      </div>

      {/* =========================================================================
          3. COURTYARD INTERACTIVE HOTSPOTS, HOVER ZONES & NAVIGATION SIGNBOARDS
      ========================================================================= */}
      <main className="relative z-20 flex-1 w-full max-w-7xl mx-auto px-4 pointer-events-none">
        
        {/* ZONE 1: PHÒNG PHỐI ĐỒ */}
        <div
          onMouseEnter={() => setHoveredZone('studio')}
          onMouseLeave={() => setHoveredZone(null)}
          onClick={(e) => {
            e.stopPropagation();
            handleZoneNavigation('studio');
          }}
          className="absolute top-[10%] left-[2%] w-[32%] h-[48%] pointer-events-auto cursor-pointer"
          title="Phòng phối đồ - Nhấp để vào"
        />
        <div className="absolute top-[12%] md:top-[16%] left-[6%] md:left-[14%] pointer-events-auto">
          <NavigationSignboard
            id="studio"
            label="Phòng phối đồ"
            icon="👗"
            rotation="-rotate-3"
            isHovered={hoveredZone === 'studio'}
            isSelectedMobile={mobileSelectedZone === 'studio'}
            onClick={() => handleZoneNavigation('studio')}
            onHoverStart={() => setHoveredZone('studio')}
            onHoverEnd={() => setHoveredZone(null)}
          />
        </div>

        {/* ZONE 2: CỐT TRUYỆN */}
        <div
          onMouseEnter={() => setHoveredZone('journey')}
          onMouseLeave={() => setHoveredZone(null)}
          onClick={(e) => {
            e.stopPropagation();
            handleZoneNavigation('journey');
          }}
          className="absolute top-[12%] left-[40%] w-[24%] h-[38%] pointer-events-auto cursor-pointer"
          title="Cốt truyện - Nhấp để vào"
        />
        <div className="absolute top-[12%] md:top-[16%] left-[45%] md:left-[47%] -translate-x-1/2 pointer-events-auto">
          <NavigationSignboard
            id="journey"
            label="Cốt truyện"
            icon="📖"
            rotation="rotate-0"
            isHovered={hoveredZone === 'journey'}
            isSelectedMobile={mobileSelectedZone === 'journey'}
            onClick={() => handleZoneNavigation('journey')}
            onHoverStart={() => setHoveredZone('journey')}
            onHoverEnd={() => setHoveredZone(null)}
          />
        </div>

        {/* ZONE 3: BẢO TÀNG */}
        <div
          onMouseEnter={() => setHoveredZone('museum')}
          onMouseLeave={() => setHoveredZone(null)}
          onClick={(e) => {
            e.stopPropagation();
            handleZoneNavigation('museum');
          }}
          className="absolute top-[22%] left-[26%] w-[16%] h-[26%] pointer-events-auto cursor-pointer"
          title="Bảo tàng - Nhấp để vào"
        />
        <div className="absolute top-[24%] md:top-[28%] left-[28%] md:left-[35%] pointer-events-auto">
          <NavigationSignboard
            id="museum"
            label="Bảo tàng"
            icon="📜"
            rotation="-rotate-1"
            isHovered={hoveredZone === 'museum'}
            isSelectedMobile={mobileSelectedZone === 'museum'}
            onClick={() => handleZoneNavigation('museum')}
            onHoverStart={() => setHoveredZone('museum')}
            onHoverEnd={() => setHoveredZone(null)}
          />
        </div>

        {/* ZONE 4: TỦ ĐỒ */}
        <div
          onMouseEnter={() => setHoveredZone('closet')}
          onMouseLeave={() => setHoveredZone(null)}
          onClick={(e) => {
            e.stopPropagation();
            handleZoneNavigation('closet');
          }}
          className="absolute top-[10%] right-[2%] w-[30%] h-[48%] pointer-events-auto cursor-pointer"
          title="Tủ đồ - Nhấp để vào"
        />
        <div className="absolute top-[15%] md:top-[19%] right-[6%] md:right-[15%] pointer-events-auto">
          <NavigationSignboard
            id="closet"
            label="Tủ đồ"
            icon="🧥"
            rotation="rotate-3"
            isHovered={hoveredZone === 'closet'}
            isSelectedMobile={mobileSelectedZone === 'closet'}
            onClick={() => handleZoneNavigation('closet')}
            onHoverStart={() => setHoveredZone('closet')}
            onHoverEnd={() => setHoveredZone(null)}
          />
        </div>

        {/* Left Girl in Pink Áo Dài */}
        <div className="absolute top-[32%] md:top-[35%] left-[17%] md:left-[22%] pointer-events-auto cursor-pointer group">
          <div 
            onClick={handleTailorGirlClick}
            className="animate-sway-slow transition-transform duration-300 group-hover:scale-105"
            style={{ animationDelay: '0s' }}
          >
            <div 
              className="absolute -top-7 -right-3 bg-[#FFF9F2] px-2 py-1 border-2 border-[#5C223D] rounded-full shadow-md text-xs animate-bubble z-20 cursor-pointer"
              style={{ animationDelay: '0.5s' }}
              title="Nhấp để trò chuyện cùng cô bé tiệm may"
            >
              👗
            </div>
            <div className="w-12 h-24 md:w-16 md:h-28 opacity-0 group-hover:opacity-10 bg-white/20 rounded-full transition-opacity" />
          </div>

          {activeDialogue?.target === 'tailor' && (
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-[#FDE5C8] p-2 border-2 border-[#5C223D] shadow-lg text-xs font-bold text-[#5C223D] z-30 animate-in fade-in zoom-in-90">
              <span className="text-[10px] text-[#A53556] block mb-0.5">Cô Bé Tiệm May:</span>
              {activeDialogue.text}
            </div>
          )}
        </div>

        {/* Bottom Left Lotus Pond Girl */}
        <div className="absolute bottom-[19%] md:bottom-[21%] left-[8%] md:left-[13.5%] pointer-events-auto cursor-pointer group">
          <div 
            onClick={handleLotusGirlClick}
            className="animate-sway-slow transition-transform duration-300 group-hover:scale-105"
            style={{ animationDelay: '3.2s' }}
          >
            <div 
              className="absolute -top-8 left-11 bg-[#FFF9F2] px-2 py-1 border-2 border-[#5C223D] rounded-full shadow-md text-xs animate-bubble z-20 cursor-pointer"
              style={{ animationDelay: '1.8s' }}
              title="Nhấp để trò chuyện cùng thiếu nữ bên hồ sen"
            >
              🌸
            </div>
            <div className="w-12 h-20 md:w-16 md:h-24 opacity-0 group-hover:opacity-10 bg-white/20 rounded-full transition-opacity" />
          </div>

          {activeDialogue?.target === 'lotusGirl' && (
            <div className="absolute bottom-full mb-2 left-0 w-48 bg-[#FDE5C8] p-2 border-2 border-[#5C223D] shadow-lg text-xs font-bold text-[#5C223D] z-30 animate-in fade-in zoom-in-90">
              <span className="text-[10px] text-[#2D6A5D] block mb-0.5">Thiếu Nữ Bên Hồ:</span>
              {activeDialogue.text}
            </div>
          )}
        </div>

        {/* Right Stone Steps: Sleeping vs Awake Calico Cat Nép */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            handleCatInteraction();
          }}
          className="absolute bottom-[27%] md:bottom-[31%] right-[16%] md:right-[21%] pointer-events-auto cursor-pointer group"
          title={isCatAwake ? 'Mèo Nép đã thức dậy!' : 'Mèo Nép đang ngủ - Chạm để đánh thức!'}
        >
          {isCatAwake ? (
            <div className="relative animate-in zoom-in-90 duration-200 flex flex-col items-center">
              <div className="w-12 h-14 md:w-14 md:h-16 overflow-hidden">
                <img
                  src="/assets/cat-nep-awake.png"
                  alt="Mèo Nép thức dậy"
                  className="w-full h-full object-contain pixel-art filter drop-shadow-md"
                />
              </div>

              {catDialogue && (
                <div className="absolute bottom-full mb-2 right-0 w-52 bg-[#FFFDF5] p-2.5 border-2 border-[#5C223D] shadow-2xl text-xs font-bold text-[#5C223D] z-40 animate-in fade-in zoom-in-95">
                  <div className="flex items-center gap-1 text-[10px] text-[#E09B5A] mb-0.5">
                    <span>🐱</span>
                    <span>Mèo Nép:</span>
                  </div>
                  <p className="leading-snug">{catDialogue}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="relative animate-breathe" style={{ animationDelay: '2.1s' }}>
              <div className="absolute -top-5 left-2 flex items-center gap-1 text-[11px] font-bold text-[#FDE5C8] animate-pulse">
                <span>z</span>
                <span className="text-xs">Z</span>
                <span className="text-sm">z</span>
                <span className="text-[11px] text-[#FFF3B0]">✨</span>
              </div>
              <div className="w-14 h-10 md:w-16 md:h-12 opacity-0 group-hover:opacity-15 bg-amber-300/30 rounded-full transition-opacity" />
            </div>
          )}
        </div>

        {/* Center Ground: Protagonist Standing on the Lotus Medallion */}
        <div 
          onClick={handleProtagonistClick}
          className="absolute top-[37%] md:top-[39%] left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer flex flex-col items-center group z-10"
          title={`Nhân vật của bạn (${characterName}) - Nhấp để tương tác`}
        >
          <div className="animate-breathe flex flex-col items-center">
            {characterGender === 'male' ? (
              <div className="w-16 h-36 md:w-20 md:h-44 overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/protagonist-male.png"
                  alt={characterName}
                  className="w-full h-full object-contain pixel-art filter drop-shadow-md"
                />
              </div>
            ) : (
              <div className="w-16 h-36 md:w-20 md:h-44 opacity-0 group-hover:opacity-15 bg-[#FFF3B0]/20 rounded-full transition-opacity" />
            )}
          </div>

          {activeDialogue?.target === 'protagonist' && (
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-56 bg-[#FDE5C8] p-2.5 border-2 border-[#5C223D] shadow-xl text-xs font-bold text-[#5C223D] z-30 animate-in fade-in zoom-in-90 text-center">
              <span className="text-[10px] text-[#E75788] block mb-0.5">✨ {characterName}:</span>
              {activeDialogue.text}
            </div>
          )}
        </div>

      </main>

      {/* =========================================================================
          4. BOTTOM DOCK & HUD CARDS
      ========================================================================= */}
      <footer className="relative z-30 w-full px-3 md:px-6 pb-3 md:pb-4 pointer-events-auto">
        <div className="max-w-7xl mx-auto flex items-end justify-between gap-4">
          
          <div className="hidden lg:block w-36 md:w-40 flex-shrink-0" />

          {/* Center Card: Adapts when user already has a character */}
          <div className={`flex-1 transition-all duration-300 ${isExploreMode ? 'opacity-30 hover:opacity-100 scale-95 translate-y-3' : 'opacity-100'}`}>
            <BottomActionCard
              hasCharacter={hasCharacter}
              characterName={characterName}
              currentGarment={currentGarment}
              avatarUrl={characterAvatar}
              onStartStory={handlePhotoActionClick}
              onGoToStudio={() => setActiveModal('studio')}
              onExploreCourtyard={handleExploreActionClick}
              isExploreMode={isExploreMode}
            />
          </div>

          {/* Right Card: Current In-Progress Chapter & Reward */}
          <div className={`hidden sm:block flex-shrink-0 transition-all duration-300 ${isExploreMode ? 'opacity-30 hover:opacity-100 scale-95 translate-y-3' : 'opacity-100'}`}>
            <ChapterCard
              onOpenChapter={() => setActiveModal('journey')}
              chapterNumber={currentChapter.tag}
              chapterTitle={currentChapter.title}
              rewardAmount={currentChapter.reward}
            />
          </div>

        </div>
      </footer>

      {/* =========================================================================
          5. FUNCTIONAL MODALS & DIALOGS
      ========================================================================= */}
      
      {/* 5.1 Privacy Disclaimer Dialog for Photo Character Creation */}
      <PhotoConsentDialog
        isOpen={isPhotoConsentOpen}
        onAgree={handlePhotoConsentAgree}
        onCancel={() => setIsPhotoConsentOpen(false)}
      />

      {/* 5.2 Explore Mode Character Selection Dialog */}
      <ExploreCharacterSelectDialog
        isOpen={isExploreSelectOpen}
        initialGender={characterGender}
        initialName={characterName}
        onConfirm={handleConfirmExploreCharacter}
        onClose={() => setIsExploreSelectOpen(false)}
      />

      {/* 5.3 Four Main Zone Modals */}
      <StudioModal
        isOpen={activeModal === 'studio'}
        onClose={() => setActiveModal(null)}
        onOutfitChange={(name) => {
          setCurrentGarment(name);
          setActiveDialogue({
            target: 'protagonist',
            text: `Bạn đã thay trang phục: "${name}" thật thanh lịch!`
          });
        }}
      />

      <JourneyModal
        isOpen={activeModal === 'journey'}
        activeChapterId={currentChapter.id}
        onClose={() => setActiveModal(null)}
        onClaimReward={(amount) => {
          setSenNgoc((prev) => prev + amount);
        }}
        onSelectChapter={(chapter) => {
          setCurrentChapter({
            id: chapter.id,
            tag: chapter.tag,
            title: chapter.title,
            reward: chapter.reward
          });
        }}
      />

      <MuseumModal
        isOpen={activeModal === 'museum'}
        onClose={() => setActiveModal(null)}
      />

      <ClosetModal
        isOpen={activeModal === 'closet'}
        onClose={() => setActiveModal(null)}
        senNgoc={senNgoc}
        onUpdateSenNgoc={(newAmount) => setSenNgoc(newAmount)}
      />

      <CharacterCreatorModal
        isOpen={activeModal === 'creator'}
        onClose={() => setActiveModal(null)}
        onSaveAvatar={(url, name) => {
          setHasCharacter(true);
          setCharacterName(name);
          if (url) {
            setCharacterAvatar(url);
          }
          setActiveDialogue({
            target: 'protagonist',
            text: `Chào mừng ${name}! Diện mạo mới của bạn đã sẵn sàng tại Tiệm May Nếp.`
          });
        }}
      />

    </div>
  );
}
