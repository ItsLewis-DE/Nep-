# Thiết Lập Kỹ Thuật Và Mỹ Thuật: Chương 1 (Năm 1888)

Tài liệu này xác định chi tiết các thông số kỹ thuật, mô tả mỹ thuật pixel art cho từng phân cảnh (cả mặt phải thế giới thực và mặt trái lật vải), danh sách tọa độ điểm chạm (hitboxes) theo tỷ lệ phần trăm chính xác, hành vi tương tác âm thanh, danh mục nhân vật, vật phẩm và prompt tiếng Anh chuẩn hóa để tạo hình nền pixel cho Chương 1.

---

## 1. Phân cảnh `c1-s1-buong-det-khoa-kin` (Gian buồng dệt khóa then)

### 1.1. Mô tả mỹ thuật cho họa sĩ pixel
- **Mặt phải (Thế giới thực):**
  - **Khung cảnh:** Gian buồng hẹp vách đất trát rơm nứt nẻ, sàn đất nện màu nâu sẫm. Mái ngói đất nung cũ phủ rêu xanh rì rào trong gió đông buốt giá.
  - **Ánh sáng:** Luồng sáng le lói hình dải quạt rọi qua khe cửa chớp phía sau, chiếu rõ những hạt bụi tơ tằm lơ lửng. Ngọn đèn dầu hỏa nhỏ trên đôn gỗ tỏa quầng sáng vàng hiu hắt.
  - **Bố cục chính:**
    - Bên trái chiếm 40% diện tích: Khung cửi dệt lụa cổ bằng gỗ lim đen bóng mài mòn theo năm tháng, trên giàn go là dải lụa tơ tằm màu củ nâu dệt dở dài buông thõng xuống rổ mây.
    - Ở giữa: Chiếc chõng tre nhỏ trải chiếu cói rách mép, một bát gốm hoa lam đựng cháo hoa nguội ngắt và ngọn đèn dầu.
    - Phía sau: Khung cửa chớp gỗ hai cánh cài then ngang bằng gỗ mỏng ở bên ngoài.
    - Bên phải: Vại sành da lươn đựng nước ngâm củ nâu và một giá nứa phơi dải thắt lưng vải chàm.
  - **Bảng màu:** Tông nâu đất sẫm (`#3B2219`), nâu sồng đũi tơ (`#5C3A28`), vàng khói đèn dầu (`#C99A45`), xám bùn nứt nẻ (`#6E655F`).
- **Mặt trái (Cơ chế Lật Vải):**
  - Khung cảnh chuyển sang chất liệu dệt thô mộc tông xanh chàm tro lạnh ngắt (`#1A2530`).
  - Trên then cài cửa sổ sau, hiện lên hình ảnh một bàn tay khô đét xám xịt bằng sợi chỉ tro (biểu trưng cho sự giam hãm của tục lệ) đang đè chặt lên thanh then gỗ.
  - Mũi con thoi gỗ trên khung cửi phát ra ánh sáng vàng kim (`#F2C94C`) báo hiệu đây là công cụ phá vỡ thế giam hãm.

### 1.2. Danh sách điểm chạm tương tác (Hitboxes)
- `hitbox-loom-shuttle`: Con thoi gỗ mun trên giàn khung cửi dệt lụa. Tọa độ: `x: 12%, y: 45%, w: 22%, h: 28%`.  
  *Phản hồi khi chạm:* Cụ Cầm lấy ra chiếc con thoi gỗ mun mũi bọc sừng trâu nhọn hoắt.
- `hitbox-back-window`: Khung cửa chớp gỗ phía sau buồng dệt. Tọa độ: `x: 50%, y: 18%, w: 22%, h: 32%`.  
  *Phản hồi khi chạm:* Cụ Cầm quan sát: "Cửa chớp cài then gỗ bên ngoài, khe hở vừa đủ luồn một vật mỏng cong như lưỡi câu qua."
- `hitbox-belt-rack`: Giá nứa treo dải thắt lưng vải chàm góc phải. Tọa độ: `x: 82%, y: 52%, w: 12%, h: 35%`.  
  *Phản hồi khi chạm:* Nhặt dải thắt lưng lụa chàm bện sợi tơ se đôi cực dai.
- `hitbox-cold-porridge`: Bát cháo hoa nguội ngắt trên chõng tre. Tọa độ: `x: 44%, y: 62%, w: 10%, h: 12%`.  
  *Phản hồi khi chạm:* Lời thoại suy tư: "Cháo đã váng mặt từ sáng. Nuốt nghẹn đắng họng làm sao trôi."
- `hitbox-front-door`: Cửa chính đằng trước bị xích sắt khóa chặt. Tọa độ: `x: 2%, y: 25%, w: 10%, h: 60%`.  
  *Phản hồi khi chạm:* Âm thanh xích sắt rung loảng xoảng: "Khóa ngoài kiên cố, không thể phá được từ bên trong."

### 1.3. Nhân vật xuất hiện
- Cụ Cầm: Sprite ngồi dệt vải hoặc đứng di chuyển (64×96 px), mặc áo cánh nâu sồng, váy đũi đen, yếm chàm cũ.
- Bóng Trưởng tộc: Bóng đổ in mờ qua khe vách cửa trước kèm âm thanh gậy chống cồm cộp.

### 1.4. Prompt tiếng Anh sinh hình ảnh pixel (Pixel Art Scene Generation)
```text
pixel art background, 320x240 resolution, interior of a somber rustic 19th-century Vietnamese silk weaver's room in 1888, earthen walls with straw texture, large antique wooden handloom on the left with unfinished raw brown silk, dim warm oil lamp on small bamboo table, wooden barred shutter window at the back with narrow beam of winter sunlight, clay water jar on the right, traditional Tonkin rural aesthetic, 16-bit pixel art, sharp outlines, atmospheric lighting
```

---

## 2. Phân cảnh `c1-s2-ban-tho-nha-tho-ho` (Gian nhà thờ họ Bùi)

### 2.1. Mô tả mỹ thuật cho họa sĩ pixel
- **Mặt phải (Thế giới thực):**
  - **Khung cảnh:** Gian chính giữa nhà thờ họ ba gian uy nghiêm, mái lợp ngói mũi hài đóng rêu, bốn cột cái bằng gỗ lim to ôm không xuể. Khói trầm hương nghi ngút lượn quanh các hoành phi câu đối chữ Hán thếp vàng rực rỡ.
  - **Bố cục chính:**
    - Trung tâm: Bàn thờ tổ nhiều tầng sơn son thếp vàng tráng lệ, tầng trên bày các bài vị tổ tiên bằng gỗ thị khắc chữ Nho, tầng dưới có đỉnh trầm bằng đồng hun hình kỳ lân nhả khói.
    - Bên phải cột cái: Tấm biển gỗ lớn mới tinh sơn son chói lọi, khắc bốn chữ Hán lớn dát vàng **"節行可風"** (Tiết Hạnh Khả Phong), viền khắc hình chim phượng vờn mây tinh xảo.
    - Bên trái: Chiếc sập gụ khảm ốc xà cừ nơi các chức dịch ngồi bàn việc họ.
  - **Bảng màu:** Đỏ son trầm (`#8A2218`), vàng thếp cổ kính (`#C49A45`), đen tuyền gỗ mun bóng (`#1C1614`), nâu khói trầm (`#543D2B`).
- **Mặt trái (Cơ chế Lật Vải - Nơi diễn ra màn giải đố then chốt):**
  - Toàn bộ gian nhà thờ họ đổi sang tông màu xám tro lạnh buốt rợn ngợp (`#1A2530`).
  - Tấm biển son thếp vàng nứt đôi dọc từ trên xuống dưới, để lộ tờ văn tự bán đất làng có chữ ký và điểm chỉ ngón tay đỏ lòm của Trưởng tộc Bùi Văn Thân.
  - Dưới chân bài vị tổ, rễ của những sợi chỉ xám ràng buộc cắm sâu vào sàn gạch, quấn chặt lấy một chiếc hộp gỗ trắc nhỏ xíu giấu kín trong hốc mộng cột gỗ. Ba điểm nút thắt phát ra ánh sáng tím mờ đục.

### 2.2. Danh sách điểm chạm tương tác (Hitboxes)
- `hitbox-ancestor-altar`: Bàn thờ tổ chính giữa (vị trí chiếc hộp gỗ giấu thư ở mặt trái). Tọa độ: `x: 32%, y: 22%, w: 36%, h: 48%`.  
  *Phản hồi:* Ở mặt phải bàn thờ khóa kín; ở mặt trái hiển thị chùm chỉ xám để dùng kéo cắt.
- `hitbox-honor-plaque`: Tấm biển "Tiết Hạnh Khả Phong" tựa bên cột cái. Tọa độ: `x: 72%, y: 35%, w: 20%, h: 48%`.  
  *Phản hồi:* Cụ Cầm nhìn tấm biển: "Sơn còn thơm mùi nhựa thông... Nhưng chữ vàng này tẩm bằng nước mắt người góa phụ."
- `hitbox-incense-burner`: Lư hương đồng hình kỳ lân nhả khói. Tọa độ: `x: 46%, y: 44%, w: 8%, h: 12%`.  
  *Phản hồi:* Khói trầm nồng nặc làm cay xè sống mũi.

### 2.3. Nhân vật xuất hiện
- Cụ Cầm: Sprite bước rón rén nép sau hàng rèm điều, cử chỉ cẩn trọng.

### 2.4. Danh mục vật phẩm (Items)
- `buc_thu_tay_chong_cu_Cam`: Bức thư tay mực Nho ố vàng trên giấy dó của người chồng dặn vợ sống tự do.
- `to_van_tu_cam_co_dat`: Bằng chứng Trưởng tộc đem gán ruộng góa phụ lấy tiền trả nợ đánh bạc.

### 2.5. Prompt tiếng Anh sinh hình ảnh pixel (Pixel Art Scene Generation)
- **Mặt phải (Normal View):**
```text
pixel art background, 320x240 resolution, interior of a grand solemn 19th-century Vietnamese ancestral clan hall in 1888, red lacquer and gold gilded altar loaded with ancestral spirit tablets, heavy carved wooden columns, a large newly painted vermilion and gold commemorative wooden plaque leaning against a pillar, swirling incense smoke, dramatic contrast, 16-bit retro visual
```
- **Mặt trái (Fabric Flip View):**
```text
pixel art background, 320x240 resolution, inverse spiritual fabric plane of an ancestral hall, dark indigo and cold ash gray woven texture, eerie glowing gray curse threads wrapping tightly around a hidden small wooden box concealed in a hollow pillar base, cracked wooden plaque revealing a hidden contract, high contrast, clean pixel lines
```

---

## 3. Phân cảnh `c1-s3-cong-dinh-doi-dau` (Cổng đình làng Vạn Phúc)

### 3.1. Mô tả mỹ thuật cho họa sĩ pixel
- **Mặt phải (Thế giới thực):**
  - **Khung cảnh:** Sân đình làng Vạn Phúc lát gạch nghiêng rêu phong, cây đa cổ thụ trăm năm xòe tán rợp mát góc trái, rễ cây buông dài như những sợi dây thừng khổng lồ. Phía xa là cổng tam quan đình làng bằng gạch nung rêu phong dẫn ra đường cái.
  - **Không khí lễ hội giả tạo:** Cờ ngũ sắc cắm dọc theo bậc thềm đình, dân làng trong trang phục tứ thân, ngũ thân đủ màu sắc tụ tập thành vòng tròn quanh sân đình.
  - **Sự xuất hiện của Thực thể Ông Lệ:** Giữa sân đình, một luồng khói xám tro dày đặc bốc lên cuồn cuộn từ kẽ gạch, định hình thành một bóng đen khổng lồ khoác áo thụng rách sờn, không có mặt mũi, hai mắt là hai hố sâu đen ngòm đang trừng trừng nhìn cụ Cầm.
- **Mặt trái (Cơ chế Lật Vải):**
  - Toàn bộ sân đình chuyển sang màu vải thô chàm xám.
  - Hiển thị rõ vô số sợi chỉ xám nối từ miệng và ngực của dân làng vào thân thể Ông Lệ, chứng minh rằng sự im lặng và thành kiến của số đông chính là thức ăn nuôi dưỡng thực thể này.

### 3.2. Danh sách điểm chạm tương tác (Hitboxes)
- `hitbox-ong-le-entity`: Thực thể bóng đen Ông Lệ giữa sân đình (vị trí kéo vật phẩm thư tay vào). Tọa độ: `x: 38%, y: 30%, w: 24%, h: 50%`.
- `hitbox-village-officials`: Trưởng tộc Bùi Văn Thân và Lý trưởng trên thềm đình (vị trí kéo văn tự bán đất vào). Tọa độ: `x: 68%, y: 26%, w: 24%, h: 38%`.
- `hitbox-stone-step`: Thềm đá đình làng nơi cụ Cầm đứng gõ thước gỗ chia khắc tuyên bố giải phóng nếp áo. Tọa độ: `x: 20%, y: 55%, w: 20%, h: 30%`.
- `hitbox-village-gate-exit`: Vòm cổng đình làng cổ rợp nắng (lối bước sang tương lai sau khi chiến thắng). Tọa độ: `x: 4%, y: 20%, w: 18%, h: 55%`.

### 3.3. Nhân vật xuất hiện
- Cụ Cầm: Sprite hiên ngang, hai tay giơ cao bằng chứng, ánh mắt bừng sáng tự do.
- Thực thể Ông Lệ: Sprite bóng đen cao lớn (96×128 px), tà áo thụng rách bay ma mị trong gió bụi.
- Trưởng tộc và Lý trưởng: Sprite chức sắc hoảng hốt, mặt cắt không còn giọt máu.
- Đám đông dân làng: Các nhóm sprite phụ thể hiện biểu cảm ngạc nhiên rồi chuyển sang phẫn nộ trước sự thật bị phơi bày.

### 3.4. Prompt tiếng Anh sinh hình ảnh pixel (Pixel Art Scene Generation)
```text
pixel art background, 320x240 resolution, grand communal courtyard of an ancient 19th-century Vietnamese village in 1888, mossy brick ground, giant banyan tree with hanging aerial roots, traditional village temple gate in the distance, festive five-color flags fluttering in cold winter wind, gathering villagers in traditional clothing, a towering mythical shadowy apparition made of gray smoke standing in the center, dramatic cinematic 16-bit pixel aesthetic
```
