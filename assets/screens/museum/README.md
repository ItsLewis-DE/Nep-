# Giao Diện Kệ Sách Bảo Tàng (assets/screens/museum)

Thư mục này chứa đặc tả hình ảnh kệ sách gỗ cổ điển, gáy các cuốn sổ tay văn hóa qua năm thời kỳ lịch sử, khung thẻ đọc tư liệu và con dấu trích dẫn chính sử cho phân khu Bảo tàng (`museum`).

Màn hình áp dụng hai bố cục: **Bố cục ngang 8:5 là bố cục chính** (800×500 px, hiển thị 1600×1000 px) và **Bố cục dọc 9:16 là bố cục phụ** (320×480 px cho di động).

## Danh sách tệp cần bổ sung

| Tên tệp | Loại asset | Kích thước chuẩn | Trạng thái | Quy cách & Đặc tả kỹ thuật | Tài liệu tham chiếu |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `bookshelf-view--landscape.png` | `screen-background-landscape` | 800 × 500 px | Chưa có | Nền bảo tàng kệ sách ngang toàn cảnh; gen ở 16:9, crop bố cục 8:5 về 800 × 500 px; không người, không chữ | `docs/03-features/museum.md` |
| `bookshelf-view--portrait.png` | `screen-background-portrait` | 320 × 480 px | Chưa có | Nền kệ sách bảo tàng dọc (bố cục phụ); giữ nguyên kích thước dọc hiện có; không người, không chữ | `docs/03-features/museum.md` |
| `card-modal--9slice.png` | `ui-frame-9slice` | 64 × 64 px | Chưa có | Khung thẻ đọc tư liệu văn hóa viền gỗ mộc giấy dó; 9-slice: góc 16px, cạnh 16px; dùng chung hai hướng (ruột nội dung do UI dựng) | `docs/03-features/museum.md` |
| `museum-filter-bar--3slice.png` | `ui-bar-3slice` | 120 × 40 px | Chưa có | Thanh dải lọc 5 mốc thời kỳ lịch sử; 3-slice: 2 đầu 14px, thân co giãn ngang; dùng chung hai hướng | `docs/03-features/museum.md` |
| `citation-seal.png` | `item-icon` | 32 × 32 px | Chưa có | Biểu tượng con dấu triện son xác thực nguồn trích dẫn lịch sử; dùng chung hai hướng | `docs/04-culture/bibliography.md` |

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