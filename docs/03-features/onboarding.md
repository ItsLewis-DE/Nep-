# Đặc Tả Luồng Khởi Tạo Nhân Vật Tại Sảnh (Onboarding)

## 1. Mục đích của khu vực

Luồng Khởi tạo nhân vật được tích hợp trực tiếp ngay tại Sảnh sân nhà, loại bỏ hoàn toàn màn hình chào mừng tách rời để người dùng mới không gặp bất kỳ rào cản đăng nhập hay khảo sát ban đầu nào. Ngay khi mở ứng dụng, người dùng được trải nghiệm ngay không gian tiệm may thông qua thẻ tương tác "Bắt đầu câu chuyện của bạn", đồng thời được toàn quyền chủ động quyết định diện mạo nhân vật pixel (tự chọn giới tính và phong cách, hoặc để AI trích xuất nhanh thuộc tính tóc và kính từ ảnh selfie mà không lưu trữ dữ liệu khuôn mặt cá nhân).

## 2. Các bước người dùng thao tác

- **Bước 1: Tiếp cận tại sảnh**
  Người dùng bước thẳng vào Sảnh chính (Sân nhà hoàng hôn). Ở cạnh dưới trung tâm, thẻ *"Bắt đầu câu chuyện của bạn"* hiển thị trang trọng với hai tùy chọn rõ ràng:
  - **Lựa chọn A - "Dạo quanh sân nhà":** Người dùng vào tiệm ngay với nhân vật mẫu mặc định (mặc áo dài trắng truyền thống thanh lịch). Thẻ hướng dẫn tự động thu gọn để người dùng tự do tham quan 4 khu vực.
  - **Lựa chọn B - "Tạo nhân vật từ ảnh":** Mở bảng điều khiển (modal / bottom sheet) tạo nhân vật pixel hóa.

- **Bước 2: Chọn giới tính và phương thức tạo diện mạo**
  Người dùng tự tay chọn định danh giới tính cho nhân vật (Nam hoặc Nữ), hệ thống **tuyệt đối không dùng AI suy đoán giới tính** từ hình ảnh. Sau đó, người dùng chọn một trong hai phương thức tạo chi tiết:
  - **Cách 1 - Tạo từ ảnh selfie:** Người dùng tải ảnh chân dung/selfie từ thiết bị. Mô hình Gemini chỉ bóc tách 3 đặc điểm đồ họa: chiều dài kiểu tóc (ngắn / ngang vai / dài), màu tóc cơ bản (đen / nâu hạt dẻ / vàng khói) và phụ kiện kính mắt (có đeo kính hay không). Hệ thống không lưu trữ hay nhận diện khuôn mặt chân thực, chỉ ánh xạ các đặc điểm này thành các mảnh sprite pixel art tương ứng.
  - **Cách 2 - Chọn mẫu thủ công:** Người dùng tự chọn nhanh từ bảng danh sách kiểu tóc, màu tóc và màu da được vẽ sẵn.

- **Bước 3: Tinh chỉnh và đặt tên nhân vật**
  Người dùng có thể bấm đổi nhanh kiểu tóc hoặc kính nếu muốn thay đổi gợi ý từ AI, sau đó nhập tên hiển thị ngắn (tối đa 12 ký tự, mặc định: *"Thợ May Mới"*).

- **Bước 4: Hoàn tất và lưu trữ**
  Nhấn nút *"Xác nhận diện mạo"*, bảng tạo nhân vật đóng lại, nhân vật pixel mới tạo xuất hiện ngay trên tâm vòng hoa văn tròn giữa sân nhà. Dữ liệu nhân vật được lưu an toàn vào `localStorage` của trình duyệt.

## 3. Các trạng thái màn hình

### Trạng thái bình thường
Thẻ "Bắt đầu câu chuyện của bạn" hiển thị nổi bật ở nửa dưới sảnh chính với nền kem đào (`cream-100`), viền ngoài mận chín (`plum-800`), viền trong vàng đồng (`gold-500`) và hoa sen hai bên. Nút chính *"Tạo nhân vật từ ảnh ▶"* mang sắc hồng sen (`pink-500`) với bóng nổi dày 4px.

### Trạng thái đang tải (Loading)
Xuất hiện khi người dùng tải ảnh selfie để AI phân tích thuộc tính tóc và kính. Hiển thị hoạt ảnh con thoi dệt lụa dập nổi kèm dòng thông báo: *"Đang chọn nếp tóc và dáng kính pixel..."*. Các nút thao tác tạm thời vô hiệu hóa để tránh gửi yêu cầu lặp lại.

### Trạng thái trống (Empty)
Khi người dùng chưa thực hiện tạo nhân vật (mới truy cập lần đầu), sảnh mặc định hiển thị nhân vật mẫu trong tà áo dài ngũ thân trắng tinh khôi, sẵn sàng cho mọi tính năng phối đồ hay chơi game cốt truyện.

### Trạng thái lỗi (Error)
Xuất hiện khi tệp tải lên không phải hình ảnh hợp lệ (chỉ chấp nhận PNG, JPG, WEBP) hoặc dung lượng vượt quá 5MB. Khung thông báo viền hồng sen xuất hiện: *"Tệp ảnh chưa phù hợp hoặc quá lớn (tối đa 5MB). Bạn thử chọn ảnh khác nhé!"*.

### Trạng thái dự phòng khi AI lỗi (Fallback)
Nếu kết nối mạng bị ngắt hoặc dịch vụ Gemini không phản hồi trong vòng 5 giây:
- Không chặn người dùng hay dừng ứng dụng.
- Tự động chuyển thẳng sang chế độ chọn mẫu thủ công với thông báo thân thiện: *"Tín hiệu AI gián đoạn, tiệm đã mở sẵn bảng chọn tóc và kính thủ công để bạn tự do lựa chọn!"*.
- Người dùng chỉ mất 1-2 lần chạm tay là hoàn thành diện mạo và tiếp tục trải nghiệm.

## 4. Tiêu chí để coi là làm xong (Acceptance Criteria)

- Người dùng mới vào thẳng Sảnh chính mà không bị chặn bởi bất kỳ màn hình trung gian nào.
- Thẻ "Bắt đầu câu chuyện của bạn" hiển thị đầy đủ hai lựa chọn ("Tạo nhân vật từ ảnh" và "Dạo quanh sân nhà").
- Tuyệt đối không để AI đoán giới tính từ ảnh; người dùng luôn là người chủ động chọn định danh giới tính.
- Ảnh selfie chỉ dùng để ánh xạ 3 thuộc tính (kiểu tóc, màu tóc, kính mắt) sang sprite pixel, không lưu trữ ảnh gốc lên máy chủ.
- Cơ chế dự phòng ngoại tuyến/lỗi API chuyển mượt mà sang giao diện chọn mẫu thủ công trong tích tắc.
- Trạng thái nhân vật được ghi nhận tức thì vào `localStorage` và duy trì chính xác qua các lần mở lại trang web.
