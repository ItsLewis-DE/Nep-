# Giao Diện Sảnh Tiệm May (assets/screens/main-shop)

Thư mục này chứa đặc tả hình ảnh nền sân nhà sảnh tiệm may cổ kính lúc hoàng hôn, thanh điều hướng HUD và các thành phần giao diện cho phân khu Sảnh chính (Hub).

Màn hình áp dụng hai bố cục: **Bố cục ngang 8:5 là bố cục chính** (800×500 px, hiển thị 1600×1000 px) và **Bố cục dọc 9:16 là bố cục phụ** (320×480 px cho di động).

## Danh sách tệp cần bổ sung

| Tên tệp | Loại asset | Kích thước chuẩn | Trạng thái | Quy cách & Đặc tả kỹ thuật | Tài liệu tham chiếu |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `background--landscape.png` | `screen-background-landscape` | 800 × 500 px | 🟨 Đã gen, QA kỹ thuật | Nền sảnh sân nhà toàn cảnh ngang; gen ở 16:9, crop bố cục 8:5 về 800 × 500 px; không người, không chữ | `docs/03-features/hub.md` |
| `background--portrait.png` | `screen-background-portrait` | 320 × 480 px | 🟨 Đã gen, QA kỹ thuật | Nền sảnh sân nhà dọc (bố cục phụ); giữ nguyên kích thước dọc hiện có; không người, không chữ | `docs/03-features/hub.md` |
| `ui-hud--3slice.png` | `ui-bar-3slice` | 120 × 40 px | 🟨 Đã gen, QA kỹ thuật | Thanh điều hướng trên đỉnh; 3-slice: 2 đầu bo góc pixel 16px, thân lặp co giãn; dùng chung hai hướng | `docs/03-features/hub.md` |
| `action-card-frame--9slice.png` | `ui-frame-9slice` | 64 × 64 px | 🟨 Đã gen, QA kỹ thuật | Khung thẻ hành động nổi "Bắt đầu câu chuyện"; 9-slice: góc 12px, cạnh 12px; dùng chung hai hướng | `docs/03-features/onboarding.md` |
| `door-entrance-glow.png` | `vfx` | 64 × 96 px | 🟨 Đã gen, QA kỹ thuật | Hiệu ứng vầng sáng hào quang tại vòm cổng/lối vào; dùng chung hai hướng | `docs/03-features/hub.md` |

---

## Bố Cục Giao Diện

### Bố cục ngang (Bố cục chính)
- **Cảnh nền:** Ảnh `background--landscape.png` phủ kín không gian 800×500 px, thể hiện toàn cảnh sân nhà gạch đỏ cổ truyền lúc hoàng hôn vàng ấm:
  - Bên trái: Dãy nhà ngói cổ dẫn vào **"Phòng phối đồ"** (`studio`).
  - Bên phải: Dãy nhà ngói cổ đối xứng dẫn vào **"Tủ đồ"** (`closet`).
  - Ở giữa phía sau: Cổng vòm gạch rêu phong dẫn vào **"Cốt truyện"** (`journey`) kèm hiệu ứng vầng sáng `door-entrance-glow.png`.
  - Bên trái cổng vòm sát tường vôi trắng: Kệ sách gỗ dẫn vào **"Bảo tàng"** (`museum`).
  - Góc sân: Bậc thềm gạch cạnh ao sen là nơi chú mèo Nếp nằm sưởi nắng.
- **Thanh HUD:** Thanh `ui-hud--3slice.png` ghim cố định mép trên cùng (cách mép 8px, rộng 760–784 px, cao 40 px), hiển thị logo tiệm bên trái, số dư Sen Ngọc và nút Cài đặt bên phải.
- **Thẻ hành động:** Khung thẻ `action-card-frame--9slice.png` hiển thị nổi ở góc dưới bên trái hoặc trung tâm sân gạch với hai nút: "Tạo nhân vật từ ảnh" và "Dạo quanh sân nhà".

### Bố cục dọc (Bố cục phụ)
- **Thanh HUD:** Thanh `ui-hud--3slice.png` ghim cố định mép trên màn hình điện thoại (rộng 100%, cao 40 px).
- **Cảnh nền:** Nền `background--portrait.png` hiển thị ở khu vực trung tâm theo trục dọc; 4 điểm chạm vào 4 khu vực được xếp so le hoặc dạng danh sách biển gỗ nổi bật.
- **Thẻ hành động:** Hiển thị ở góc đáy màn hình dưới dạng ngăn kéo vuốt mở (bottom sheet), phủ nhẹ phần chân cảnh sân gạch đỏ.

---

## Mô Tả Chủ Thể Tạo Ảnh Nền Ngang (Prompt Technical Spec)

- **Mô tả chủ thể (EN) cho `background--landscape.png`:**
  ```text
  pixel art, 800x500 pixel grid, every pixel a crisp square block, limited palette, hard edges, no anti-aliasing, dithering, wide panoramic view of an ancient Northern Vietnamese courtyard at golden dusk, red terracotta tiled yard with a circular floral center pattern, tranquil lotus pond on the left flank, traditional tiled roof workshops on left and right flanks, grand mossy arched brick gateway in center background, rustic white plaster wall with wooden bookshelf niche beside the gate. Soft sunset golden hour glow, warm amber lantern illumination. Upper area clear for top HUD bar, lower central area clear for floating action card. Pure environmental background without any characters, human figures, or baked text.
  ```

Prompt bối cảnh chi tiết tham khảo tại `docs/07-game/prologue/setup.md` (phân cảnh `c0-s1-tiem-may-chieu`) và `docs/03-features/hub.md`.

---

## Kết quả tạo ảnh

Đã tạo đủ năm PNG bằng công cụ `image_gen` tích hợp. Hai nền giữ sân nhà hoàng hôn, ao sen bên trái, hai gian nhà, cổng vòm và kệ sách bên trái cổng; không có nhân vật hay chữ. Nội dung HUD, nhãn điều hướng, mèo Nếp và thẻ hành động được giao diện phủ riêng lên cảnh.

- Ảnh gốc và phiên bản chỉnh bố cục nằm trong [`_raw/`](./_raw/).
- Toàn bộ prompt, nguồn tài liệu và quyết định xử lý điểm chưa thống nhất được lưu trong [`_raw/generation.json`](./_raw/generation.json).
- [Ảnh xem trước](./_raw/preview.png) gồm hai nền, thanh HUD kéo dài, thẻ 9-slice kéo giãn và hiệu ứng cổng đặt trên nền cảnh.
- [`asset-manifest.json`](./asset-manifest.json) ghi kích thước, bảng màu, kênh alpha và vùng cắt của từng ảnh.

Ảnh được chuẩn hóa bằng lấy mẫu nearest-neighbor, giới hạn palette, giữ alpha của hiệu ứng và làm phẳng các dải lặp của khung. Kiểm tra kỹ thuật đã đạt: đúng kích thước, đúng giới hạn màu, alpha hợp lệ, tâm khung sạch và các cạnh lặp liền mạch. Có thể chạy lại kiểm tra bằng `powershell -NoProfile -ExecutionPolicy Bypass -File assets/screens/main-shop/_raw/qa.ps1` từ thư mục gốc dự án.

Nền dọc dùng kích thước trong đặc tả riêng của thư mục này; tài liệu toàn cục hiện ghi kích thước khác. Tỷ lệ thực tế của nền dọc này là 2:3. Công cụ tạo ảnh dùng ở lượt này khác quy trình Google AI Studio trong tài liệu toàn cục. Các tệp vẫn ở trạng thái nháp AI đã qua QA kỹ thuật, chưa được xác nhận sửa tay bởi họa sĩ hoặc tích hợp vào ứng dụng.
