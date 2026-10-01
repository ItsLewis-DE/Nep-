# Giao Diện Bàn May Studio (assets/screens/studio)

Thư mục này chứa hình ảnh nền phòng phối đồ Studio cổ phong, khung điều khiển phối đồ, thanh màu truyền thống, dải chọn sự kiện và khung cửa sổ Lookbook AI.

Màn hình áp dụng hai bố cục: **Bố cục ngang 8:5 là bố cục chính** (800×500 px, hiển thị 1600×1000 px) và **Bố cục dọc 2:3 là bố cục phụ** (320×480 px cho di động). Giữ kích thước dọc riêng của Studio; nhãn 9:16 trước đây không khớp với 320×480.

## Danh sách tệp

| Tên tệp | Loại asset | Kích thước chuẩn | Trạng thái | Quy cách & Đặc tả kỹ thuật | Tài liệu tham chiếu |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `workbench-ui--landscape.png` | `screen-background-landscape` | 800 × 500 px | 🟨 nháp AI — QA kỹ thuật đạt | Nền phòng phối đồ ngang; chuẩn hóa crop 8:5 về 800 × 500 px; chừa trống bục đứng trái và bảng phải; không người, không chữ | `docs/03-features/studio.md` |
| `workbench-ui--portrait.png` | `screen-background-portrait` | 320 × 480 px | 🟨 nháp AI — QA kỹ thuật đạt | Nền phòng phối đồ dọc; bục đứng trong vùng trên, chừa phần dưới cho bottom sheet; không người, không chữ | `docs/03-features/studio.md` |
| `lookbook-modal--9slice.png` | `ui-frame-9slice` | 64 × 64 px | 🟨 nháp AI — QA kỹ thuật đạt | Khung gỗ chạm hoa sen cho Lookbook 4 ảnh AI; góc/cạnh 16px; tâm trong suốt; ruột ảnh và tiến độ do UI dựng | `docs/03-features/studio.md` |
| `studio-panel-frame--9slice.png` | `ui-frame-9slice` | 48 × 48 px | 🟨 nháp AI — QA kỹ thuật đạt | Khung bảng điều khiển, nụ sen và nét dệt lụa; góc/cạnh 10px; tâm trong suốt | `docs/03-features/studio.md` |
| `color-palette-bar--3slice.png` | `ui-bar-3slice` | 120 × 48 px | 🟨 nháp AI — QA kỹ thuật đạt | Thanh chọn màu, hai đầu chạm sen và cuộn chỉ; đầu cố định 16px, thân nền kem lặp ngang; mẫu màu do UI dựng | `docs/03-features/studio.md` |
| `event-selector-strip--3slice.png` | `ui-bar-3slice` | 120 × 40 px | 🟨 nháp AI — QA kỹ thuật đạt | Dải chọn sự kiện, hai đầu nụ sen trên nền chàm; đầu cố định 14px, thân nền kem lặp ngang; nhãn sự kiện do UI dựng | `docs/03-features/studio.md` |

## Bộ hình đã tạo và cách sử dụng

Bộ hình được tạo ngày 01/10/2026 bằng công cụ `image_gen` tích hợp. Nét Việt thể hiện qua khung nhà gỗ lim, mành tre, nền gạch đất nung, gốm men lam, hoa sen, kệ lụa màu chàm/đỏ điều/hoàng yến và dụng cụ may bằng gỗ, đồng. Hoa văn tập trung ở góc khung và hai đầu thanh để không méo khi co giãn. Không vẽ người, chữ hoặc nút điều khiển vào ảnh nền.

- PNG chuẩn hóa nằm ngay trong thư mục này. Ảnh gốc và các lần chỉnh bố cục nằm trong `_raw/`; prompt đầy đủ ở `_raw/generation.json` và `portrait-layout-edit*.json`. Nền dọc dùng bản `workbench-ui--portrait-v3.png` để bục đứng nằm gọn trong vùng trên khoảng 45% chiều cao.
- Xem toàn bộ bộ hình cùng khung được kéo giãn trong `_raw/preview.png`.
- Thông số tích hợp, slice, số màu và SHA-256 nằm trong `asset-manifest.json`.
- Nền giới hạn 32 màu; khung/thanh tối đa 16 màu RGBA, alpha chỉ 0 hoặc 255. Các cạnh lặp đã được làm phẳng, tâm hai khung để trong suốt.
- Khi render, dùng nearest-neighbor / `image-rendering: pixelated` và giữ góc/hai đầu nguyên kích thước. Màu mẫu, chữ, tab, ảnh Lookbook và thanh tiến độ được vẽ bằng UI phía trên.
- Bộ hình đã qua kiểm tra kỹ thuật và xem xét trực quan bằng AI. Trạng thái vẫn là **nháp AI**: chưa sửa pixel thủ công, chưa có duyệt văn hóa bởi người và chưa tích hợp vào app (`src/App.tsx` hiện trả về `null`).

Chạy lại kiểm tra và dựng ảnh xem trước từ thư mục gốc dự án:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File assets/screens/studio/_raw/prepare.ps1 -VerifyOnly
```

Để chuẩn hóa lại từ ảnh gốc, bỏ `-VerifyOnly`; nếu PNG đích đã tồn tại, cần truyền `-Overwrite` rõ ràng. Script kiểm tra đủ nguồn trước khi ghi.

---

## Bố Cục Giao Diện

### Bố cục ngang (Bố cục chính)
- **Cảnh nền:** Nền `workbench-ui--landscape.png` trải rộng 800×500 px thể hiện không gian xưởng may ấm cúng với kệ cuộn vải lụa, giá treo thước gỗ và ánh sáng tự nhiên từ cửa sổ bên.
- **Nửa bên trái (khoảng 380 px):** Sân khấu bục đứng của nhân vật Paperdoll (ma-nơ-canh thử đồ).
  - Nhân vật đứng chính giữa bục gỗ tròn, dưới chân có bóng đổ mềm.
  - Vòng hào quang bụi sao lấp lánh xuất hiện khi thay trang phục hoặc phụ kiện.
  - Phía dưới bục có nút xoay góc nhìn hoặc lật mặt vải áo (khi bật tính năng).
- **Nửa bên phải (khoảng 400 px):** Bảng điều khiển tab được bao bọc bởi khung `studio-panel-frame--9slice.png`:
  - Hàng trên cùng: Dải chọn sự kiện `event-selector-strip--3slice.png` giúp định hướng phong cách phối đồ.
  - Thanh tab điều hướng danh mục: "Dáng áo", "Màu sắc", "Phụ kiện", "Họa tiết".
  - Khu vực danh mục: Lưới các ô biểu tượng áo hoặc phụ kiện (icon 48×48 px).
  - Khi chọn tab màu: Hiển thị thanh màu truyền thống `color-palette-bar--3slice.png` với các nút mẫu màu (củ nâu, chàm, điều, hoàng yến...).
  - Dưới cùng của bảng: Cụm nút hành động chính gồm **"Lưu bộ phối"**, **"Tạo Lookbook AI"** và **"Mặc thử ngay"**.
- **Cửa sổ Lookbook AI:** Khi bấm tạo Lookbook, khung modal `lookbook-modal--9slice.png` mở nổi căn giữa màn hình (kích thước khoảng 560×420 px), hiển thị lưới 4 ảnh AI chân thực (chính diện, nghiêng, sau lưng, cận cảnh) kèm thanh tiến độ 45 giây.

### Bố cục dọc (Bố cục phụ)
- **Nửa trên (chiếm khoảng 45% chiều cao):** Bục đứng nhân vật ma-nơ-canh Paperdoll căn giữa khung nhìn trên nền `workbench-ui--portrait.png`.
- **Nửa dưới:** Bảng điều khiển tab hiển thị dưới dạng ngăn kéo vuốt mở (bottom sheet), chứa dải sự kiện `event-selector-strip--3slice.png`, lưới chọn trang phục và thanh màu `color-palette-bar--3slice.png`.
- **Cụm nút chính:** "Lưu bộ phối" và "Tạo Lookbook" ghim cố định ở đáy màn hình điện thoại.
- **Cửa sổ Lookbook:** Mở phủ toàn màn hình (full-screen modal/bottom sheet), 4 ảnh xếp lưới 2×2 cuộn dọc.

---

## Mô Tả Chủ Thể Tạo Ảnh Nền Ngang (Prompt Technical Spec)

- **Mô tả chủ thể (EN) cho `workbench-ui--landscape.png`:**
  ```text
  pixel art, 800x500 pixel grid, every pixel a crisp square block, limited palette, hard edges, no anti-aliasing, dithering, spacious traditional Vietnamese tailor atelier and styling studio interior at warm morning light. Left half features an elegant raised circular wooden styling podium with delicate silk scroll accents, leaving central podium space clear for character paperdoll mannequin display. Right half features an organized atelier workspace with polished dark wooden textures and fabric bolts neatly arranged on side shelves, leaving a large open area for the UI tab panel. Soft ambient dust motes in sunbeams, subtle vintage tailoring tools hanging on wall. Pure environmental background without any characters, human figures, or baked text.
  ```

Quy chuẩn bảng màu truyền thống và thước đo hài hòa xem tại `docs/04-culture/color-and-etiquette.md`.  
Prompt tạo ảnh Lookbook chân thực và quy chuẩn 4 góc nhìn tham khảo tại `docs/01-overview/decisions.md` (mục 17) và `docs/03-features/studio.md` (tài liệu `docs/08-prompts-and-schemas/lookbook-generation.md`: chưa có tài liệu).
