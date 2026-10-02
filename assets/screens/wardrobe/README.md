# Giao Diện Tủ Đồ Và Cửa Hàng Phụ Kiện (assets/screens/wardrobe)

Thư mục này chứa đặc tả hình ảnh ngăn kéo tủ gỗ hiển thị danh mục trang phục đã mở khóa, bục thử đồ trực quan và cửa hàng mua sắm phụ kiện bằng Sen Ngọc trong phân khu Tủ đồ (`wardrobe`).

Màn hình áp dụng hai bố cục: **Bố cục ngang 8:5 là bố cục chính** (800×500 px, hiển thị 1600×1000 px) và **Bố cục dọc 9:16 là bố cục phụ** (320×480 px cho di động).

## Danh sách tệp cần bổ sung

| Tên tệp | Loại asset | Kích thước chuẩn | Trạng thái | Quy cách & Đặc tả kỹ thuật | Tài liệu tham chiếu |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `closet-shelf--landscape.png` | `screen-background-landscape` | 800 × 500 px | Chưa có | Nền phòng thay đồ tủ gỗ ngang toàn cảnh; gen ở 16:9, crop bố cục 8:5 về 800 × 500 px; không người, không chữ | `docs/03-features/closet-and-workshop.md` |
| `closet-shelf--portrait.png` | `screen-background-portrait` | 320 × 480 px | Chưa có | Nền tủ đồ ngăn kéo dọc (bố cục phụ); giữ nguyên kích thước dọc hiện có; không người, không chữ | `docs/03-features/closet-and-workshop.md` |
| `coin-shop--9slice.png` | `ui-frame-9slice` | 64 × 64 px | Chưa có | Khung cửa hàng mua phụ kiện bằng Sen Ngọc; 9-slice: góc 16px, cạnh 16px; dùng chung hai hướng (danh sách món và giá do UI dựng) | `docs/03-features/closet-and-workshop.md` |
| `wardrobe-panel--9slice.png` | `ui-frame-9slice` | 48 × 48 px | Chưa có | Khung bao bọc lưới ngăn kéo tủ đồ; 9-slice: góc 12px, cạnh 12px; dùng chung hai hướng | `docs/03-features/closet-and-workshop.md` |
| `wardrobe-tab-bar--3slice.png` | `ui-bar-3slice` | 120 × 40 px | Chưa có | Thanh chuyển tab danh mục; 3-slice: 2 đầu bo góc 14px, thân co giãn ngang; dùng chung hai hướng | `docs/03-features/closet-and-workshop.md` |
| `item-slot-frame.png` | `ui-icon` | 48 × 48 px | Chưa có | Khung ô vuông chứa biểu tượng áo/phụ kiện; dùng chung hai hướng | `docs/06-design/design-system.md` |

---

## Bố Cục Giao Diện

### Bố cục ngang (Bố cục chính)
- **Cảnh nền:** Nền `closet-shelf--landscape.png` trải rộng 800×500 px thể hiện không gian phòng phục trang bằng gỗ lim ấm áp, ánh đèn lồng dịu nhẹ và gương soi toàn thân.
- **Nửa bên trái (khoảng 350 px):** Bục đứng nhân vật mặc thử Paperdoll.
  - Hiển thị ngay diện mạo nhân vật khi người chơi bấm chọn bất kỳ áo dài hoặc phụ kiện nào trong tủ.
  - Phía dưới có nút **"Mặc bộ này ra sảnh"** và nút **"Chuyển sang Studio tạo dáng"**.
- **Nửa bên phải (khoảng 430 px):** Bảng tủ đồ bọc trong khung `wardrobe-panel--9slice.png`:
  - Hàng trên: Thanh chuyển tab `wardrobe-tab-bar--3slice.png` gồm "Áo dài đã có", "Bộ phối đã lưu", "Cửa hàng phụ kiện".
  - Khu vực trung tâm: Lưới các ô đồ dùng khung `item-slot-frame.png` (icon 48×48 px hoặc thumbnail áo 96×96 px).
  - Khi mở tab Cửa hàng: Khung `coin-shop--9slice.png` hiển thị danh sách phụ kiện truyền thống (khăn vấn, nón quai thao, kiềng bạc, guốc mộc) kèm giá mua bằng Sen Ngọc và số dư hiện có.

### Bố cục dọc (Bố cục phụ)
- **Nửa trên (khoảng 40% chiều cao):** Nhân vật đứng mặc thử trên nền tủ gỗ `closet-shelf--portrait.png`.
- **Nửa dưới:** Ngăn kéo tủ đồ dạng lưới 3 cột cuộn dọc, chứa các ô đồ đã mở khóa; thanh chuyển tab đặt ngang giữa hai nửa màn hình.
- **Cửa hàng phụ kiện:** Mở dưới dạng bottom sheet vuốt từ đáy màn hình lên, phủ nửa dưới giao diện.

---

## Mô Tả Chủ Thể Tạo Ảnh Nền Ngang (Prompt Technical Spec)

- **Mô tả chủ thể (EN) cho `closet-shelf--landscape.png`:**
  ```text
  pixel art, 800x500 pixel grid, every pixel a crisp square block, limited palette, hard edges, no anti-aliasing, dithering, panoramic interior of an elegant heritage Vietnamese dressing room and wardrobe chamber. Left area features a polished teakwood dressing space with a full-length wooden mirror frame and soft warm lantern glow, leaving central space clear for player mannequin. Right area features beautifully carved wooden cabinet shelves and textile drawers, leaving a broad open zone for inventory grid UI panels. Rich lacquer wood, silk fabric rolls on upper shelves. Pure environmental background without any characters, human figures, or baked text.
  ```

Đặc tả danh mục phân loại tủ đồ và giá Sen Ngọc phụ kiện xem tại `docs/03-features/closet-and-workshop.md` và `docs/05-tech/architecture.md`.