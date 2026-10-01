import type { GameContent } from '../../../content/index.ts';
import type { EventId } from '../../../content/schema.ts';

export interface OutfitFeedbackItem {
  type: 'info' | 'goi_y' | 'canh_bao';
  message: string;
  field?: string;
}

export interface OutfitEvaluationResult {
  score: number; // 0 to 100
  passed: boolean;
  feedback: OutfitFeedbackItem[];
}

export interface OutfitCandidate {
  garmentId: string;
  silhouette?: string;
  colorPalette?: [string, string, string, string];
  equippedAccessories?: {
    headwear?: string;
    footwear?: string;
    handheld?: string;
    jewelry?: string;
    [slot: string]: string | undefined;
  };
  motifId?: string;
}

export interface StylingContext {
  eventId?: EventId | string;
  historicalPeriod?: 'thoi_le' | 'thoi_nguyen' | 'nam_1934' | 'hien_dai';
  gender?: 'male' | 'female';
}

/**
 * Pure evaluation function for outfit styling.
 * Returns score 0-100 and feedback list (info | goi_y | canh_bao).
 * Never throws or blocks execution.
 */
export function evaluateOutfit(
  outfit: OutfitCandidate,
  context: StylingContext = {},
  content: GameContent
): OutfitEvaluationResult {
  const feedback: OutfitFeedbackItem[] = [];
  let score = 50; // Base score

  const garment = content.garmentsById.get(outfit.garmentId);

  // 1. Garment existence and cultural context
  if (!garment) {
    feedback.push({
      type: 'canh_bao',
      message: `Chưa chọn áo chính hoặc áo '${outfit.garmentId}' không tồn tại.`,
      field: 'garmentId'
    });
    return { score: 0, passed: false, feedback };
  }

  feedback.push({
    type: 'info',
    message: `${garment.name}: ${garment.culturalSummary}`
  });

  // 2. Event compatibility
  if (context.eventId) {
    const isSupported = garment.supportedEvents.includes(context.eventId as EventId);
    if (isSupported) {
      score += 25;
      feedback.push({
        type: 'info',
        message: `Phom dáng '${garment.name}' rất tôn nghiêm và phù hợp với dịp '${context.eventId}'.`,
        field: 'eventId'
      });
    } else {
      score -= 15;
      feedback.push({
        type: 'canh_bao',
        message: `'${garment.name}' theo phong tục truyền thống ít khi mặc trong dịp '${context.eventId}'.`,
        field: 'eventId'
      });
    }
  } else {
    score += 15;
  }

  // 3. Historical period match
  if (context.historicalPeriod) {
    if (garment.historicalPeriod === context.historicalPeriod) {
      score += 10;
      feedback.push({
        type: 'info',
        message: `Chính xác theo niên đại lịch sử ${context.historicalPeriod}.`
      });
    } else {
      score -= 5;
      feedback.push({
        type: 'goi_y',
        message: `Áo '${garment.name}' thuộc thời kỳ ${garment.historicalPeriod}, có sự giao thoa với bối cảnh ${context.historicalPeriod}.`
      });
    }
  }

  // 4. Accessories Harmony
  const accs = outfit.equippedAccessories ?? {};
  const hasHeadwear = Boolean(accs.headwear);
  const hasFootwear = Boolean(accs.footwear);

  if (hasHeadwear) {
    score += 8;
    const headDef = accs.headwear ? content.accessoriesById.get(accs.headwear) : undefined;
    if (headDef) {
      feedback.push({
        type: 'info',
        message: `Phụ kiện đầu '${headDef.name}': ${headDef.culturalNote}`
      });
    }
  } else {
    feedback.push({
      type: 'goi_y',
      message: 'Nên thêm khăn vấn hoặc nón đội đầu để trang phục thêm trang trọng và hoàn chỉnh.',
      field: 'headwear'
    });
  }

  if (hasFootwear) {
    score += 7;
  } else {
    feedback.push({
      type: 'goi_y',
      message: 'Thiếu hài thêu hoặc guốc mộc truyền thống dưới chân.',
      field: 'footwear'
    });
  }

  // Check gender compatibility of accessories
  if (context.gender) {
    for (const [slot, accId] of Object.entries(accs)) {
      if (accId) {
        const accDef = content.accessoriesById.get(accId);
        if (accDef && accDef.genderCompatibility !== 'unisex' && accDef.genderCompatibility !== context.gender) {
          feedback.push({
            type: 'goi_y',
            message: `Phụ kiện '${accDef.name}' truyền thống thường dành cho ${accDef.genderCompatibility === 'female' ? 'nữ giới' : 'nam giới'}.`,
            field: slot
          });
        }
      }
    }
  }

  // 5. Special Occasion Palette Warnings
  if (outfit.colorPalette && context.eventId) {
    const primaryHex = (outfit.colorPalette[1] || '').toUpperCase();
    if (context.eventId === 'vieng_tang') {
      // Warm bright colors warning for funerals
      if (primaryHex.includes('FF') || primaryHex.includes('F0') || primaryHex.includes('E6')) {
        score -= 20;
        feedback.push({
          type: 'canh_bao',
          message: 'Lễ viếng tang nên giữ sắc phục trầm buồn, giản dị; tránh gam màu quá rực rỡ.',
          field: 'colorPalette'
        });
      }
    } else if (context.eventId === 'tet' || context.eventId === 'dam_cuoi') {
      // Dark gloomy colors recommendation for weddings/tet
      if (primaryHex.startsWith('#0') || primaryHex.startsWith('#1') || primaryHex.startsWith('#2')) {
        score -= 10;
        feedback.push({
          type: 'goi_y',
          message: 'Dịp hỷ sự hoặc năm mới nên chọn sắc phục tươi tắn để nghênh đón cát lành.',
          field: 'colorPalette'
        });
      }
    }
  }

  // 6. Clamp final score between 0 and 100
  const finalScore = Math.max(0, Math.min(100, Math.round(score)));

  return {
    score: finalScore,
    passed: finalScore >= 60,
    feedback
  };
}
