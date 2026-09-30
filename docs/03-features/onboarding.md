File: docs/03-features/onboarding.md

# Đặc Tả Tính Năng Khởi Tạo Nhân Vật (Onboarding)

## 1. Mục đích của khu vực

Màn hình Khởi tạo nhân vật (Onboarding) giúp người dùng mới thiết lập nhanh nhân vật đại diện pixel art đầu tiên của mình trước khi bước vào sảnh tiệm may. Trải nghiệm này loại bỏ hoàn toàn rào cản đăng ký tài khoản, tập trung vào việc tạo sự gắn kết cá nhân ngay lập tức, với hình ảnh xuất phát điểm đồng nhất là chiếc áo dài trắng truyền thống.

## 2. Các bước người dùng thao tác

Bước 1: Người dùng mở ứng dụng, màn hình chào mừng xuất hiện với lời chào ngắn từ tiệm may và hình ảnh chiếc áo dài trắng đang treo trên giá.

Bước 2: Người dùng chọn một trong hai phương thức tạo nhân vật:
- Phương thức 1 (Nhanh): Chọn nhân vật có sẵn từ danh sách hình mẫu đại diện (nam hoặc nữ), sau đó chọn kiểu tóc, màu tóc và phụ kiện kính mắt cơ bản.
- Phương thức 2 (Tải ảnh selfie): Tải lên một bức ảnh chụp khuôn mặt từ điện thoại. Hệ thống gửi ảnh tới Gemini để bóc tách 3 đặc điểm: chiều dài tóc (ngắn/ngang vai/dài), màu tóc cơ bản (đen/nâu), và có đeo kính hay không. Hệ thống tự động ghép các sprite tương ứng để tạo nhân vật pixel.

Bước 3: Người dùng đặt một tên hiển thị ngắn (tối đa 12 ký tự, không bắt buộc, mặc định là "Thợ May Mới").

Bước 4: Người dùng nhấn nút "Vào Tiệm", dữ liệu nhân vật được lưu vào bộ nhớ cục bộ (localStorage) và màn hình tự động chuyển sang Sảnh tiệm may.

## 3. Các trạng thái màn hình

### Trạng thái bình thường
Hiển thị khung hình nhân vật pixel mặc áo dài trắng ở chính giữa, bên dưới là hai nút lựa chọn lớn: "Chọn mẫu có sẵn" và "Dùng ảnh của tôi". Khi chọn mẫu có sẵn, xuất hiện hàng nút cuộn ngang để đổi kiểu tóc và tông da.

### Trạng thái đang tải (Loading)
Xuất hiện khi người dùng chọn phương thức tải ảnh selfie. Màn hình hiển thị hoạt ảnh con thoi dệt vải chạy qua lại kèm dòng thông báo: "Đang ướm thử nếp áo cho bạn...". Toàn bộ nút bấm bị khóa tạm thời để tránh bấm trùng lặp.

### Trạng thái trống (Empty)
Chỉ xảy ra khi thiết bị không hỗ trợ đọc ảnh từ tệp hoặc danh sách hình mẫu tải lên bị lỗi bộ nhớ đệm. Giao diện tự động gán nhân vật mặc định (nữ tóc đen ngang vai, áo dài trắng trơn) và bật nút "Tiếp tục ngay".

### Trạng thái lỗi (Error)
Xuất hiện khi người dùng tải lên tệp không đúng định dạng hình ảnh (không phải PNG, JPG, WEBP) hoặc tệp vượt quá dung lượng 5MB. Màn hình hiện khung thông báo màu nâu đỏ: "Ảnh không đúng định dạng hoặc quá nặng. Bạn thử chọn lại ảnh khác nhé!".

### Trạng thái dự phòng khi AI lỗi (Fallback)
Nếu lệnh gọi Gemini phân tích ảnh selfie bị quá thời gian (timeout quá 5 giây) hoặc API trả về lỗi mạng:
- Hệ thống không chặn người dùng lại.
- Tự động bỏ qua bước nhận diện AI, hiển thị thông báo nhẹ: "Không nhận diện được ảnh, tiệm đã chọn sẵn hình mẫu áo dài trắng giúp bạn!".
- Giữ nguyên ảnh mẫu cơ bản và đưa thẳng các nút chọn tóc thủ công để người dùng tự điều chỉnh trong 2 giây rồi vào tiệm.

## 4. Tiêu chí để coi là làm xong (Acceptance Criteria)

- Người dùng không phải nhập mật khẩu hay email mà vẫn tạo được nhân vật.
- Luôn hiển thị được nhân vật mặc áo dài trắng trên bục đứng.
- Thời gian từ lúc mở màn hình đến khi vào được sảnh tiệm không quá 30 giây đối với phương thức chọn mẫu có sẵn.
- Trạng thái nhân vật được ghi thành công vào localStorage và giữ nguyên khi người dùng tải lại trang web.
- Xử lý mượt mà phương án dự phòng khi ngắt mạng hoặc API AI không phản hồi.
