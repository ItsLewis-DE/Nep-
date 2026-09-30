File: docs/07-game/chapter-5/setup.md

# Thiết Lập Kỹ Thuật Và Mỹ Thuật: Chương 5 (Năm 2026 - Chương Cuối)

Tài liệu này xác định chi tiết các thông số kỹ thuật, mô tả mỹ thuật pixel art cho từng phân cảnh, danh sách tọa độ điểm chạm (hitboxes) theo tỷ lệ phần trăm chính xác, danh mục nhân vật, vật phẩm và prompt tiếng Anh chuẩn hóa để tạo hình nền pixel cho Chương 5.

---

## 1. Phân cảnh `c5-s1-tiem-may-bao-mang` (Sảnh tiệm may trong cơn bão mạng)

### 1.1. Mô tả mỹ thuật cho họa sĩ pixel
- **Mặt phải (Thế giới thực):**
  - **Khung cảnh:** Sảnh chính Tiệm May Nếp trong đêm khuya mùa thu 2026. Ánh đèn đường vàng hắt qua khung cửa kính lớn, bóng cây bàng lay động trên sàn gỗ.
  - **Bố cục chính:**
    - Bên trái: Chiếc máy tính bảng và màn hình laptop đặt trên bàn cắt may, màn hình sáng chói hiển thị phiên livestream bán hàng và luồng bình luận tiêu cực màu đỏ/xanh trôi vun vút.
    - Ở giữa: Bàn may với chiếc thước gỗ 1888 và các xấp vải lụa tơ tằm truyền thống; chú mèo Nếp ngồi bên bàn phím.
    - Bên phải: Chiếc máy quét xưởng may số hóa đang nhấp nháy đèn chờ nhận diện ảnh.
  - **Bảng màu:** Đen tím đêm thu (`#1B1528`), xanh lạnh màn hình điện tử (`#3A86FF`), vàng đèn đường (`#E0A96D`), đỏ son nếp áo (`#B83A24`).
- **Mặt trái (Lật vải):**
  - Khung cảnh chuyển sang màu chàm tro lạnh ngắt.
  - Màn hình livestream ở mặt trái biến thành những dòng xích sắt đen siết chặt lấy chiếc bàn may gia truyền; các điểm lỗi hình thái trên chiếc áo nhái phát ra ánh sáng đỏ cảnh báo sai phạm.

### 1.2. Danh sách điểm chạm tương tác (Hitboxes)
- `hitbox-livestream-screen`: Màn hình máy tính bảng livestream (vị trí lấy ảnh áo nhái để bóc tách). Tọa độ: `x: 15%, y: 48%, w: 22%, h: 28%`.
- `hitbox-digital-workshop-scanner`: Máy quét số hóa Xưởng may bên phải bàn cắt. Tọa độ: `x: 68%, y: 52%, w: 20%, h: 32%`.
- `hitbox-cat-nep-keyboard`: Chú mèo Nếp bên bàn phím máy tính. Tọa độ: `x: 42%, y: 65%, w: 14%, h: 18%`.
- `hitbox-attic-stairway`: Cầu thang gỗ dẫn lên gác xép ký ức. Tọa độ: `x: 82%, y: 20%, w: 16%, h: 50%`.

### 1.3. Nhân vật xuất hiện
- An: Sprite nhà thiết kế Gen Z mặc áo thun năng động, khoác hờ áo sơ mi lụa tơ tằm mộc, ánh mắt tập trung và kiên nghị.
- Mèo Nếp: Sprite mèo mướp linh hoạt cào phím máy tính.
- Hoàng Lâm (hình ảnh livestream): Sprite doanh nhân trẻ chải chuốt trên màn hình điện tử.

### 1.4. Prompt tiếng Anh sinh hình ảnh pixel (Pixel Art Scene Generation)
```text
pixel art background, 320x240 resolution, interior of a modern vintage Vietnamese tailor shop in late autumn night 2026, glowing neon blue tablet screens on rustic wooden tailor desk, scrolling hate comments, antique fabric rolls and brass scissors, streetlights casting shadows through large window glass, 16-bit cyberpunk-meets-heritage aesthetic, atmospheric high contrast lighting
```

---

## 2. Phân cảnh `c5-s2-tran-dia-chi-vang` (Không gian Lật Vải toàn phần)

### 2.1. Mô tả mỹ thuật cho họa sĩ pixel
- **Mặt phải và Mặt trái hợp nhất (Không gian siêu thực):**
  - **Khung cảnh:** Toàn bộ căn nhà ba gian biến thành một cõi không gian dệt tơ tằm vô tận mang sắc xanh chàm huyền ảo (`#1E2A38`). Sàn nhà là những dải sợi dệt kéo dài về phía chân trời.
  - **Bố cục chính:**
    - Trung tâm: An đứng trên bục đài sen bằng gỗ, cầm chiếc thước thợ may cổ 1888 phát hào quang vàng kim rực rỡ.
    - Bốn góc phòng: Bốn ảo ảnh lung linh của 4 thế hệ tiền nhân đứng trên bốn đám mây ngũ sắc: Cụ Cầm (Đông), Cụ Loan (Nam), Bà Mai (Tây), Mẹ Phương (Bắc).
    - Phía trên trần: Chân thân khổng lồ của Thực thể Ông Lệ hình mạng nhện tro tàn đang giãy giụa trước ma trận lưới chỉ vàng.
  - **Bảng màu:** Vàng kim hào quang (`#FFD166`), xanh ngọc bích tâm linh (`#06D6A0`), đỏ son ý chí (`#EF476F`), chàm vũ trụ (`#073B4C`).

### 2.2. Danh sách điểm chạm tương tác (Hitboxes)
- `hitbox-ancestor-east`: Ảo ảnh Cụ Cầm góc Đông (kéo chỉ nâu sồng). Tọa độ: `x: 8%, y: 25%, w: 18%, h: 35%`.
- `hitbox-ancestor-south`: Ảo ảnh Cụ Loan góc Nam (kéo chỉ vàng mỡ gà). Tọa độ: `x: 74%, y: 25%, w: 18%, h: 35%`.
- `hitbox-ancestor-west`: Ảo ảnh Bà Mai góc Tây (kéo chỉ xanh ngọc). Tọa độ: `x: 10%, y: 60%, w: 18%, h: 35%`.
- `hitbox-ancestor-north`: Ảo ảnh Mẹ Phương góc Bắc (kéo chỉ trắng tinh khôi). Tọa độ: `x: 72%, y: 60%, w: 18%, h: 35%`.
- `hitbox-an-center`: An ở trung tâm (điểm hội tụ ma trận chỉ vàng). Tọa độ: `x: 42%, y: 40%, w: 16%, h: 35%`.

### 2.3. Prompt tiếng Anh sinh hình ảnh pixel (Pixel Art Scene Generation)
```text
pixel art background, 320x240 resolution, mystical ethereal cosmic textile realm, deep indigo dark woven space, glowing golden thread matrix connecting four female ghostly silhouettes in the corners to a young girl in the center holding a glowing antique wooden ruler, giant shadowy smoke monster trapped in radiant golden silk web above, breathtaking spiritual climax, 16-bit retro fantasy art
```

---

## 3. Phân cảnh `c5-s3-doi-chat-hoi-sinh` (Tuần lễ thời trang di sản Hà Nội 2026)

### 3.1. Mô tả mỹ thuật cho họa sĩ pixel
- **Mặt phải (Thế giới thực):**
  - **Khung cảnh:** Sân khấu sàn catwalk ngoài trời hiện đại tại Hoàng thành Thăng Long, dưới chân cột cờ Hà Nội cổ kính. Ánh đèn rọi sân khấu lộng lẫy, màn hình LED cong khổng lồ phía sau chiếu hình ảnh văn hóa y phục truyền thống.
  - **Không khí chiến thắng:** Hàng trăm bạn trẻ, nhà báo thời trang quốc tế và các nhà nghiên cứu đứng dậy vỗ tay vang dội. Màn hình LED hiển thị rõ ràng hồ sơ giám định vạch trần hàng nhái.
  - **Sự chuyển hóa của Ông Lệ:** Bóng đen tro tàn tan rã thành hàng ngàn cánh bướm vải mỏng nhiều màu sắc bay lượn trên bầu trời đêm Hà Nội rực rỡ trăng sao.

### 3.2. Danh sách điểm chạm tương tác (Hitboxes)
- `hitbox-led-screen`: Màn hình LED lớn phía sau (vị trí chiếu hồ sơ giám định y phục). Tọa độ: `x: 25%, y: 15%, w: 50%, h: 35%`.
- `hitbox-catwalk-an`: An đứng ở đầu sàn catwalk trong trang phục Việt phục Remix 2026. Tọa độ: `x: 40%, y: 45%, w: 20%, h: 50%`.
- `hitbox-lam-confession`: Hoàng Lâm cúi đầu nhận lỗi bên cánh gà sân khấu. Tọa độ: `x: 78%, y: 52%, w: 16%, h: 40%`.

### 3.3. Nhân vật xuất hiện
- An: Sprite lộng lẫy, tự tin sải bước trong bộ áo ngũ thân Remix 2026 tay chẽn cách tân, thần thái ngời sáng kiêu hãnh.
- Mèo Nếp: Sprite mèo đeo nơ đỏ ngồi trên bục danh dự sân khấu.
- Hoàng Lâm: Sprite xấu hổ cúi gập người xin lỗi trước truyền thông.
- Khán giả và ký giả: Đám đông hoan hô nồng nhiệt, giơ cao điện thoại ghi lại khoảnh khắc lịch sử.

### 3.4. Prompt tiếng Anh sinh hình ảnh pixel (Pixel Art Scene Generation)
```text
pixel art background, 320x240 resolution, grand outdoor fashion catwalk runway in 2026 Hanoi Imperial Citadel at night, ancient stone monument backdrop, bright stage spotlights, massive curved LED screen displaying heritage textile diagrams, young modern Vietnamese crowd cheering enthusiastically, colorful silk butterflies fluttering into starry night sky, triumphant emotional finale, 16-bit retro style
```
