# Tài Nguyên Màn Hình Giao Diện Ứng Dụng (assets/screens)

Thư mục này chứa đặc tả hình ảnh nền khung nhìn và các thành phần giao diện HUD, khung modal 9-slice, thanh 3-slice cho năm phân khu chức năng chính trong ứng dụng **Tiệm May Nếp**: Sảnh chính (`main-shop`), Phòng phối đồ (`studio`), Bảo tàng (`museum`), Tủ đồ (`wardrobe`), và Xưởng may (`workshop`).

Mọi màn hình tuân thủ nguyên tắc thiết kế thích ứng hai hướng: **Khung ngang 8:5 là bố cục chính** (lưới logic 800×500, hiển thị integer-scaling ×2 = 1600×1000) và **Khung dọc 9:16 là bố cục phụ** (270×480 px dành cho thiết bị di động).

## Danh sách tệp cần bổ sung

| Tên tệp | Loại asset | Kích thước chuẩn | Trạng thái | Quy cách & Đặc tả kỹ thuật | Tài liệu tham chiếu |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `common-hud-bar--3slice.png` | `ui-bar-3slice` | 120 × 40 px | Chưa có | Thanh HUD trên đỉnh màn hình; 3-slice: 2 đầu cố định 16px mỗi bên, thân giữa co giãn ngang; dùng chung cả hai hướng ngang và dọc | `docs/03-features/hub.md` |
| `modal-frame-wood--9slice.png` | `ui-frame-9slice` | 64 × 64 px | Chưa có | Khung cửa sổ modal viền gỗ cắt bậc retro; 9-slice: 4 góc cố định 16×16 px, 4 cạnh biên 16px co giãn/lặp, tâm trong suốt/nền kem; dùng chung cả hai hướng ngang và dọc (ruột hiển thị do UI dựng) | `docs/06-design/design-system.md` |

---

## Nguyên Tắc Bố Cục Chung Cho Màn Hình

### Bố cục ngang (Bố cục chính)
- **Tỷ lệ hiển thị:** Khung chuẩn 8:5 (lưới logic 800×500 px, hiển thị nguyên lần 1600×1000 px).
- **Thanh HUD:** Thanh `common-hud-bar--3slice.png` ghim sát mép trên cùng màn hình (rộng 760–800 px, cao 40 px), chứa logo Tiệm May Nếp góc trái, số dư Sen Ngọc và nút Cài đặt/Âm thanh góc phải.
- **Không gian chức năng:** Trải dài theo chiều ngang màn hình, thường chia làm 2 khối chính (nửa trái là sân khấu nhân vật/kệ trưng bày/khung tương tác, nửa phải là bảng điều khiển danh mục tab hoặc khu vực thao tác).
- **Cửa sổ bật lên (Modal / Popup):** Sử dụng khung viền `modal-frame-wood--9slice.png` căn giữa màn hình (kích thước linh hoạt từ 480×360 px đến 640×420 px), chia 2 cột nội dung để tận dụng độ rộng của màn hình ngang.

### Bố cục dọc (Bố cục phụ)
- **Tỷ lệ hiển thị:** Khung dọc chuẩn di động 9:16 (270×480 px).
- **Thanh HUD:** Thanh `common-hud-bar--3slice.png` ghim sát mép trên màn hình, tự động co hẹp bề ngang theo chiều rộng thiết bị, thu gọn khoảng cách icon.
- **Không gian chức năng:** Xếp tuần tự theo trục dọc từ trên xuống dưới; nửa trên dành cho nhân vật hoặc bối cảnh chính, nửa dưới chuyển thành bảng thẻ vuốt mở dạng ngăn kéo đáy (bottom sheet) để tối ưu công thái học một tay.
- **Cửa sổ bật lên (Modal / Popup):** Khung `modal-frame-wood--9slice.png` co giãn thành hộp thoại dạng thẻ nổi hoặc mở toàn màn hình (bottom sheet chiếm 90–95% bề ngang), nội dung xếp dọc 1 cột.

---

Tài liệu đặc tả chi tiết giao diện và luồng màn hình xem tại `docs/03-features/` và `docs/06-design/user-flows.md`.