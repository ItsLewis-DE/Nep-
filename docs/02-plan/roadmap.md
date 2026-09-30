File: docs/02-plan/roadmap.md

# Kế Hoạch Triển Khai Đến Hạn Nộp 10/10/2026

Tài liệu này xác định kế hoạch làm việc từng ngày cho nhóm 3 người từ ngày 30/09/2026 đến ngày nộp bài 10/10/2026. Kế hoạch đi kèm phương án cắt giảm tính năng dự phòng nhằm bảo đảm nộp bài đúng hạn và tối ưu điểm số theo tiêu chí Execution 50%.

## 1. Phân chia vai trò trong nhóm 3 người

Để tránh dẫm chân lên nhau, nhóm mình chia việc theo thế mạnh của từng thành viên:
- Thành viên 1 phụ trách giao diện người dùng và đồ họa pixel art (Frontend & UI): xây dựng khung ứng dụng di động, cắt và sắp xếp các lớp ảnh pixel (sprite layers), lắp ráp giao diện bốn phân khu và xử lý tương tác chạm.
- Thành viên 2 phụ trách kết nối AI và logic hệ thống (AI & System Logic): thiết lập gọi API Gemini bằng Google AI Studio, xây dựng JSON schema bóc tách ảnh áo thật, cấu hình prompt lookbook, viết luật kiểm tra màu sắc, logic nhắc nhở văn hóa và quản lý lưu trữ dữ liệu local.
- Thành viên 3 phụ trách nghiên cứu tư liệu và kịch bản (Content & Game Design): biên soạn kho tư liệu văn hóa có trích dẫn nguồn cho Bảo tàng, soạn thảo kịch bản lời thoại và câu đố cho Chương 1 của phần Hành trình, kiểm chứng tính chính xác lịch sử và hoàn thiện bộ tài liệu nộp thi.

## 2. Lịch trình chi tiết theo từng ngày

### Ngày 30/09/2026: Khởi động và thống nhất cấu trúc
- Cả nhóm: Thống nhất các tài liệu nền tảng (`requirements.md`, `roadmap.md`, cấu trúc thư mục).
- Thành viên 1: Dựng khung sườn ứng dụng web bằng React, cấu hình Tailwind CSS hiển thị chuẩn trên màn hình điện thoại dọc.
- Thành viên 2: Chuẩn bị cấu trúc dữ liệu JSON cho trang phục, bảng màu, danh mục phụ kiện và thiết lập thư viện kết nối Gemini.
- Thành viên 3: Hoàn thành danh mục trang phục người Kinh và thu thập tài liệu lịch sử làm nguồn đối chiếu cho Bảo tàng.

### Ngày 01/10/2026: Sảnh tiệm may và khung nhân vật
- Thành viên 1: Dựng giao diện sảnh tiệm may pixel art với 4 góc bấm chuyển khu (Bàn may, Tủ gỗ, Kệ sách, Cái rương cũ).
- Thành viên 2: Xây dựng hệ thống quản lý trạng thái nhân vật mặc định (mặc áo dài trắng) và lưu trạng thái vào localStorage.
- Thành viên 3: Biên soạn kịch bản giới thiệu sảnh tiệm và các câu thoại ngắn của mèo Nếp.

### Ngày 02/10/2026: Xây dựng lõi Bàn may (Studio)
- Thành viên 1: Lắp ráp giao diện Bàn may: thanh cuộn chọn phom áo (tứ thân, ngũ thân, tân thời), bảng chọn màu sắc và các lớp phụ kiện hiển thị trực tiếp lên nhân vật.
- Thành viên 2: Viết bộ lọc trang phục theo sự kiện (Tết, lễ cưới, bế giảng, lễ chùa, viếng tang).
- Thành viên 3: Xây dựng ma trận phối màu (độ tương phản, độ bão hòa) và lập bảng 5 quy tắc cốt lõi về ứng xử trang phục truyền thống.

### Ngày 03/10/2026: Trợ lý mèo Nếp và bộ đánh giá phối đồ
- Thành viên 1: Dựng bảng chấm điểm hài hòa màu sắc, thẻ nhắc nhở văn hóa và giao diện đối chiếu 2 bộ đồ cạnh nhau.
- Thành viên 2: Cài đặt logic cho mèo Nếp đưa ra 3 phương án gợi ý phối đồ theo sự kiện và thời tiết.
- Thành viên 3: Soạn thảo nội dung các thông điệp nhắc nhở văn hóa khi người dùng phối đồ vi phạm quy tắc lễ nghi.

### Ngày 04/10/2026: Kệ sách Bảo tàng tư liệu
- Thành viên 1: Dựng giao diện Kệ sách mở rộng thành các thẻ tư liệu văn hóa dạng lật trang hoặc thẻ kéo.
- Thành viên 2: Hoàn thiện tính năng tìm kiếm, lọc thẻ theo thời kỳ lịch sử và đánh dấu thẻ đã đọc.
- Thành viên 3: Nhập toàn bộ dữ liệu thẻ văn hóa vào file code: phân định rành mạch giữa tư liệu có văn bản lịch sử xác thực và yếu tố truyền khẩu dân gian.

### Ngày 05/10/2026: Tủ gỗ, kho đồ và cửa hàng xu
- Thành viên 1: Dựng giao diện ngăn kéo Tủ đồ và gian hàng mua phụ kiện bằng đồng xu.
- Thành viên 2: Cài đặt logic tích lũy xu khi người dùng tương tác trong app và trừ xu khi mua phụ kiện.
- Thành viên 3: Đặt giá xu hợp lý cho từng món đồ và viết mô tả chi tiết cho từng phụ kiện trong tủ đồ.

### Ngày 06/10/2026: Xưởng may số hóa tích hợp Gemini
- Thành viên 1: Dựng giao diện bàn máy may với nút bấm tải ảnh áo ngoài đời thực.
- Thành viên 2: Viết prompt thị giác gửi ảnh sang Gemini để trích xuất phom áo, màu sắc, hoa văn thành JSON; ánh xạ dữ liệu trả về thành trang phục pixel trong tủ đồ.
- Thành viên 3: Kiểm thử các trường hợp gửi ảnh sườn xám hoặc hanbok để bảo đảm hệ thống hiển thị văn bản giải thích chuẩn xác sự khác biệt về cấu trúc áo.

### Ngày 07/10/2026: Lookbook studio chân thực
- Thành viên 1: Dựng khung hiển thị bộ sưu tập Lookbook 4 ảnh chân thực kèm nút lưu ảnh về máy.
- Thành viên 2: Tinh chỉnh cấu trúc prompt sinh ảnh chân thực bằng Gemini dựa trên bộ đồ nhân vật đang mặc trong Studio.
- Thành viên 3: Kiểm tra chất lượng hình ảnh sinh ra, bảo đảm không bị lỗi phom dáng và giữ phong cách chụp ảnh studio truyền thống.

### Ngày 08/10/2026: Cái rương cũ và Chương 1 game giải đố
- Thành viên 1: Dựng cảnh căn gác mái, chiếc rương cũ và hiệu ứng chuyển đổi khi bấm nút "Lật vải".
- Thành viên 2: Cài đặt logic nhặt vật phẩm, mở khóa rương và thử thách phối đồ ở cuối chương.
- Thành viên 3: Viết kịch bản chi tiết cuộc đối thoại với Ông Lệ và các câu đố tìm manh mối trên mặt trái tấm vải.

### Ngày 09/10/2026: Tối ưu di động, kiểm thử và đồng bộ tài liệu
- Cả nhóm: Chạy thử toàn bộ ứng dụng trên trình duyệt điện thoại thực tế, kiểm tra độ mượt của thao tác chạm.
- Thành viên 1: Khắc phục các lỗi hiển thị, tràn khung, sai lệch tỉ lệ trên các kích thước màn hình khác nhau.
- Thành viên 2: Rà soát lại thời gian phản hồi của các lệnh gọi Gemini, bảo đảm có trạng thái chờ (loading spinner) rõ ràng.
- Thành viên 3: Rà soát toàn bộ văn bản trong app và cập nhật đầy đủ các file tài liệu trong thư mục `docs/`.

### Ngày 10/10/2026: Đóng gói và nộp bài
- Sáng: Kiểm tra toàn bộ checklist yêu cầu đề bài và các điều khoản thể lệ (không vi phạm dữ liệu cá nhân, không mã độc).
- Chiều: Ghi hình video demo sản phẩm dài dưới 3 phút nêu bật các tính năng chính và chuẩn bị nội dung thuyết trình sẵn sàng cho vòng trong.
- 18:00: Nộp bài dự thi chính thức lên cổng tiếp nhận của ban tổ chức trước hạn chót.

## 3. Chiến lược cắt giảm tính năng dự phòng (Fall-back Strategy)

Nếu tiến độ bị chậm so với kế hoạch, nhóm mình áp dụng nguyên tắc bảo vệ tối đa 50% điểm Execution. Mọi tính năng chạy thử được đều phải hoạt động trơn tru, không để lại nút bấm lỗi hay tính năng dở dang.

### Những phần tuyệt đối không được cắt
- Khung sườn ứng dụng web di động và đồ họa pixel art của sảnh tiệm may.
- Khu vực Bàn may (Studio): đầy đủ thao tác chọn phom áo, màu sắc, phụ kiện, đổi đồ tức thì trên nhân vật pixel và bộ lọc sự kiện.
- Logic kiểm tra màu sắc cơ bản và các thông điệp nhắc nhở văn hóa cốt lõi.
- Khu vực Kệ sách (Bảo tàng): các thẻ tư liệu văn hóa có trích dẫn nguồn lịch sử xác thực.
- Xưởng may: tính năng gọi Gemini đọc ảnh áo thật ngoài đời và giải thích điểm khác biệt với sườn xám hoặc hanbok.

### Thứ tự ưu tiên cắt giảm nếu trễ hạn
1. Cắt giảm đầu tiên: Tính năng nhận diện selfie tạo nhân vật pixel. Nếu không kịp thời gian tinh chỉnh, nhóm mình giữ nguyên việc cho người dùng chọn các bộ nhân vật mẫu có sẵn (nam/nữ) mặc áo dài trắng.
2. Cắt giảm thứ hai: Tính năng sinh ảnh Lookbook chân thực bằng AI. Nếu thời gian gọi ảnh quá lâu hoặc kết quả thiếu ổn định, chuyển tính năng Lookbook thành dạng xuất tấm thẻ ảnh tổng hợp đồ họa pixel của nhân vật kèm bảng thông tin phối đồ để chia sẻ.
3. Cắt giảm thứ ba: Rút ngắn cảnh của Chương 1 phần Hành trình. Thay vì làm một chuỗi nhiều cảnh di chuyển phức tạp, cô đọng toàn bộ câu đố tìm manh mối và cơ chế "Lật vải" vào một màn hình duy nhất tại chiếc rương cũ và căn gác mái.
4. Cắt giảm thứ tư: Số lượng phụ kiện trong cửa hàng Tủ gỗ. Rút bớt số lượng món hàng từ 15 món xuống còn 5 món cơ bản nhất (khăn vấn, nón ba tầm, quạt giấy, guốc mộc, chuỗi hạt) để giảm áp lực vẽ sprite.
