// src/data/catalog.ts
// Single source of truth for garments, accessories, events, and culture cards

export interface GarmentItem {
  id: string;
  name: string;
  silhouette: 'tu_than' | 'ngu_than_tay_chen' | 'ngu_than_tay_thung' | 'tan_thoi';
  historical_period: 'thoi_le' | 'thoi_nguyen' | 'nam_1934' | 'hien_dai';
  default_color_palette: [string, string, string, string]; // [Highlight, Base, Shadow, Outline]
  supported_events: Array<'tet' | 'dam_cuoi' | 'be_giang' | 'le_chua' | 'vieng_tang' | 'dao_pho'>;
  cultural_summary: string;
  sprite_base_path: string;
}

export interface AccessoryItem {
  id: string;
  name: string;
  category: 'headwear' | 'footwear' | 'handheld' | 'jewelry';
  sen_ngoc_price: number;
  cultural_note: string;
  gender_compatibility: 'male' | 'female' | 'unisex';
}

export interface EventContext {
  id: 'tet' | 'dam_cuoi' | 'be_giang' | 'le_chua' | 'vieng_tang' | 'dao_pho';
  title: string;
  recommended_silhouettes: Array<'tu_than' | 'ngu_than_tay_chen' | 'ngu_than_tay_thung' | 'tan_thoi'>;
  prohibited_color_tones: string[];
  weather_presets: string[];
}

export interface CultureCardItem {
  id: string;
  title: string;
  time_period: string;
  historical_fact: string;
}

export const GARMENTS_CATALOG: GarmentItem[] = [
  {
    id: 'tu-than-nau-song',
    name: 'Áo tứ thân nâu sồng',
    silhouette: 'tu_than',
    historical_period: 'thoi_nguyen',
    default_color_palette: ['#C4A482', '#8B5A2B', '#5C3A21', '#2C1608'],
    supported_events: ['dao_pho', 'le_chua'],
    cultural_summary: 'Áo tứ thân truyền thống chất liệu vải thô nhuộm củ nâu bền chắc, gắn liền với hình ảnh người phụ nữ lao động Bắc Bộ.',
    sprite_base_path: 'public/assets/items/garments/tu-than-nau-song.png'
  },
  {
    id: 'tu-than-hoi-he',
    name: 'Áo tứ thân trẩy hội',
    silhouette: 'tu_than',
    historical_period: 'thoi_nguyen',
    default_color_palette: ['#FAD02C', '#E03B8B', '#9B1D56', '#4A0E2E'],
    supported_events: ['tet', 'dao_pho'],
    cultural_summary: 'Áo tứ thân mớ ba mớ bảy nhiều lớp rực rỡ kết hợp yếm thắm dùng trong các dịp hội làng và du xuân.',
    sprite_base_path: 'public/assets/items/garments/tu-than-hoi-he.png'
  },
  {
    id: 'ngu-than-tay-chen-nam',
    name: 'Áo ngũ thân tay chẽn nam',
    silhouette: 'ngu_than_tay_chen',
    historical_period: 'thoi_nguyen',
    default_color_palette: ['#4A6B82', '#1E3D59', '#112233', '#081018'],
    supported_events: ['tet', 'dam_cuoi', 'be_giang', 'dao_pho'],
    cultural_summary: 'Áo ngũ thân nam tay chẽn phom đứng đĩnh đạc, năm thân áo tượng trưng cho tứ thân phụ mẫu và bản thân.',
    sprite_base_path: 'public/assets/items/garments/ngu-than-tay-chen-nam.png'
  },
  {
    id: 'ngu-than-tay-chen-nu',
    name: 'Áo ngũ thân tay chẽn nữ',
    silhouette: 'ngu_than_tay_chen',
    historical_period: 'thoi_nguyen',
    default_color_palette: ['#E6A1B0', '#C25975', '#802D45', '#3A0D1B'],
    supported_events: ['tet', 'dam_cuoi', 'be_giang', 'dao_pho', 'le_chua'],
    cultural_summary: 'Áo ngũ thân nữ tay chẽn kín đáo, đường may giấu chỉ tinh tế và vạt cong duyên dáng.',
    sprite_base_path: 'public/assets/items/garments/ngu-than-tay-chen-nu.png'
  },
  {
    id: 'ngu-than-tay-thung-le',
    name: 'Áo tấc tay thụng đại lễ',
    silhouette: 'ngu_than_tay_thung',
    historical_period: 'thoi_nguyen',
    default_color_palette: ['#E8C547', '#C49B18', '#7D620A', '#382B02'],
    supported_events: ['dam_cuoi', 'le_chua', 'tet'],
    cultural_summary: 'Áo tấc thụng rộng uy nghiêm, chuyên dùng cho các nghi lễ gia tộc trang trọng, lễ cưới và tế tự đình miếu.',
    sprite_base_path: 'public/assets/items/garments/ngu-than-tay-thung-le.png'
  },
  {
    id: 'ao-dai-lemur-hoa-dao',
    name: 'Áo dài Lemur 1934',
    silhouette: 'tan_thoi',
    historical_period: 'nam_1934',
    default_color_palette: ['#FFCCD5', '#FB6F92', '#C9365F', '#5E0E27'],
    supported_events: ['dao_pho'],
    cultural_summary: 'Thiết kế cách tân nổi tiếng của họa sĩ Cát Tường đăng báo Phong Hóa năm 1934, nổi bật với cổ lá sen và vai bồng.',
    sprite_base_path: 'public/assets/items/garments/tan-thoi-lemur.png'
  },
  {
    id: 'ao-dai-tan-thoi-vang-mo-ga',
    name: 'Áo dài tân thời cổ đứng',
    silhouette: 'tan_thoi',
    historical_period: 'nam_1934',
    default_color_palette: ['#FFF3B0', '#E9D8A6', '#9B8342', '#3D3315'],
    supported_events: ['be_giang', 'dao_pho', 'dam_cuoi'],
    cultural_summary: 'Áo dài tân thời cổ đứng không vai bồng giai đoạn sau Lemur cuối thập niên 1930, tiền thân của áo dài hiện đại.',
    sprite_base_path: 'public/assets/studio/ao-dai-tan-thoi-vang-mo-ga.png'
  }
];

export const ACCESSORIES_CATALOG: AccessoryItem[] = [
  {
    id: 'khan-van-den',
    name: 'Khăn vấn nhung đen',
    category: 'headwear',
    sen_ngoc_price: 0,
    cultural_note: 'Khăn vấn đen đội trùm quanh trán, giữ nếp tóc gọn gàng chuẩn mực phụ nữ truyền thống.',
    gender_compatibility: 'female'
  },
  {
    id: 'khan-dong-vang',
    name: 'Khăn đóng gấm vàng',
    category: 'headwear',
    sen_ngoc_price: 25,
    cultural_note: 'Khăn đóng nhiều nếp đều đặn, đội thẳng thớm trang nghiêm trong các dịp lễ tết.',
    gender_compatibility: 'unisex'
  },
  {
    id: 'non-quai-thao',
    name: 'Nón ba tầm quai thao',
    category: 'headwear',
    sen_ngoc_price: 30,
    cultural_note: 'Nón tròn rộng vành dệt lá cọ trắng bóng, quai thao bằng tơ tằm buông rủ ngang ngực.',
    gender_compatibility: 'female'
  },
  {
    id: 'guoc-moc-quai-nhung',
    name: 'Guốc mộc quai nhung',
    category: 'footwear',
    sen_ngoc_price: 0,
    cultural_note: 'Guốc mộc tiện bằng gỗ mỡ nhẹ, gót thanh thoát tạo âm thanh lốc cốc vui tai.',
    gender_compatibility: 'unisex'
  },
  {
    id: 'quat-giay-tram',
    name: 'Quạt giấy trầm nan tre',
    category: 'handheld',
    sen_ngoc_price: 15,
    cultural_note: 'Quạt giấy nan tre hương trầm nhã nhặn, vật tùy thân thanh lịch khi du xuân.',
    gender_compatibility: 'unisex'
  },
  {
    id: 'chuoi-ngoc-trai',
    name: 'Chuỗi hạt ngọc trai',
    category: 'jewelry',
    sen_ngoc_price: 40,
    cultural_note: 'Chuỗi vòng ngọc trai đeo cổ tạo vẻ kiêu sa, đoan trang cho áo dài tân thời.',
    gender_compatibility: 'female'
  }
];

export const EVENTS_CATALOG: EventContext[] = [
  {
    id: 'tet',
    title: 'Chúc Tết Đầu Xuân',
    recommended_silhouettes: ['ngu_than_tay_chen', 'ngu_than_tay_thung', 'tan_thoi', 'tu_than'],
    prohibited_color_tones: ['#000000', '#FFFFFF'],
    weather_presets: ['Mưa xuân se lạnh', 'Nắng ấm đầu năm']
  },
  {
    id: 'dam_cuoi',
    title: 'Hôn Lễ Trang Trọng',
    recommended_silhouettes: ['ngu_than_tay_thung', 'ngu_than_tay_chen', 'tan_thoi'],
    prohibited_color_tones: ['#000000', '#555555'],
    weather_presets: ['Nắng thu rực rỡ']
  },
  {
    id: 'be_giang',
    title: 'Lễ Bế Giảng Trường Học',
    recommended_silhouettes: ['tan_thoi', 'ngu_than_tay_chen'],
    prohibited_color_tones: ['#D62828', '#800000'],
    weather_presets: ['Nắng hè chói chang']
  },
  {
    id: 'le_chua',
    title: 'Đi Lễ Chùa Thanh Tịnh',
    recommended_silhouettes: ['tu_than', 'ngu_than_tay_chen', 'ngu_than_tay_thung'],
    prohibited_color_tones: ['#FF0055', '#E63946'],
    weather_presets: ['Khói hương trầm mặc']
  },
  {
    id: 'vieng_tang',
    title: 'Viếng Tang Trang Nghiêm',
    recommended_silhouettes: ['ngu_than_tay_thung', 'ngu_than_tay_chen'],
    prohibited_color_tones: ['#D62828', '#FFB703', '#FB6F92'],
    weather_presets: ['U trầm se lạnh']
  },
  {
    id: 'dao_pho',
    title: 'Dạo Phố Cuối Tuần',
    recommended_silhouettes: ['tu_than', 'ngu_than_tay_chen', 'tan_thoi'],
    prohibited_color_tones: [],
    weather_presets: ['Gió mát chiều thu']
  }
];
