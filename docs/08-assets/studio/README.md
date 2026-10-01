# Danh Mục Tài Nguyên Phòng Phối Đồ Studio (`docs/08-assets/studio/`)

Thư mục này quản lý toàn bộ các sprite trang phục áo dài và phụ kiện cổ truyền phục vụ phân khu Phòng phối đồ Studio và Tủ đồ Tiệm May Nếp.

Toàn bộ sprite trang phục và phụ kiện tại đây được vẽ trên **khung cơ thể chuẩn 64 × 96 pixel**, xếp lớp theo đúng phân tầng kiến trúc (`layer-3` đến `layer-7`) và được lưu dưới dạng **thang độ xám 4 sắc độ (4-tone Grayscale)** để áp dụng kỹ thuật **Palette Swapping** đổi màu vải tức thì.

## 1. Bốn sắc độ xám quy chuẩn
- **Highlight (Vùng sáng):** `#E0E0E0`
- **Base (Thân vải):** `#9E9E9E`
- **Shadow (Bóng nếp gấp):** `#616161`
- **Outline (Đường viền):** `#212121`

## 2. Danh sách trang phục Áo dài (10 món)

| Mã ID | Tên trang phục | Lớp vẽ trên khung 64×96 | Thời kỳ lịch sử |
| :--- | :--- | :--- | :--- |
| `ao-tu-than` | Áo tứ thân mớ ba mớ bảy | `layer-4-garment-back` & `layer-5-garment-front` | Cổ - Trung đại |
| `ao-ngu-than-tay-chen` | Áo ngũ thân tay chẽn | `layer-4-garment-back` & `layer-5-garment-front` | Triều Nguyễn (1744 - 1837) |
| `ao-ngu-than-tay-thung` | Áo tấc (ngũ thân tay thụng) | `layer-4-garment-back` & `layer-5-garment-front` | Triều Nguyễn |
| `ao-dai-lemur` | Áo dài tân thời Lemur | `layer-4-garment-back` & `layer-5-garment-front` | Năm 1934 |
| `ao-dai-tan-thoi-vang-mo-ga` | Áo tân thời cổ đứng không vai bồng | `layer-4-garment-back` & `layer-5-garment-front` | Cuối thập niên 1930 |
| `ao-dai-raglan` | Áo dài tay raglan | `layer-4-garment-back` & `layer-5-garment-front` | Năm 1962 (Sài Gòn) |
| `ao-dai-co-thuyen` | Áo dài cổ thuyền Décolleté | `layer-4-garment-back` & `layer-5-garment-front` | Thập niên 1960 |
| `ao-dai-cuoi-phin` | Áo dài cưới vải phin thêu | `layer-4-garment-back` & `layer-5-garment-front` | Năm 1982 (Bao cấp) |
| `ao-dai-popolin` | Áo dài hoa cúc dại pô-pơ-lin | `layer-4-garment-back` & `layer-5-garment-front` | Đầu thập niên 1980 |
| `ao-ngu-than-remix-2026` | Áo ngũ thân Remix 2026 | `layer-4-garment-back` & `layer-5-garment-front` | Năm 2026 (Đương đại) |

## 3. Danh sách Phụ kiện truyền thống (10 món)

| Mã ID | Tên phụ kiện | Phân loại & Lớp vẽ |
| :--- | :--- | :--- |
| `khan-van-den` | Khăn vấn nhung đen | Đội đầu (`layer-6-head`) |
| `khan-van-hoang-yen` | Khăn vành dây hoàng yến | Đội đầu (`layer-6-head`) |
| `khan-mo-qua` | Khăn mỏ quạ | Đội đầu (`layer-6-head`) |
| `non-quai-thao` | Nón ba tầm quai thao | Cầm tay / Đội đầu (`layer-7-accessories`) |
| `non-la` | Nón lá bài thơ chóp nhọn | Cầm tay / Đội đầu (`layer-7-accessories`) |
| `guoc-moc` | Guốc mộc quai nhung | Giày guốc (`layer-7-accessories`) |
| `hai-theu` | Hài thêu mũi phụng | Giày guốc (`layer-7-accessories`) |
| `kinh-mat-meo` | Kính mát mắt mèo 1960s | Mặt nhân vật (`layer-6-head`) |
| `kieng-bac` | Kiềng bạc chạm hoa cúc | Trang sức cổ (`layer-7-accessories`) |
| `quat-lua` | Quạt lụa cầm tay tua rua | Cầm tay (`layer-7-accessories`) |
