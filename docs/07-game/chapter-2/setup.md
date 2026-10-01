# Thiết Lập Kỹ Thuật Và Mỹ Thuật: Chương 2 (Năm 1935)

Tài liệu này xác định chi tiết các thông số kỹ thuật, mô tả mỹ thuật pixel art cho từng phân cảnh, danh sách tọa độ điểm chạm (hitboxes) theo tỷ lệ phần trăm chính xác, danh mục nhân vật, vật phẩm và prompt tiếng Anh chuẩn hóa để tạo hình nền pixel cho Chương 2.

---

## 1. Phân cảnh `c2-s1-gac-lung-ve-tranh` (Căn gác lửng phố Hàng Gai)

### 1.1. Mô tả mỹ thuật cho họa sĩ pixel
- **Mặt phải (Thế giới thực):**
  - **Khung cảnh:** Căn gác lửng áp mái mang phong cách kiến trúc Pháp - Việt giao duyên thập niên 1930. Mái dốc lợp ngói vảy cá, cửa sổ vòm kiểu Pháp nhìn xuống tán cây bàng lá đỏ và dòng người đi lại trên phố Hàng Gai.
  - **Ánh sáng:** Đèn măng-sông sáng trắng ngả vàng ấm rọi lên giá vẽ bằng gỗ thông mộc mạc. Bụi phấn vẽ lơ lửng trong ánh sáng.
  - **Bố cục chính:**
    - Bên trái: Giá vẽ gỗ thông có bức tranh vẽ dở chiếc áo dài Lemur; chiếc bàn dài bày la liệt hộp màu vẽ, thước cong kiểu Pháp, kéo cắt may và bút chì than.
    - Ở giữa: Sàn gỗ thông có vương vãi các mảnh giấy vẽ bị vò nát; giỏ mây đựng vụn vải lụa hoa đào.
    - Bên phải: Chiếc giường sắt kiểu Pháp nhỏ phủ chăn dùi, tủ sách chất đầy các số báo *Phong Hóa* và tiểu thuyết Tự Lực Văn Đoàn.
  - **Bảng màu:** Vàng giấy vẽ hoài niệm (`#F2E6CE`), nâu gỗ thông (`#7C5535`), trắng ngà lụa (`#FAF5EE`), xanh chàm nhạt của mực vẽ (`#3A506B`).
- **Mặt trái (Lật vải):**
  - Cảnh vật chuyển sang tông xám tro chàm buốt giá.
  - Các mảnh giấy vẽ bị xé ở mặt trái phát sáng đường viền vàng chỉ thêu, kết nối với nhau như một câu đố ma trận thị giác dẫn đường ra cửa sổ ban công.

### 1.2. Danh sách điểm chạm tương tác (Hitboxes)
- `hitbox-drawing-desk`: Bàn vẽ mỹ thuật (vị trí nhặt mảnh vẽ 1 & bút chì). Tọa độ: `x: 15%, y: 45%, w: 30%, h: 32%`.
- `hitbox-fabric-basket`: Giỏ mây đựng vụn vải (vị trí nhặt mảnh vẽ 2). Tọa độ: `x: 48%, y: 68%, w: 14%, h: 22%`.
- `hitbox-gas-lamp`: Đế đèn măng-sông trên đôn gỗ (vị trí nhặt mảnh vẽ 3). Tọa độ: `x: 6%, y: 35%, w: 10%, h: 20%`.
- `hitbox-french-window`: Khung cửa sổ vòm nhìn ra phố (vị trí nhặt mảnh vẽ 4 & lối thoát ban công). Tọa độ: `x: 75%, y: 18%, w: 20%, h: 50%`.

### 1.3. Nhân vật xuất hiện
- Cụ Loan: Sprite nữ sinh mặc áo dài ngũ thân gọn gàng, tóc vấn nửa đầu uốn lọn mềm mại theo phong cách thiếu nữ Hà thành thập niên 1930.
- Ông Cả Nghị: Sprite thương gia mập mạp, mặc áo the đen, quần trắng, khoác áo gi-lê Tây, tay cầm gậy ba-toong bịt bạc.

### 1.4. Prompt tiếng Anh sinh hình ảnh pixel (Pixel Art Scene Generation)
```text
pixel art background, 320x240 resolution, interior of an attic artist studio in 1935 Hanoi French colonial era, wooden easel with fashion sketch of a modern Vietnamese dress, vintage French kerosene pressure lamp casting warm light, arched window overlooking colonial street with tramway, vintage books and sewing scissors on table, 16-bit retro style, detailed pixel textures
```

---

## 2. Phân cảnh `c2-s2-kho-vai-hang-dao` (Kho vải ngầm tiệm tơ lụa Hàng Đào)

### 2.1. Mô tả mỹ thuật cho họa sĩ pixel
- **Mặt phải (Thế giới thực):**
  - **Khung cảnh:** Gian kho ngầm kiên cố xây tường gạch dày kiểu thuộc địa, sàn lát gạch bông hoa văn cổ điển hình hoa cúc men xanh.
  - **Bố cục chính:**
    - Hai bên tường là các kệ gỗ lim đồ sộ chạm trần, xếp đầy hàng trăm cuộn lụa tơ tằm, gấm sa-tanh đủ sắc màu: màu hoa đào, xanh lục thủy, hoàng yến, điều đỏ.
    - Góc trái: Chiếc đồng hồ quả lắc kiểu Pháp bằng gỗ sồi cao hai mét, mặt số La Mã mạ vàng, quả lắc đồng đung đưa đều đặn.
    - Góc phải: Chiếc két sắt bọc thép cổ lỗ với tay vặn tròn bằng đồng thau nặng trịch.
  - **Bảng màu:** Đỏ đun quý phái (`#6E1A24`), xanh men gạch bông (`#2B5358`), vàng kim lụa gấm (`#D8A93E`), xám thép két sắt (`#4F5D65`).
- **Mặt trái (Cơ chế Lật Vải):**
  - Khung cảnh đổi sang màu chàm đen lạnh ngắt.
  - Tờ giao kèo hôn nhân ở mặt trái bốc khói đen mờ ảo; những sợi chỉ xám quấn quanh két sắt lộ rõ mối nối tới tờ biên lai thu tiền gốc bị che giấu.

### 2.2. Danh sách điểm chạm tương tác (Hitboxes)
- `hitbox-grandfather-clock`: Chiếc đồng hồ quả lắc cao 2m (vị trí lấy chìa khóa két sắt). Tọa độ: `x: 10%, y: 20%, w: 18%, h: 65%`.
- `hitbox-iron-safe`: Két sắt bọc thép của Cả Nghị (vị trí mở khóa lấy hồ sơ). Tọa độ: `x: 72%, y: 45%, w: 22%, h: 42%`.
- `hitbox-silk-shelves`: Các kệ vải lụa tơ tằm Hàng Đào (chạm xem các mẫu vải cao cấp). Tọa độ: `x: 34%, y: 15%, w: 34%, h: 45%`.

### 2.3. Danh mục vật phẩm (Items)
- `chia_khoa_ket_sat_bang_thau`: Chìa khóa két sắt giấu sau quả lắc đồng.
- `bien_lai_tra_no_goc_1935`: Chứng từ chứng minh cha cụ Loan đã hoàn tất nghĩa vụ nợ nần.
- `ban_giao_keo_ep_hon`: Tờ giấy giao kèo bất chính giữa Cả Nghị và quan Huyện.

### 2.4. Prompt tiếng Anh sinh hình ảnh pixel (Pixel Art Scene Generation)
- **Mặt phải:**
```text
pixel art background, 320x240 resolution, interior of a grand silk warehouse in 1935 Hanoi Hang Dao street, towering wooden shelves stacked with rolls of colorful luxurious silk and brocade fabrics, tall antique French grandfather clock on the left, heavy iron safe box on patterned tiled floor, rich vintage contrast, 16-bit retro aesthetic
```
- **Mặt trái:**
```text
pixel art background, 320x240 resolution, inverse spiritual fabric plane of a silk warehouse, cold dark indigo and charcoal woven threads, sinister shadowy aura hovering over the iron safe, glowing golden hidden receipt revealed beneath fraudulent paper, high contrast pixel art
```

---

## 3. Phân cảnh `c2-s3-phong-trien-lam-doi-dau` (Phòng triển lãm Báo Ngày Nay)

### 3.1. Mô tả mỹ thuật cho họa sĩ pixel
- **Mặt phải (Thế giới thực):**
  - **Khung cảnh:** Phòng khánh tiết triển lãm nghệ thuật phong cách Indochine tráng lệ trên phố Tràng Tiền. Quạt trần cánh gỗ quay chậm rãi, đèn chùm đồng tỏa ánh sáng lộng lẫy trên các bức tranh chân dung phụ nữ tân thời.
  - **Không khí đối đầu:** Giới trí thức áo ký giả, các nữ sinh áo dài tân thời cầm hoa, đám phóng viên cầm máy ảnh hộp cổ với đèn chớp ma-nhê sáng lóa.
  - **Sự xuất hiện của Thực thể Ông Lệ:** Từ trần nhà cao, làn sương xám hình cái bóng áo thụng rách quấn quanh cổ trần quạt và bao trùm lấy góc phòng, tiếng xì xào định kiến dội vang như tiếng sấm trong không gian kín.

### 3.2. Danh sách điểm chạm tương tác (Hitboxes)
- `hitbox-reporters-crowd`: Nhóm ký giả và quan Huyện (vị trí thả biên lai trả nợ để lật tẩy sự thật). Tọa độ: `x: 60%, y: 35%, w: 32%, h: 45%`.
- `hitbox-ong-le-shadow`: Thực thể bóng đen Ông Lệ trên trần triển lãm (vị trí giơ cao bản vẽ áo dài để hóa giải). Tọa độ: `x: 35%, y: 10%, w: 30%, h: 40%`.
- `hitbox-exhibition-podium`: Bục trưng bày áo dài nơi cụ Loan đứng tỏa sáng. Tọa độ: `x: 18%, y: 38%, w: 26%, h: 50%`.

### 3.3. Nhân vật xuất hiện
- Cụ Loan: Sprite lộng lẫy trong tà áo dài tân thời cổ đứng, không vai bồng vàng mỡ gà, cổ đeo chuỗi ngọc trai, thần thái tự tin kiêu hãnh.
- Thực thể Ông Lệ: Bóng đen tro tàn khổng lồ co rúm lại trước ánh đèn flash máy ảnh và sự thật.
- Ông Cả Nghị: Sprite ôm đầu lùi dần về góc cửa thoát hiểm.
- Quan khách và ký giả: Đám đông trí thức tiến bộ nhiệt liệt hoan hô.

### 3.4. Prompt tiếng Anh sinh hình ảnh pixel (Pixel Art Scene Generation)
```text
pixel art background, 320x240 resolution, elegant 1935 Indochine art exhibition hall in Hanoi Trang Tien street, high ceiling with vintage wooden ceiling fans, display mannequins wearing early modern Vietnamese Ao Dai dresses, crowd of intellectuals, journalists with vintage flash cameras, shadowy apparition dissipating into smoke under bright ceiling chandelier, dramatic historical climax, 16-bit pixel art
```
