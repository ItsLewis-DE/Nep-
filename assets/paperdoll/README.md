# Hệ Thống Khung Búp Bê Giấy (paperdoll)

- **Loại:** paperdoll-layer
- **Dùng ở đâu:** Phòng phối đồ Studio, Luồng khởi tạo nhân vật tại Sảnh, Tủ đồ và hiển thị nhân vật trong toàn bộ giao diện
- **Mô tả:** Hệ thống các lớp đồ họa đế cho phép tùy biến nhân vật tự do: dáng cơ thể (nam và nữ), các độ dài và kiểu dáng tóc (tách lớp tóc trước và tóc sau để kẹp lớp trang phục và mũ nón ở giữa), khuôn mặt với các trạng thái biểu cảm cơ bản, lớp quần lụa dài và avatar mẫu mặc định.
- **Quy chuẩn hoán đổi màu:**
  - Tông màu da (da sáng, da ngà tự nhiên, da bánh mật) được hoán đổi trực tiếp thông qua bảng màu trên canvas, không vẽ thêm bản riêng.
  - Màu tóc (đen mun, nâu củ nâu, lam khói) được hoán đổi bằng bảng màu trên canvas, không vẽ thêm bản riêng.
  - Mọi tệp đồ họa lớp xuất đủ canvas chuẩn không xén bớt vùng trong suốt, bảo đảm các thành phần khi xếp chồng lên nhau tại gốc tọa độ sẽ khớp hoàn hảo từng điểm ảnh.
- **Mô tả chủ thể (EN):** Modular paperdoll character base system for traditional Vietnamese dress-up, including gender bases (male and female), separated front and back hair layers (short, shoulder-length, long, and masculine combed), facial expressions, foundational silk trousers, and default portrait avatars, ready for dynamic real-time palette swapping.
- **Ghi chú văn hóa:** Tỷ lệ cơ thể được tạo hình trang nhã, đoan chính theo thẩm mỹ truyền thống Á Đông, tôn vinh nét đẹp kín đáo của cổ phục Việt Nam.

## Danh sách tệp cần có

| Tên tệp | Loại | Mô tả bằng lời | Trạng thái |
| :--- | :--- | :--- | :---: |
| `layer-0-shadow.png` | paperdoll-layer | Lớp bóng chân nhân vật in trên mặt đất | ⬜ chưa gen |
| `body-female.png` | paperdoll-layer | Khối cơ thể nữ dáng đứng thẳng thanh thoát | ⬜ chưa gen |
| `body-male.png` | paperdoll-layer | Khối cơ thể nam dáng đứng đĩnh đạc, bờ vai ngang vững chãi | ⬜ chưa gen |
| `pants-female-white.png` | paperdoll-layer | Quần lụa dài hai ống màu giấy dó cho nữ, rủ chạm mu bàn chân | ⬜ chưa gen |
| `pants-female-black.png` | paperdoll-layer | Quần lụa dài hai ống màu đen mun truyền thống cho nữ | ⬜ chưa gen |
| `pants-male-white.png` | paperdoll-layer | Quần âu/quần lụa trắng ống đứng lịch thiệp cho nam | ⬜ chưa gen |
| `pants-male-black.png` | paperdoll-layer | Quần lụa đen ống đứng truyền thống cho nam | ⬜ chưa gen |
| `hair-short-female-front.png` | paperdoll-layer | Lớp tóc trước kiểu tóc ngắn nữ năng động, mái tỉa ngang trán | ⬜ chưa gen |
| `hair-short-female-back.png` | paperdoll-layer | Lớp tóc sau kiểu tóc ngắn nữ, ôm sát chân gáy | ⬜ chưa gen |
| `hair-shoulder-female-front.png` | paperdoll-layer | Lớp tóc trước kiểu tóc ngang vai nữ, lọn tóc mềm mại rủ hai bên má | ⬜ chưa gen |
| `hair-shoulder-female-back.png` | paperdoll-layer | Lớp tóc sau kiểu tóc ngang vai nữ, vểnh nhẹ chấm vai | ⬜ chưa gen |
| `hair-long-female-front.png` | paperdoll-layer | Lớp tóc trước kiểu tóc dài truyền thống nữ, rẽ ngôi giữa dịu dàng | ⬜ chưa gen |
| `hair-long-female-back.png` | paperdoll-layer | Lớp tóc sau kiểu tóc dài truyền thống nữ, suối tóc buông dài sau lưng | ⬜ chưa gen |
| `hair-male-front.png` | paperdoll-layer | Lớp tóc trước kiểu tóc nam rẽ ngôi lệch chải bồng thanh lịch | ⬜ chưa gen |
| `hair-male-back.png` | paperdoll-layer | Lớp tóc sau kiểu tóc nam cắt cao gọn gàng | ⬜ chưa gen |
| `face-neutral.png` | paperdoll-layer | Khuôn mặt với biểu cảm bình tĩnh, mắt nhìn tự nhiên | ⬜ chưa gen |
| `face-smile.png` | paperdoll-layer | Khuôn mặt với nụ cười mỉm tươi tắn, dịu dàng | ⬜ chưa gen |
| `face-blink.png` | paperdoll-layer | Khuôn mặt với đôi mắt chớp nhẹ thư thái | ⬜ chưa gen |
| `avatar-female-default.png` | portrait | Ảnh đại diện mẫu nữ mặc định trong tà áo dài thanh nhã | ⬜ chưa gen |
| `avatar-male-default.png` | portrait | Ảnh đại diện mẫu nam mặc định trong tà áo ngũ thân trang trọng | ⬜ chưa gen |
