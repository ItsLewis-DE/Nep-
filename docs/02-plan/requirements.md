File: docs/02-plan/requirements.md

# Yêu Cầu Đề Thi Và Ràng Buộc Thể Lệ

Tài liệu này ghi lại toàn bộ yêu cầu của đề bài Audition "Việt phục Remix", các tiêu chí chấm điểm của ban giám khảo, cùng các quy định bắt buộc về công cụ AI, bảo mật dữ liệu và quyền sở hữu trí tuệ. Đây là căn cứ để nhóm mình kiểm soát phạm vi tính năng của app Tiệm May Nếp.

## 1. Yêu cầu của đề bài Audition

Đề bài đặt ra thử thách xây dựng một ứng dụng giúp học sinh, sinh viên khám phá và phối trang phục truyền thống Việt Nam theo sự kiện, địa phương hoặc phong cách cá nhân.

Về mặt nghiên cứu và phương pháp tiếp cận, đề bài yêu cầu:
- Xác định rõ nhóm trang phục hoặc bối cảnh văn hóa tập trung khai thác. Nhóm mình chọn y phục truyền thống của người Kinh (tứ thân, ngũ thân tay chẽn, ngũ thân tay thụng, áo dài tân thời).
- Phân tích nhu cầu thực tế của học sinh, sinh viên: muốn mặc đồ truyền thống nhưng sợ mặc sai nghi lễ, thiếu thông tin về hoàn cảnh sử dụng, và chi phí may mặc thực tế quá cao.
- Phác thảo trải nghiệm phối đồ trực quan, thao tác nhanh trên thiết bị cá nhân.
- Đề xuất giải pháp bảo đảm tính chuẩn xác và sự tôn trọng đối với giá trị văn hóa.

Về sản phẩm chạy thử (demo), đề bài chia thành hai nhóm tính năng:

Các tính năng bắt buộc:
- Cho phép người dùng chọn loại trang phục hoặc sự kiện.
- Cho phép chọn màu sắc, phụ kiện hoặc phong cách.
- Hiển thị kết quả phối đồ trực quan dưới dạng hình ảnh, thẻ gợi ý hoặc mockup.
- Cung cấp thông tin ngắn gọn, chính xác về nguồn gốc hoặc ý nghĩa của trang phục.

Các tính năng bổ sung khuyến khích:
- Tải ảnh cá nhân hoặc chọn nhân vật đại diện để thử đồ.
- Gợi ý trang phục phù hợp với thời tiết và sự kiện.
- Kiểm tra mức độ hài hòa của màu sắc trên bộ trang phục.
- So sánh các phương án phối đồ khác nhau.
- Tạo và chia sẻ bộ sưu tập hình ảnh lookbook.
- Cảnh báo các trường hợp phối đồ có nguy cơ làm sai lệch đặc trưng văn hóa.

## 2. Tiêu chí chấm điểm

Ban giám khảo đánh giá bài thi theo thang điểm 10 với ba nhóm tiêu chí:

Execution / Feasibility (50% tổng điểm)
Đây là tiêu chí có trọng số cao nhất. Ban giám khảo đánh giá khả năng tạo ra một sản phẩm chạy thử thực tế trong thời gian quy định, mức độ giải quyết sát đúng bài toán đề ra, và tính sử dụng được của kết quả. Nếu các đội bằng điểm nhau, điểm Execution là tiêu chí ưu tiên hàng đầu để xếp hạng.

Vision (30% tổng điểm)
Đánh giá định hướng phát triển sản phẩm, giá trị thực tiễn trong tương lai, mức độ ăn khớp giữa vấn đề và giải pháp (problem-solution fit), cùng khả năng nhân rộng giải pháp. Tiêu chí này được đánh giá chủ yếu qua phần thuyết trình (pitch) và trả lời câu hỏi phản biện của ban giám khảo.

Creativity (20% tổng điểm)
Đánh giá mức độ mới lạ, tính độc đáo của ý tưởng, cách thức khai thác năng lực của mô hình AI và tư duy giải quyết vấn đề vượt ra ngoài các khuôn mẫu thông thường.

## 3. Các quy định bắt buộc theo thể lệ cuộc thi

Về công cụ AI:
- Công cụ chính thức bắt buộc sử dụng là Google Gemini và nền tảng Google AI Studio.
- Trong vòng thi, nhóm mình phải nhập prompt bằng bàn phím.
- Tuyệt đối tuân thủ chính sách AI có trách nhiệm (Responsible AI) của Google: không dùng AI để tạo nội dung độc hại, bạo lực, vi phạm pháp luật, và không tìm cách vượt qua các rào chắn an toàn của hệ thống.

Về bảo vệ dữ liệu cá nhân:
- Người dùng không cần tạo tài khoản để sử dụng app nhằm giảm thiểu rủi ro thu thập thông tin cá nhân.
- Khi người dùng tải ảnh selfie hoặc ảnh áo thật lên app, ảnh chỉ được dùng để mô hình trích xuất đặc điểm kỹ thuật trong phiên làm việc hiện tại, không lưu trữ vĩnh viễn trên máy chủ bên ngoài.
- Không sử dụng dữ liệu cá nhân, khuôn mặt hoặc thông tin nhạy cảm của bên thứ ba khi chưa có sự đồng ý hợp lệ.

Về sở hữu trí tuệ và tính liêm chính:
- Nhóm mình chịu trách nhiệm toàn bộ về tính hợp pháp của mã nguồn, tư liệu, hình ảnh và nội dung đưa vào bài thi.
- Không sao chép trái phép mã nguồn hoặc tài sản trí tuệ của các dự án khác.
- Đội thi giữ quyền sở hữu đối với sản phẩm, đồng thời đồng ý cho ban tổ chức sử dụng tư liệu thi đấu phục vụ mục đích truyền thông và tổng kết chương trình.

## 4. Bảng đối chiếu yêu cầu của đề bài với tính năng của Tiệm May Nếp

| Yêu cầu của đề bài | Tính năng tương ứng trong Tiệm May Nếp | Khu vực thực hiện trong app | Mức độ ưu tiên |
| :--- | :--- | :--- | :--- |
| Chọn loại trang phục | Chọn phom dáng áo: tứ thân, ngũ thân tay chẽn, ngũ thân tay thụng (áo tấc), áo dài tân thời | Bàn may (Studio) | Bắt buộc |
| Chọn sự kiện sử dụng | Bộ lọc ngữ cảnh: Tết Nguyên đán, lễ cưới, bế giảng, đi lễ chùa, đi viếng tang | Bàn may (Studio) | Bắt buộc |
| Chọn màu sắc và phụ kiện | Bảng chọn màu vải dệt, phụ kiện (khăn vấn, nón ba tầm, quạt giấy, guốc mộc, chuỗi hạt) | Bàn may (Studio) & Tủ gỗ | Bắt buộc |
| Xem kết quả phối đồ | Nhân vật pixel art cập nhật trang phục tức thì trên bục thử đồ | Bàn may (Studio) | Bắt buộc |
| Đọc nguồn gốc, ý nghĩa trang phục | Thẻ thông tin văn hóa trích dẫn nguồn lịch sử có ghi chép rõ ràng | Kệ sách (Bảo tàng) | Bắt buộc |
| Tải ảnh / chọn nhân vật đại diện | Nhân vật pixel mặc định có thể đổi kiểu tóc, giới tính hoặc tạo nét từ ảnh chụp | Sảnh tiệm & Bàn may | Bổ sung |
| Gợi ý theo thời tiết và sự kiện | Mèo mướp Nếp gợi ý 3 bộ đồ phù hợp với bối cảnh sự kiện và điều kiện thời tiết | Bàn may (Studio) | Bổ sung |
| Kiểm tra độ hài hòa màu sắc | Thước đo chấm điểm phối màu dựa trên nguyên lý tương phản và sắc độ | Bàn may (Studio) | Bổ sung |
| So sánh các phương án phối đồ | Khung hiển thị song song 2 đến 3 bộ trang phục đã phối để người dùng đối chiếu | Bàn may (Studio) | Bổ sung |
| Tạo và chia sẻ lookbook | Gemini sinh 4 bức ảnh chân thực mô phỏng ảnh chụp tại studio truyền thống | Bàn may (Studio) | Bổ sung |
| Cảnh báo sai lệch đặc trưng văn hóa | Hệ thống thông báo nhắc nhở khi phối sai ngữ cảnh nghi lễ hoặc nhầm lẫn dáng áo | Bàn may & Xưởng may | Bổ sung |
| Nhận diện áo thật và phân biệt | Quét ảnh áo ngoài đời thực thành đồ pixel; giải thích điểm khác sườn xám, hanbok | Xưởng may (Tủ gỗ) | Sáng tạo riêng |
| Trải nghiệm lịch sử và lề thói cũ | Trò chơi giải đố point-and-click với cơ chế Lật vải qua từng thời kỳ áo dài | Cái rương cũ (Hành trình) | Sáng tạo riêng |
