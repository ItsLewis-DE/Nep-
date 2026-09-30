File: docs/03-features/studio.md

# Đặc Tả Tính Năng Bàn May Phối Đồ (Studio)

## 1. Mục đích của khu vực

Bàn may là phân khu cốt lõi phục vụ trực tiếp đề bài "Việt phục Remix". Nơi đây cho phép học sinh, sinh viên tự do thử nghiệm các kiểu phối áo truyền thống người Kinh (tứ thân, ngũ thân tay chẽn, ngũ thân tay thụng, áo dài tân thời), kết hợp màu sắc và phụ kiện theo từng bối cảnh đời sống thực tế. Khu vực này tích hợp thước đo kiểm tra mức độ hài hòa màu sắc, các lưu ý văn hóa để người mặc tự tin không phạm quy tắc lễ nghi, và tính năng tạo ảnh Lookbook chân thực bằng Gemini.

## 2. Các bước người dùng thao tác

Bước 1: Chọn ngữ cảnh sự kiện. Người dùng bấm chọn một trong các thẻ sự kiện: Tết Nguyên đán, Lễ cưới, Bế giảng tốt nghiệp, Đi lễ chùa, Đi viếng tang, hoặc Tự do dạo phố.

Bước 2: Chọn phom dáng áo. Người dùng chọn 1 trong 4 phom dáng y phục: Áo tứ thân, Áo ngũ thân tay chẽn, Áo ngũ thân tay thụng (Áo tấc), hoặc Áo dài tân thời. Nhân vật trên bục đứng lập tức đổi dáng áo tương ứng.

Bước 3: Tùy biến màu sắc và họa tiết. Người dùng chọn màu tà áo, màu cổ áo và màu quần/váy từ bảng màu truyền thống (màu điều, hoàng yến, củ nâu, lam khói, ngọc bích, hoa đào, trắng bạch...).

Bước 4: Chọn phụ kiện đi kèm. Người dùng chọn thêm các món phụ kiện: Khăn vấn, Nón ba tầm/Nón lá, Guốc mộc, Quạt giấy hoặc Chuỗi hạt.

Bước 5: Xem đánh giá và gợi ý:
- Xem thanh điểm hài hòa màu sắc (thang điểm 100) và nhận xét ngắn về độ tương phản.
- Đọc thẻ lưu ý văn hóa nếu cách phối hiện tại có chi tiết dễ gây hiểu lầm hoặc vi phạm lễ nghi (ví dụ: mặc đồ quá sặc sỡ đi viếng tang).
- Bấm vào mèo Nếp để xem 3 bộ đồ mẫu do Nếp phối sẵn theo sự kiện đã chọn và thời tiết giả định (nắng ấm/mát mẻ/se lạnh).

Bước 6: Thao tác nâng cao:
- Bấm "So sánh" để ghim bộ đồ hiện tại và chuyển sang phối bộ thứ hai đặt song song.
- Bấm "Lưu bộ đồ" để đưa vào Tủ đồ cá nhân.
- Bấm "Tạo Lookbook" để gửi yêu cầu sinh 4 ảnh chân thực mô phỏng bối cảnh studio.

## 3. Các trạng thái màn hình

### Trạng thái bình thường
Màn hình chia làm hai phần: nửa trên là bục đứng của nhân vật pixel phản hồi tức thì mỗi khi thay đổi trang phục, kèm chỉ số điểm màu sắc; nửa dưới là các thanh trượt theo tab (Dáng áo, Màu sắc, Phụ kiện, Sự kiện).

### Trạng thái đang tải (Loading)
Xuất hiện khi người dùng bấm nút "Tạo Lookbook" do cần thời gian gọi mô hình Gemini sinh hình ảnh. Màn hình hiển thị một khung mờ phủ lên trên kèm hoạt ảnh kim thêu đang chuyển động và dòng thông báo: "Mèo Nếp đang chuẩn bị phòng chụp studio cho bạn... (khoảng 5-10 giây)".

### Trạng thái trống (Empty)
Khi người dùng chuyển sang chế độ "So sánh" nhưng chưa lưu bộ đồ nào để đối chiếu, ô so sánh bên cạnh hiển thị hình bóng mờ của chiếc mắc áo cùng thông báo: "Chưa có bộ đồ thứ hai. Hãy phối thêm một bộ để so sánh nhé!".

### Trạng thái lỗi (Error)
Xuất hiện khi người dùng chọn kết hợp các món đồ xung đột hiển thị (ví dụ: đội nón ba tầm cùng lúc với nón lá chóp). Hệ thống tự động bỏ chọn món đồ cũ, gắn món đồ mới và hiện thông báo ngắn trong 2 giây: "Đã đổi loại nón phù hợp".

### Trạng thái dự phòng khi AI lỗi (Fallback)
Đối với tính năng "Tạo Lookbook" dùng Gemini:
- Nếu mạng ngắt, API báo lỗi hoặc quá thời gian chờ (sau 12 giây): Khung tạo ảnh thông báo: "Phòng chụp studio đang bận. Tiệm gửi bạn bản phác thảo pixel art để lưu kỷ niệm nhé!".
- Hệ thống lập tức xuất ra một bức ảnh tổng hợp dạng thẻ bài Polaroid vẽ bằng pixel art thể hiện nhân vật cùng bảng thông tin các món đồ đã phối, kèm nút "Tải ảnh về máy". Người dùng vẫn có sản phẩm để khoe mà không bị đứt đoạn trải nghiệm.
- Đối với gợi ý của mèo Nếp: Nếu API không trả về gợi ý thời tiết động, hệ thống sử dụng kho 15 bộ quy tắc có sẵn trong mã nguồn để mèo Nếp đưa ra 3 bộ đồ phù hợp nhất với sự kiện.

## 4. Tiêu chí để coi là làm xong (Acceptance Criteria)

- Đổi phom áo, màu sắc và phụ kiện trên nhân vật phản hồi ngay lập tức dưới 100 mili-giây.
- Bộ lọc sự kiện cập nhật đúng danh sách đồ phù hợp.
- Thước đo màu sắc tính toán và hiển thị điểm số nhất quán theo công thức tương phản màu sắc.
- Thông điệp nhắc nhở văn hóa hiển thị đúng khi vi phạm 5 quy tắc chuẩn mực đã định nghĩa.
- Tính năng so sánh đặt được 2 bộ đồ cạnh nhau trên màn hình di động mà không vỡ khung.
- Luôn có kết quả trả về khi bấm tạo Lookbook (ảnh chân thực nếu thành công, thẻ pixel nếu gặp lỗi).
