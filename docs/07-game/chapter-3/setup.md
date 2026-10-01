# Thiết Lập Kỹ Thuật Và Mỹ Thuật: Chương 3 (Năm 1962)

Tài liệu này xác định chi tiết các thông số kỹ thuật, mô tả mỹ thuật pixel art cho từng phân cảnh, danh sách tọa độ điểm chạm (hitboxes) theo tỷ lệ phần trăm chính xác, danh mục nhân vật, vật phẩm và prompt tiếng Anh chuẩn hóa để tạo hình nền pixel cho Chương 3.

---

## 1. Phân cảnh `c3-s1-tiem-may-da-kao` (Tiệm may Mai Sài Gòn tại Đa Kao)

### 1.1. Mô tả mỹ thuật cho họa sĩ pixel
- **Mặt phải (Thế giới thực):**
  - **Khung cảnh:** Tiệm may mặt tiền đường phố Sài Gòn tràn ngập ánh nắng nhiệt đới năm 1962. Tường vôi vàng tươi, sàn lát gạch bông men gốm hoa văn lục lăng rực rỡ. Cửa kính lớn nhìn ra hàng cây dầu cổ thụ và chiếc xe Vespa cổ dựng bên vỉa hè.
  - **Bố cục chính:**
    - Bên trái: Bàn cắt may bằng gỗ gõ đỏ phủ vải lụa hoa nhí rực rỡ; chiếc máy khâu con bướm đạp chân mạ crôm sáng bóng.
    - Ở giữa: Hai ma-nơ-canh gỗ thon thả mặc áo dài raglan hoa nhí và áo dài cổ thuyền màu xanh ngọc bích.
    - Bên phải: Chiếc máy hát đĩa than cổ đang chạy đĩa nhựa; chậu cây mai chiếu thủy xanh ngát đặt cạnh bậc tam cấp cửa tiệm.
  - **Bảng màu:** Vàng nắng Sài Gòn (`#F9D342`), xanh ngọc bích lụa (`#1B9AAA`), đỏ gạch bông cổ điển (`#A43820`), đen bóng crôm máy khâu (`#222629`).
- **Mặt trái (Lật vải):**
  - Khung cảnh chuyển sang màu chàm đen tro tàn.
  - Dưới sàn gạch bông, các luồng khói đen mờ hình chữ Bùa tỏa ra từ chân bàn máy khâu và chậu cây cảnh, chỉ rõ các điểm bị gài bùa ngải lừa đảo.

### 1.2. Danh sách điểm chạm tương tác (Hitboxes)
- `hitbox-bonsai-pot`: Chậu mai chiếu thủy trước hiên (vị trí bới đất lấy lọ bùa 1). Tọa độ: `x: 82%, y: 65%, w: 14%, h: 25%`.
- `hitbox-sewing-machine-base`: Góc chân máy khâu con bướm (vị trí cạy viên gạch lỏng lấy bùa 2). Tọa độ: `x: 22%, y: 55%, w: 18%, h: 35%`.
- `hitbox-fabric-attic`: Gác lửng phơi vải phía trên bàn cắt (vị trí lấy biên nhận tiền). Tọa độ: `x: 10%, y: 15%, w: 25%, h: 22%`.
- `hitbox-gramophone`: Máy hát đĩa than (chạm nghe giai điệu nhạc xưa). Tọa độ: `x: 74%, y: 35%, w: 12%, h: 18%`.

### 1.3. Nhân vật xuất hiện
- Bà Mai: Sprite thợ may trẻ trung, mặc áo dài raglan ôm sát tôn dáng, tóc uốn bồng phi dê thời thượng Sài Gòn thập niên 1960.
- Bà Lớn Hội đồng Vĩnh: Sprite người phụ nữ đài các, đeo vòng ngọc cẩm thạch to bản, tay phe phẩy quạt ren.
- Thầy Ba Càn: Sprite thầy địa lý mặc áo dài the xám, tay cầm la bàn bát quái, mắt ti hí.

### 1.4. Prompt tiếng Anh sinh hình ảnh pixel (Pixel Art Scene Generation)
```text
pixel art background, 320x240 resolution, interior of a stylish 1962 Saigon tailoring shop in Da Kao district, vintage tropical yellow walls, colorful encaustic patterned cement floor tiles, mannequins wearing colorful raglan sleeve Vietnamese Ao Dai dresses, antique Singer pedal sewing machine on the left, retro gramophone, sunlight streaming through glass shopfront onto green bonsai tree, 16-bit color, vibrant nostalgic atmosphere
```

---

## 2. Phân cảnh `c3-s2-phong-phong-thuy` (Gian phòng phong thủy Thầy Ba Càn)

### 2.1. Mô tả mỹ thuật cho họa sĩ pixel
- **Mặt phải (Thế giới thực):**
  - **Khung cảnh:** Gian phòng thờ cúng âm u trong con hẻm Tân Định, ngập mùi khói nhang thảo mộc thuốc bắc mờ mịt.
  - **Bố cục chính:**
    - Trung tâm: Bàn thờ phong thủy treo đầy la bàn đồng, gương bát quái, bùa chú chữ son dán kín vách ván ép.
    - Trên bàn: Chiếc tráp gỗ bát giác khóa bằng ổ khóa đồng bát quái xoay tròn; các chồng sách bói toán tử vi đóng gáy cổ.
    - Bên trái: Lư hương đồng tỏa khói xanh mờ ảo.
  - **Bảng màu:** Nâu khói thuốc bắc (`#362B28`), đỏ chu sa bùa chú (`#9C271D`), vàng đồng thau xỉn màu (`#B5904B`).
- **Mặt trái (Cơ chế Lật Vải):**
  - Khung cảnh chuyển sang màu chàm tro lạnh ngắt rợn người.
  - Trên mặt trang giấy cuốn sổ tử vi ở mặt trái, hiện rõ luồng chỉ xám của Ông Lệ đang trói buộc chữ "Dần" đè lên chữ "Thìn" gốc để ngụy tạo điềm gở.

### 2.2. Danh sách điểm chạm tương tác (Hitboxes)
- `hitbox-bagua-chest`: Chiếc tráp gỗ bát giác khóa xoay (vị trí câu đố mở khóa Càn - Tốn). Tọa độ: `x: 42%, y: 40%, w: 20%, h: 25%`.
- `hitbox-bagua-mirror`: Gương bát quái treo trên tường (vị trí gợi ý 8 quẻ phong thủy). Tọa độ: `x: 46%, y: 15%, w: 12%, h: 18%`.
- `hitbox-incense-bowl`: Lư hương đồng nhả khói xanh. Tọa độ: `x: 28%, y: 48%, w: 10%, h: 15%`.

### 2.3. Danh mục vật phẩm (Items)
- `so_tu_vi_nguyen_ban_1962`: Sổ tử vi gốc ghi đúng ngày giờ sinh đại cát của Vinh.
- `thu_tay_thoa_thuan_boi_toan`: Thư tay bà Hội đồng ra giá thuê bói quẻ lừa đảo.

### 2.4. Prompt tiếng Anh sinh hình ảnh pixel (Pixel Art Scene Generation)
- **Mặt phải:**
```text
pixel art background, 320x240 resolution, interior of a mysterious 1962 Feng Shui fortune teller chamber in Saigon, dark wooden walls covered with Bagua mirrors, Taoist paper talismans and bronze compasses, ornate octagonal locked wooden box on the desk, dense incense smoke swirling, moody candlelit illumination, 16-bit retro style
```
- **Mặt trái:**
```text
pixel art background, 320x240 resolution, inverse spiritual fabric plane of a fortune teller room, cold dark indigo woven texture, glowing gray curse threads tangling over an open astrological chart book, glowing altered characters revealed under magical scissors, high contrast pixel art
```

---

## 3. Phân cảnh `c3-s3-dinh-thu-doi-dau` (Dinh thự Hội đồng Vĩnh)

### 3.1. Mô tả mỹ thuật cho họa sĩ pixel
- **Mặt phải (Thế giới thực):**
  - **Khung cảnh:** Phòng khách dinh thự tư sản bề thế Sài Gòn thập niên 1960. Trần nhà cao gắn đèn chùm pha lê kiểu Pháp lộng lẫy, bộ salon cẩm lai chạm trổ tinh xảo, rèm nhung đỏ buông rủ sang trọng.
  - **Không khí đối đầu:** Bàn tiệc rượu ly pha lê, quan khách thượng lưu đầm dạ hội và complet sang trọng; chiếc xe ngựa đón dâu đậu mờ ảo ngoài sân sau qua khung cửa chớp mở hé.
  - **Sự xuất hiện của Thực thể Ông Lệ:** Làn sương xám khổng lồ từ góc trần đèn chùm tràn xuống, quấn lấy hình bóng bà Hội đồng và thầy bói như một cái bóng ô dù che chở cho lề thói cổ hủ.

### 3.2. Danh sách điểm chạm tương tác (Hitboxes)
- `hitbox-salon-table`: Bàn salon cẩm lai tiếp khách (vị trí thả bằng chứng vạch trần âm mưu). Tọa độ: `x: 32%, y: 55%, w: 36%, h: 30%`.
- `hitbox-ong-le-crystal`: Bóng đen Ông Lệ bám trên đèn chùm pha lê (vị trí bà Mai tuyên bố tự chủ để hóa giải). Tọa độ: `x: 40%, y: 8%, w: 25%, h: 35%`.
- `hitbox-vinh-support`: Chàng thanh niên Vinh (bước sang đứng cạnh bảo vệ bà Mai). Tọa độ: `x: 18%, y: 40%, w: 16%, h: 45%`.

### 3.3. Nhân vật xuất hiện
- Bà Mai: Sprite áo dài cổ thuyền xanh ngọc bích, phong thái đoan trang, kiêu hãnh.
- Vinh: Sprite chàng trai trẻ sơ mi trắng đứng thẳng lưng bên người yêu.
- Thực thể Ông Lệ: Bóng đen gãy vụn dưới ánh pha lê rực rỡ và tiếng nói công lý.
- Bà Hội đồng và thầy bói: Sprite run rẩy khi bị khách khứa vạch mặt.

### 3.4. Prompt tiếng Anh sinh hình ảnh pixel (Pixel Art Scene Generation)
```text
pixel art background, 320x240 resolution, opulent living room of a 1962 wealthy French colonial villa in Saigon, grand sparkling crystal chandelier on high ceiling, carved rosewood sofa set with champagne glasses on table, velvet drapes, shadowy smoke apparition dissipating above the chandelier as truth is spoken, dramatic cinematic historical climax, 16-bit pixel aesthetic
```
