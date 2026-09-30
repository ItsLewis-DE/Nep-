File: docs/03-features/museum.md

# Đặc Tả Tính Năng Kệ Sách Bảo Tàng (Museum)

## 1. Mục đích của khu vực

Kệ sách Bảo tàng là trung tâm lưu trữ tri thức văn hóa của Tiệm May Nếp. Khu vực này đáp ứng yêu cầu bắt buộc của đề bài về việc cung cấp thông tin ngắn gọn, chuẩn xác về nguồn gốc và ý nghĩa trang phục. Toàn bộ nội dung do nhóm mình tự biên soạn từ các nguồn sử liệu và nghiên cứu trang phục uy tín, phân định rành mạch giữa chi tiết có văn bản lịch sử xác thực với tập quán truyền khẩu dân gian. AI tuyệt đối không can thiệp vào việc sáng tác nội dung tại khu vực này.

## 2. Các bước người dùng thao tác

Bước 1: Người dùng chạm vào Kệ sách tại sảnh tiệm may để mở giao diện Bảo tàng.

Bước 2: Người dùng xem danh mục sách được sắp xếp theo hai cách:
- Theo dòng thời gian: Thời Lê - Trịnh, Thời Nguyễn (cải cách Võ Vương Nguyễn Phúc Khoát và vua Minh Mạng), Thời Pháp thuộc (thập niên 1930 với áo Le Mur), và Thời kỳ hiện đại.
- Theo loại trang phục: Áo tứ thân, Áo ngũ thân tay chẽn, Áo ngũ thân tay thụng (Áo tấc), Áo dài tân thời.

Bước 3: Người dùng chọn một thẻ tư liệu để mở rộng toàn màn hình. Mỗi thẻ gồm các phần chuẩn hóa:
- Tên gọi chính thức và các tên gọi dân gian.
- Hình vẽ minh họa cấu trúc chi tiết (vạt, tà, cổ, khuy, tay áo).
- Hoàn cảnh ra đời và ý nghĩa biểu tượng (ví dụ: năm thân áo ngũ thân tượng trưng cho tứ thân phụ mẫu và chính bản thân người mặc; năm hạt cùi tượng trưng cho ngũ thường: Nhân, Lễ, Nghĩa, Trí, Tín).
- Mục "Căn cứ lịch sử": Ghi rõ trích dẫn từ sách sử nào (ví dụ: *Đại Nam thực lục*, *Phủ biên tạp lục*).
- Mục "Ghi chú truyền khẩu": Nêu rõ những chi tiết chỉ mang tính quan niệm dân gian chưa có văn bản xác thực.

Bước 4: Đọc xong mỗi thẻ, người dùng bấm nút "Gấp sách", hệ thống cộng 15 xu thưởng vào túi xu và đánh dấu biểu tượng chiếc lá xanh bên cạnh tên thẻ (đã đọc).

Bước 5: Người dùng có thể dùng thanh tìm kiếm nhanh ở đầu kệ sách để gõ từ khóa (ví dụ: "cải cách Minh Mạng", "vải củ nâu", "áo tấc").

## 3. Các trạng thái màn hình

### Trạng thái bình thường
Màn hình mô phỏng các ngăn kệ sách gỗ pixel art. Mỗi cuốn sách có gáy màu khác nhau đại diện cho từng thời kỳ, kèm tiêu đề ngắn gọn và chỉ số tiến độ đọc (ví dụ: "Đã đọc 4/8 thẻ").

### Trạng thái đang tải (Loading)
Toàn bộ dữ liệu thẻ văn hóa được lưu trữ sẵn trong mã nguồn ứng dụng (Local JSON data) nên thời gian tải gần như bằng 0. Nếu chuyển bộ lọc, màn hình có hiệu ứng lật trang sách nhẹ trong 150 mili-giây.

### Trạng thái trống (Empty)
Chỉ xuất hiện khi người dùng nhập từ khóa tìm kiếm không khớp với bất kỳ thẻ tư liệu nào. Màn hình hiển thị một cuốn sổ để ngỏ kèm thông báo: "Kệ sách chưa tìm thấy tư liệu về từ khóa này. Bạn thử tìm 'ngũ thân', 'áo tấc' hoặc 'tứ thân' xem sao nhé!".

### Trạng thái lỗi (Error)
Không có lỗi mạng xảy ra do dữ liệu hoàn toàn tĩnh và nằm sẵn trong máy khách. Nếu có lỗi hiển thị phông chữ hoặc hình vẽ, hệ thống tự động đưa về định dạng văn bản chuẩn đơn giản của trình duyệt.

### Trạng thái dự phòng khi AI lỗi (Fallback)
Khu vực Kệ sách không phụ thuộc vào Gemini hay bất kỳ mô hình AI nào. Do đó, khu vực này luôn hoạt động 100% bình thường ngay cả khi mất mạng hoàn toàn hoặc API AI bị ngắt.

## 4. Tiêu chí để coi là làm xong (Acceptance Criteria)

- Tối thiểu 6 thẻ tư liệu hoàn chỉnh tương ứng với các phom dáng trang phục chính của người Kinh.
- Mỗi thẻ bắt buộc có mục trích dẫn nguồn sách sử cụ thể và phân định rõ giữa chính sử với truyền khẩu dân gian.
- Tính năng lọc theo thời kỳ và tìm kiếm từ khóa phản hồi tức thì.
- Cơ chế cộng 15 xu khi đọc xong hoạt động chính xác và chỉ cộng một lần duy nhất cho mỗi thẻ để tránh gian lận điểm thưởng.
- Trạng thái các thẻ đã đọc được ghi nhớ bền vững trong localStorage.
