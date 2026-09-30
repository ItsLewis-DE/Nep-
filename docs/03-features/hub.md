File: docs/03-features/hub.md

# Đặc Tả Tính Năng Sảnh Tiệm May (Hub)

## 1. Mục đích của khu vực

Sảnh tiệm may là không gian trung tâm của ứng dụng, đóng vai trò như bản đồ điều hướng trực quan mang phong cách pixel art. Tại đây, người dùng cảm nhận được không khí của một tiệm may truyền thống ấm cúng, nhìn thấy số tài nguyên (đồng xu) mình sở hữu, và dễ dàng chuyển đổi qua lại giữa bốn khu vực chức năng chính mà không cần dùng đến các thanh menu dạng chữ khô khan.

## 2. Các bước người dùng thao tác

Bước 1: Sau khi hoàn thành màn hình Onboarding hoặc mở lại ứng dụng, người dùng vào ngay màn hình Sảnh tiệm may.

Bước 2: Người dùng quan sát toàn cảnh tiệm với bốn khu vực tương tác được làm nổi bật bằng hiệu ứng viền sáng nhẹ hoặc biển hiệu gỗ:
- Chạm vào Bàn may ở góc giữa: Mở phân khu Studio (phối đồ).
- Chạm vào Tủ gỗ lớn ở bên trái: Mở phân khu Closet & Workshop (Tủ đồ và Xưởng may).
- Chạm vào Kệ sách ở góc phải: Mở phân khu Museum (Bảo tàng tư liệu văn hóa).
- Chạm vào Chiếc rương cũ ở góc phòng: Mở phân khu Journey (Game giải đố point-and-click).

Bước 3: Người dùng có thể chạm vào chú mèo Nếp đang nằm cuộn tròn dưới chân bàn may để xem một câu chào ngẫu nhiên hoặc lời nhắc thời tiết trong ngày.

Bước 4: Người dùng chạm vào biểu tượng túi xu ở góc trên màn hình để xem lịch sử nhận xu (nếu có) hoặc xem hướng dẫn cách kiếm thêm xu trong tiệm.

## 3. Các trạng thái màn hình

### Trạng thái bình thường
Toàn bộ khung cảnh tiệm may hiển thị đầy đủ chi tiết pixel art. Nhân vật đại diện của người dùng đứng ở giữa tiệm, mèo Nếp thi thoảng vẫy đuôi. Thanh chỉ số phía trên hiển thị tên tiệm "Tiệm May Nếp", số xu tích lũy và nút cài đặt âm thanh (bật/tắt nhạc nền nhẹ).

### Trạng thái đang tải (Loading)
Chỉ xuất hiện trong khoảng 0.5 giây khi khởi tạo tài nguyên hình ảnh pixel lần đầu. Hiển thị hình ảnh tấm rèm cửa tiệm may khép lại kèm dòng chữ: "Đang mở cửa tiệm...".

### Trạng thái trống (Empty)
Không áp dụng cho sảnh chính vì cảnh nền luôn cố định. Nếu dữ liệu số xu chưa có, hệ thống tự khởi tạo giá trị ban đầu là 100 xu (quà mừng vào tiệm).

### Trạng thái lỗi (Error)
Xảy ra khi tệp hình ảnh nền hoặc sprite nhân vật không tải được do mất kết nối mạng. Lúc này, sảnh tiệm chuyển sang hiển thị giao diện phẳng tối giản bằng màu nâu gỗ của Tailwind CSS, các khu vực chuyển thành bốn ô khối chữ nhật có nhãn rõ ràng để người dùng vẫn tiếp tục sử dụng được các tính năng.

### Trạng thái dự phòng khi AI lỗi (Fallback)
Sảnh tiệm may hoạt động hoàn toàn bằng mã nguồn phía máy khách (Client-side), không sử dụng bất kỳ lệnh gọi AI nào nên không bị ảnh hưởng khi dịch vụ Gemini gặp sự cố. Mọi tương tác chuyển khu đều được bảo toàn.

## 4. Tiêu chí để coi là làm xong (Acceptance Criteria)

- Bốn khu vực tương tác (Bàn may, Tủ gỗ, Kệ sách, Cái rương) có vùng bấm (hitbox) rõ ràng, vừa ngón tay trên màn hình điện thoại (tối thiểu 48x48 pixel).
- Chuyển phân khu mượt mà trong thời gian dưới 300 mili-giây, không bị giật khung hình.
- Số xu hiển thị chính xác từ dữ liệu localStorage.
- Chạm vào mèo Nếp hiển thị được ít nhất 3 câu thoại khác nhau trong bóng thoại pixel.
