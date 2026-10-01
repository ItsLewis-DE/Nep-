# Giao Diện Kệ Sách Bảo Tàng (assets/screens/museum)

Thư mục này chứa đặc tả hình ảnh kệ sách gỗ cổ điển, gáy các cuốn sổ tay văn hóa qua năm thời kỳ lịch sử, khung thẻ đọc tư liệu và con dấu trích dẫn chính sử cho phân khu Bảo tàng (`museum`).

Màn hình áp dụng hai bố cục: **Bố cục ngang 8:5 là bố cục chính** (800×500 px, hiển thị 1600×1000 px) và **Bố cục dọc 2:3 là bố cục phụ** (320×480 px cho di động). Giữ kích thước riêng của Museum; nhãn 9:16 trước đây không khớp với kích thước này.

## Danh sách tệp

| Tên tệp | Loại asset | Kích thước chuẩn | Trạng thái | Quy cách & Đặc tả kỹ thuật | Tài liệu tham chiếu |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `bookshelf-view--landscape.png` | `screen-background-landscape` | 800 × 500 px | 🟨 nháp AI — QA kỹ thuật đạt | Nền bảo tàng kệ sách ngang; kệ 12 sổ bên trái, khoảng trống cho thẻ đọc bên phải; không người, không chữ | `docs/03-features/museum.md` |
| `bookshelf-view--portrait.png` | `screen-background-portrait` | 320 × 480 px | 🟨 nháp AI — QA kỹ thuật đạt | Kệ 12 sổ bố cục dọc, vùng phía trên dành cho HUD/dải lọc; không người, không chữ | `docs/03-features/museum.md` |
| `card-modal--9slice.png` | `ui-frame-9slice` | 64 × 64 px | 🟨 nháp AI — QA kỹ thuật đạt | Viền gỗ lim, mép giấy dó và sen ở góc; góc/cạnh 16px, tâm trong suốt; nền giấy và nội dung do UI dựng | `docs/03-features/museum.md` |
| `museum-filter-bar--3slice.png` | `ui-bar-3slice` | 120 × 40 px | 🟨 nháp AI — QA kỹ thuật đạt | Dải lọc nền giấy dó, hai đầu nụ sen 14px; thân lặp ngang; nhãn thời kỳ do UI dựng | `docs/03-features/museum.md` |
| `citation-seal.png` | `item-icon` | 32 × 32 px | 🟨 nháp AI — QA kỹ thuật đạt | Dấu son vuông với biểu tượng sen không chữ; ký hiệu UI trang trí, không sao chép ấn lịch sử | `docs/04-culture/bibliography.md` |

## Bộ hình đã tạo và cách sử dụng

Bộ hình được tạo ngày 01/10/2026 bằng công cụ `image_gen` tích hợp, tham chiếu phong cách của nền Studio. Nét Việt thể hiện qua khung nhà và kệ gỗ lim, mành tre, nền gạch đất nung, tường vôi, sổ đóng chỉ bọc lụa, giấy dó, gốm men lam và hoa sen. Ánh sáng ấm, bảng màu cổ kính giữ sự liên tục với các phân khu đã có.

- PNG chuẩn hóa nằm ngay trong thư mục này; ảnh gốc nằm trong [`_raw/`](./_raw/).
- Toàn bộ prompt và các quyết định xử lý đặc tả nằm trong [`_raw/generation.json`](./_raw/generation.json). Công cụ tích hợp được dùng theo bộ Main-shop/Studio hiện có, khác quy trình Google AI Studio trong tài liệu toàn cục.
- [`Ảnh xem trước`](./_raw/preview.png) hiển thị hai nền, khung đọc kéo giãn, thanh lọc kéo dài và dấu son phóng lớn. Phần nền kem trong khung đọc ở ảnh xem trước là lớp minh họa do UI dựng, không nằm trong PNG khung.
- [`asset-manifest.json`](./asset-manifest.json) ghi nguồn ảnh, kích thước, số màu RGBA, alpha, vùng slice và SHA-256. Nền dùng tối đa 32 màu; khung/thanh tối đa 16 màu kể cả trong suốt; dấu son tối đa 12 màu. Màu được ánh xạ vào palette dự án trong `assets/README.md`.
- Khi hiển thị, dùng nearest-neighbor / `image-rendering: pixelated`, giữ góc và hai đầu ở kích thước nguyên. Các dải giữa đã được làm liền mạch để lặp; tâm khung đọc trong suốt.
- 12 cuốn sổ trong nền là hình trang trí. Hitbox, tên thẻ, thời kỳ, trạng thái mở khóa/đã đọc, nội dung tư liệu, trích dẫn và nút hành động cần được UI dựng riêng. Dấu sen không thay thế việc kiểm chứng nguồn tài liệu.
- Giữ hai ngoại lệ kích thước của đặc tả Museum: nền dọc và dấu trích dẫn. Đặc tả toàn cục hiện ghi kích thước khác cho các loại tương ứng.

Chạy kiểm tra lại từ thư mục gốc dự án:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File assets/screens/museum/_raw/prepare.ps1 -VerifyOnly
```

Bỏ `-VerifyOnly` để chuẩn hóa lại từ ảnh gốc. Nếu PNG đích đã có, cần truyền `-Overwrite` rõ ràng. Script kiểm tra đủ nguồn và tránh ghi đè mặc định.

Bộ hình đã qua QA kỹ thuật và xem xét trực quan bằng AI. Trạng thái vẫn là **nháp AI**: chưa có sửa pixel thủ công và duyệt văn hóa bởi người. Chưa tích hợp vào ứng dụng; `src/App.tsx` hiện trả về `null` trên nhánh asset.

---

## Bố Cục Giao Diện

### Bố cục ngang (Bố cục chính)
- **Cảnh nền:** Nền `bookshelf-view--landscape.png` trải rộng 800×500 px thể hiện không gian thư phòng khảo cứu cổ điển trang nhã, tường vôi trắng, kệ gỗ tối màu và ánh sáng tự nhiên dịu nhẹ.
- **Nửa bên trái (khoảng 360–380 px):** Kệ sách gỗ cổ kính trưng bày 12 cuốn sổ tay văn hóa.
  - Phía trên kệ sách: Dải chọn mốc thời gian `museum-filter-bar--3slice.png` (Tất cả, 1888, 1934, 1962, 1982, 2026).
  - Các cuốn sổ tay gáy da/vải lụa đặt ngay ngắn trên các ngăn kệ, có huy hiệu trạng thái (Đã đọc / Mới mở khóa).
- **Nửa bên phải (khoảng 400–420 px):** Khung thẻ đọc tư liệu `card-modal--9slice.png` mở sẵn hoặc hiển thị chi tiết cuốn sổ tay đang chọn:
  - Tiêu đề tên cổ phục và niên đại.
  - Ảnh minh họa hiện vật phục chế (128×128 px).
  - Nội dung phân tích văn hóa và bối cảnh lịch sử xác thực.
  - Con dấu triện son `citation-seal.png` đính kèm trích dẫn sách tham khảo chính sử.
  - Nút hành động "Đã hiểu (+15 Sen Ngọc)" ở góc dưới.

### Bố cục dọc (Bố cục phụ)
- **Kệ sách chính:** Toàn màn hình hiển thị kệ sách gỗ cổ điển `bookshelf-view--portrait.png` theo trục dọc.
- **Dải lọc:** Thanh `museum-filter-bar--3slice.png` ghim cố định ngay dưới thanh HUD trên cùng.
- **Thẻ đọc tư liệu:** Khi chạm vào cuốn sổ tay, thẻ đọc tư liệu `card-modal--9slice.png` mở lên thành lớp phủ (modal/bottom sheet) chiếm 95% diện tích màn hình, cuộn dọc toàn bộ nội dung và trích dẫn nguồn.

---

## Mô Tả Chủ Thể Tạo Ảnh Nền Ngang (Prompt Technical Spec)

- **Mô tả chủ thể (EN) cho `bookshelf-view--landscape.png`:**
  ```text
  pixel art, 800x500 pixel grid, every pixel a crisp square block, limited palette, hard edges, no anti-aliasing, dithering, wide interior view of a traditional Vietnamese archival study and heritage museum. Left half features a grand antique dark timber bookshelf with neatly partitioned compartments for vintage notebooks, scrolls, and ceramic scholarly ornaments. Right half features an open wooden scholar reading desk with soft ambient lantern light and warm sunbeams, leaving a large open area for the reading card UI panels. Muted heritage tones, aged wood grain texture, tranquil intellectual atmosphere. Pure environmental background without any characters, human figures, or baked text.
  ```

Nội dung 12 thẻ văn hóa bảo tàng xem tại `docs/04-culture/culture-cards.md`.  
Thư mục tài liệu tham khảo chính sử xem tại `docs/04-culture/bibliography.md`.
