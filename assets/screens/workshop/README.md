# Giao Diện Xưởng May Số Hóa (assets/screens/workshop)

Thư mục này chứa đặc tả hình ảnh giao diện bàn máy may số hóa, khung thả ảnh chụp áo thật ngoài đời, hiệu ứng quét bóc tách nếp áo và popup đối chiếu cổ phục trong phân khu Xưởng may (`workshop`).

Màn hình áp dụng hai bố cục: **Bố cục ngang 8:5 là bố cục chính** (800×500 px, hiển thị 1600×1000 px) và **Bố cục dọc 9:16 là bố cục phụ** (320×480 px cho di động).

## Danh sách tệp cần bổ sung

| Tên tệp | Loại asset | Kích thước chuẩn | Trạng thái | Quy cách & Đặc tả kỹ thuật | Tài liệu tham chiếu |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `sewing-machine--landscape.png` | `screen-background-landscape` | 800 × 500 px | Chưa có | Nền xưởng may số hóa ngang toàn cảnh; gen ở 16:9, crop bố cục 8:5 về 800 × 500 px; không người, không chữ | `docs/03-features/closet-and-workshop.md` |
| `sewing-machine--portrait.png` | `screen-background-portrait` | 320 × 480 px | Chưa có | Nền bàn máy may dọc (bố cục phụ); giữ tỷ lệ dọc phù hợp di động; không người, không chữ | `docs/03-features/closet-and-workshop.md` |
| `differentiation-popup--9slice.png` | `ui-frame-9slice` | 64 × 64 px | Chưa có | Khung cửa sổ đối chiếu phân biệt với sườn xám / hanbok; 9-slice: góc 16px, cạnh 16px; dùng chung hai hướng | `docs/04-culture/differentiation-guide.md` |
| `upload-zone-frame--9slice.png` | `ui-frame-9slice` | 48 × 48 px | Chưa có | Khung vùng kéo thả ảnh chụp áo thật; 9-slice: góc 12px, cạnh 12px; dùng chung hai hướng | `docs/03-features/closet-and-workshop.md` |
| `workshop-progress-bar--3slice.png` | `ui-bar-3slice` | 120 × 32 px | Chưa có | Thanh tiến độ quét phân tích AI; 3-slice: 2 đầu bo góc 12px, thân co giãn ngang; dùng chung hai hướng | `docs/03-features/closet-and-workshop.md` |
| `analysis-scan-ui.png` | `vfx` | 240 × 240 px | Chưa có | Hiệu ứng lưới tia quét laser và hạt ánh sáng bóc tách chi tiết áo; dùng chung hai hướng | `docs/03-features/closet-and-workshop.md` |

---

## Bố Cục Giao Diện

### Bố cục ngang (Bố cục chính)
- **Cảnh nền:** Nền `sewing-machine--landscape.png` trải rộng 800×500 px tái hiện bàn máy may gang cổ điển thời kỳ công nghiệp kết hợp các thiết bị quang học số hóa hiện đại.
- **Nửa bên trái (khoảng 380 px):** Khung thả ảnh và cơ chế quét.
  - Vùng kéo thả hoặc tải ảnh chụp áo thật bọc trong khung `upload-zone-frame--9slice.png`.
  - Khi tải ảnh lên, hiệu ứng quét `analysis-scan-ui.png` chạy dọc bề mặt ảnh cùng thanh tiến độ `workshop-progress-bar--3slice.png`.
- **Nửa bên phải (khoảng 400 px):** Bảng kết quả phân tích AI và công cụ văn hóa:
  - Thông tin nhận diện: Tên dáng áo (Áo ngũ thân, Áo dài Lemur, Áo tấc...), thời kỳ lịch sử, độ tương đồng đặc trưng.
  - Phân tích chi tiết: Cổ áo, hàng khuy cài, cấu trúc xẻ tà, chất liệu vải.
  - Nút **"Phân biệt với sườn xám / hanbok"**: Mở cửa sổ popup `differentiation-popup--9slice.png` giải thích cặn kẽ 4 điểm khác biệt cốt lõi (nhận ngay +20 Sen Ngọc khi đọc xong).
  - Nút chính dưới cùng: **"May áo vào Tủ đồ (+50 Sen Ngọc)"**.

### Bố cục dọc (Bố cục phụ)
- **Nửa trên (khoảng 45% chiều cao):** Vùng thả ảnh chụp áo thật và chạy hoạt ảnh tia quét laser `analysis-scan-ui.png` trên nền `sewing-machine--portrait.png`.
- **Nửa dưới:** Thẻ hiển thị kết quả phân tích AI dạng bottom sheet cuộn dọc; nút phân biệt đối chiếu mở thành lớp phủ toàn màn hình.

---

## Mô Tả Chủ Thể Tạo Ảnh Nền Ngang (Prompt Technical Spec)

- **Mô tả chủ thể (EN) cho `sewing-machine--landscape.png`:**
  ```text
  pixel art, 800x500 pixel grid, every pixel a crisp square block, limited palette, hard edges, no anti-aliasing, dithering, panoramic workshop interior blending traditional Vietnamese tailoring craft with modern digital atelier aesthetics. Left side features a wide polished wooden workbench with an antique cast-iron sewing machine and cutting mat, leaving a clear open area for the image upload dropzone. Right side features digital drafting monitors, blueprint scrolls, and neatly labeled fabric drawers, leaving ample open space for AI analysis result panels. Warm amber ambient workshop light with subtle cyan digital accents. Pure environmental background without any characters, human figures, or baked text.
  ```

Prompt hệ thống và schema bóc tách ảnh áo ngoài đời xem tại `docs/03-features/closet-and-workshop.md` (tài liệu `docs/08-prompts-and-schemas/vision-extraction.md`: chưa có tài liệu).  
Hướng dẫn đối chiếu sườn xám và hanbok xem tại `docs/04-culture/differentiation-guide.md`.