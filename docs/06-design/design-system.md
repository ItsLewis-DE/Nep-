# Hệ Thống Thiết Kế Tiệm May Nếp (Design System)

Tài liệu này xác lập toàn bộ quy chuẩn về bảng màu giao diện, bảng màu truyền thống cho vải áo, kiểu chữ, tỷ lệ đồ họa pixel art, cấu trúc khung pixel 3 lớp và quy tắc thẩm mỹ trong cơ chế Lật vải (Fabric Flip).

## 1. Bảng màu giao diện (UI Color Palette)

Bảng màu giao diện được trích xuất và đo đạc chuẩn xác từ bản thiết kế mục tiêu (target mock-up) của sảnh chính sân nhà, mang âm hưởng hoàng hôn ấm áp, hoàng gia và quý phái:

| Token | Mã màu Hex | Tên gọi & Vai trò sử dụng |
| :--- | :--- | :--- |
| `cream-50` | `#FDEACE` | Nền thẻ sáng nhất, hiệu ứng sáng viền trong |
| `cream-100` | `#FDE5C8` | Nền bảng thẻ hành động, nền hộp thoại chính |
| `peach-300` | `#F3C098` | Viền ngoài sáng, viền phản quang của gỗ |
| `rose-400` | `#D37C74` | Viền trong của khung thẻ, đường kẻ phân cách phụ |
| `pink-500` | `#E75788` | Màu nút hành động chính (nút hồng sen), hoa sen điểm nhấn |
| `rose-600` | `#A53556` | Bóng nổi đổ dưới chân nút bấm chính (dày 4px) |
| `rose-700` | `#7B3248` | Màu chữ phụ, chú thích, phụ đề trên thẻ |
| `plum-700` | `#5C223D` | Màu chữ trên các biển gỗ điều hướng |
| `plum-800` | `#411D3A` | Viền ngoài đậm nhất của khung thẻ, khung viền logo |
| `plum-900` | `#251728` | Nền thanh HUD chỉ số, bóng tối sâu, thanh trạng thái |
| `ink-900` | `#1E1523` | Tiêu đề chính, văn bản có độ tương phản tối đa |
| `gold-500` | `#E09B5A` | Viền kim loại vàng đồng (lớp viền giữa của khung pixel) |
| `sky-300` | `#FB9A99` | Tông màu nền trời hoàng hôn rực rỡ |

## 2. Bảng màu truyền thống cho vải áo (Heritage Garment Palette)

> **Lưu ý đặc biệt:** Bảng màu này **chỉ dùng cho chất liệu vải, hoa văn và vạt áo trong Phòng phối đồ**, tuyệt đối không dùng làm màu cho các khung thẻ giao diện hệ thống.

Bảng màu này được chắt lọc từ các kỹ thuật nhuộm truyền thống trong lịch sử của người Kinh:
- **Màu Củ Nâu (Brown Bark):** `#6B4423`. Màu nhuộm từ củ nâu truyền thống vùng đồng bằng Bắc Bộ, bền màu, mộc mạc cho áo tứ thân, ngũ thân lao động.
- **Màu Chàm (Indigo):** `#1E2A38` / `#2D3E50`. Chiết xuất từ lá chàm ủ vôi, sắc xanh đen thẫm biểu trưng cho sự bền bỉ.
- **Màu Điều / Son (Vermilion Red):** `#B83A24`. Lấy từ cánh kiến đỏ, dùng cho áo lễ hội, hỷ sự và phục sức hoàng gia.
- **Màu Hoàng Yến (Ochre / Gold):** `#CFA449`. Sắc vàng tơ tằm óng ả, màu thổ hoàng ấm áp.
- **Màu Men Lam (Ceramic Blue):** `#2D6A5D`. Men gốm cổ truyền, dùng cho hoa văn ngọc bích và viền gấm.
- **Màu Giấy Dó (Dó Silk White):** `#F5EFEB`. Trắng ngà tự nhiên của sợi tơ thô và giấy dó cổ truyền.

## 3. Khung giao diện (UI Frames & Components)

Toàn bộ các bảng thông tin, thẻ hành động và hộp thoại tuân theo quy chuẩn khung pixel 3 lớp đặc trưng của Tiệm May Nếp:
- **Cấu trúc khung pixel 3 lớp:**
  - Lớp viền ngoài cùng: Độ dày 2px đến 4px bằng màu mận đậm `plum-800`.
  - Lớp viền ở giữa: Độ dày 2px bằng màu vàng đồng `gold-500` tạo cảm giác dát vàng óng ánh.
  - Lớp viền trong cùng: Độ dày 1px đến 2px bằng màu hồng ngọc `rose-400`.
  - Nền bên trong khung: Sử dụng màu kem đào `cream-100`.
- **Góc cắt bậc (Stepped Corner):** Các góc khung không dùng bo tròn tròn mượt của CSS hiện đại mà cắt bậc vuông pixel 4px theo phong cách retro pixel art.
- **Quy chuẩn nút bấm chính (Primary Button):**
  - Mặt nút: Màu hồng sen `pink-500`.
  - Bóng dưới chân nút (Bottom Shadow): Màu đỏ mận `rose-600` dày đúng 4px, tạo cảm giác bấm nổi cơ học dạng 3D pixel.
  - Chữ trên nút: Màu trắng tinh khôi hoặc kem sáng, in đậm sắc nét.

## 4. Quy chuẩn kiểu chữ (Typography)

Nhóm mình đặt ra nguyên tắc khắt khe về hiển thị chữ để bảo đảm tính thẩm mỹ, phong cách hoài niệm nhưng luôn sắc nét và đọc chuẩn tiếng Việt:

### 4.1. Phông chữ tiêu đề và Logo (Display & Title)
- **Phông chữ chỉ định:** Sử dụng phông `VT323` cho tiêu đề và logo nhận diện.
- **Phông dự phòng (Fallback):** Sử dụng `Departure Mono Viet`.
- **Điều kiện kiểm tra phông (Font Verification Gate):** Phông tiêu đề chỉ được kích hoạt sử dụng nếu hiển thị chính xác và tròn trịa chuỗi ký tự tiếng Việt mẫu:
  `"Tiệm May Nếp ẶẫỢữđ"`
- **Trường hợp không đạt chuẩn:** Nếu cả hai phông trên không hiển thị đủ dấu tiếng Việt chuẩn mực, hệ thống bắt buộc chuyển sang dùng phông `Be Vietnam Pro` (trọng số 800 - ExtraBold) để đảm bảo không bao giờ bị lỗi dấu thanh hay bể phông.

### 4.2. Phông chữ nội dung đọc (Body & UI Text)
- **Phông chữ bắt buộc:** Sử dụng `Be Vietnam Pro` cho toàn bộ văn bản nội dung, lời thoại nhân vật, thẻ bảo tàng và danh mục phụ kiện.
- **Nguyên tắc:** Cấm tuyệt đối dùng phông pixel cho các đoạn văn bản dài vì dễ gây mỏi mắt và vỡ dấu trên màn hình điện thoại có mật độ điểm ảnh cao. Cỡ chữ tối thiểu từ 14px, chiều cao dòng 1.5 - 1.6.

## 5. Kích thước Pixel gốc và tỷ lệ đồ họa

Toàn bộ tài nguyên đồ họa trong app tuân thủ nguyên tắc pixel art thật (Authentic Pixel Art), vẽ trên lưới độ phân giải gốc cố định, hiển thị sắc nét bằng kỹ thuật phóng to tỷ lệ nguyên lần (Integer Scaling), đồng nhất hoàn toàn giữa cảnh nền, nhân vật, chú mèo Nếp và các biểu tượng:

| Thành phần đồ họa | Kích thước lưới gốc (Native Width × Height) | Tỷ lệ khung hình | Mục đích & Quy cách hiển thị |
| :--- | :--- | :--- | :--- |
| **Nền Sảnh ngang (Desktop/Tablet)** | **480 × 270 pixel** | **16:9** | Pixel art thật, phóng nguyên lần vừa vặn màn hình ngang |
| **Nền Sảnh dọc (Mobile Portrait)** | **270 × 480 pixel** | **9:16** | Bố cục chuyên biệt: HUD ghim trên, bottom sheet thẻ ở dưới |
| **Khung cảnh Cốt truyện (Journey)** | 320 × 240 pixel | 4:3 | Khung hình màn chơi giải đố point-and-click |
| **Nhân vật người chơi (Protagonist)** | 64 × 96 pixel | Đứng thẳng | Nhân vật pixel art chuẩn, phóng nguyên lần 2x - 4x |
| **Mèo mướp Nếp (Assistant)** | 32 × 32 pixel | Nằm / Ngủ / Ngồi | Phóng nguyên lần đồng bộ với cảnh nền sảnh |
| **Biểu tượng Sen Ngọc & Phụ kiện** | 24 × 24 hoặc 32 × 32 pixel | Vuông 1:1 | Icon pixel ngọc sen hồng, thước gỗ, hoa cài |

## 6. Kỹ thuật phóng to không làm mờ ảnh (Pixel Crisp Rendering)

Khi phóng to trên trình duyệt, để tránh cơ chế làm mờ điểm ảnh (Bilinear Interpolation), áp dụng bắt buộc thuộc tính:

```css
.pixel-art {
  image-rendering: pixelated; /* Chuẩn Chrome, Edge, Safari hiện đại */
  image-rendering: -moz-crisp-edges; /* Firefox */
  image-rendering: crisp-edges;
}
```

Trong canvas dựng hình:
```javascript
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false; // Tắt khử răng cưa
```

## 7. Quy tắc mỹ thuật khi vẽ mặt trái của cảnh (Cơ chế Lật Vải)

Cơ chế "Lật vải" (Fabric Flip) là điểm nhấn nghệ thuật của game Cốt truyện (chiếc rương cũ):
- **Mặt phải (Thế giới thực):** Ánh hoàng hôn ấm áp của sân nhà, gỗ mộc, vải lụa rạng ngời.
- **Mặt trái (Ký ức ẩn giấu):** Chuyển sang tông màu dệt thô gồm xám tro củi tàn (`#4A4A4A`), chàm lạnh ngả xanh đen (`#1A2530`) và sợi đay ố vàng (`#8C826A`).
- **Đường chỉ ràng buộc (Tangle Threads):** Nối từ các góc định kiến, khi có manh mối sẽ phát sáng ánh chỉ tơ vàng (`#F2C94C`) hoặc đỏ son (`#EB5757`).
- **Nghệ thuật:** Đồ họa giữ phong thái trang nhã, giàu sức gợi của tranh khắc gỗ dân gian, không vẽ máu me hay gây hoảng sợ.
