File: docs/07-game/chapter-4/setup.md

# Thiết Lập Kỹ Thuật Và Mỹ Thuật: Chương 4 (Năm 1982)

Tài liệu này xác định chi tiết các thông số kỹ thuật, mô tả mỹ thuật pixel art cho từng phân cảnh, danh sách tọa độ điểm chạm (hitboxes) theo tỷ lệ phần trăm chính xác, danh mục nhân vật, vật phẩm và prompt tiếng Anh chuẩn hóa để tạo hình nền pixel cho Chương 4.

---

## 1. Phân cảnh `c4-s1-can-ho-tap-the` (Căn hộ tập thể dệt Nam Định)

### 1.1. Mô tả mỹ thuật cho họa sĩ pixel
- **Mặt phải (Thế giới thực):**
  - **Khung cảnh:** Căn hộ tập thể công nhân dệt điển hình thời bao cấp năm 1982. Tường quét vôi ve màu xanh ngọc nhạt loang lổ vết ố vàng theo năm tháng; sàn lát gạch men xi măng xám mộc mạc. Khung cửa sổ song sắt sơn xanh nhìn ra dãy nhà tập thể đối diện và ống khói nhà máy dệt nhả khói trắng vào bầu trời đông xám xịt.
  - **Bố cục chính:**
    - Bên trái: Chiếc bàn gỗ thô có chiếc bàn là than con gà bằng gang nặng trịch, dải vải phin trắng phẳng phiu, cuốn sổ mua lương thực bằng bìa các-tông và xấp tem phiếu vải.
    - Ở giữa: Chiếc quạt tai voi của Liên Xô màu xanh rêu trên đôn gỗ; chiếc đài cát-sét cũ kẹp băng từ bài hát nhạc đỏ.
    - Bên phải: Chiếc giường sắt đơn phủ chăn dùi con công đỏ rực rỡ; giỏ đan len mùa đông góc phòng.
  - **Bảng màu:** Xanh vôi ve loang lổ (`#6B8E83`), xám xi măng (`#757A79`), trắng ngà vải phin (`#F7F4EB`), đỏ chăn con công (`#B02A30`).
- **Mặt trái (Lật vải):**
  - Không gian chuyển sang màu chàm tro thô mộc buốt giá.
  - Dưới khe sàn gạch xi măng, phát ra tia sáng trắng bạc của chiếc kim thêu thép; trong giỏ len mùa đông phát ra luồng sáng hồng ấm áp của cuộn chỉ tơ đào.

### 1.2. Danh sách điểm chạm tương tác (Hitboxes)
- `hitbox-cassette-player`: Chiếc đài cát-sét cũ góc phòng (vị trí tháo cục nam châm nhỏ). Tọa độ: `x: 45%, y: 40%, w: 15%, h: 20%`.
- `hitbox-floor-crack`: Khe nứt sàn gạch xi măng (dùng nam châm hút kim thêu). Tọa độ: `x: 35%, y: 75%, w: 12%, h: 15%`.
- `hitbox-yarn-basket`: Giỏ đan len mùa đông góc phải (vị trí gỡ cuộn chỉ tơ hồng). Tọa độ: `x: 78%, y: 62%, w: 16%, h: 25%`.
- `hitbox-phin-fabric`: Tấm vải phin trắng trên bàn (vị trí thực hiện mini-game thêu hoa đào). Tọa độ: `x: 12%, y: 50%, w: 26%, h: 32%`.

### 1.3. Nhân vật xuất hiện
- Cô Phương: Sprite nữ công nhân trẻ trung mặc áo sơ mi kẻ ca-rô cổ sen thời bao cấp, tóc cặp ba lá sau gáy, ánh mắt trong sáng kiên cường.
- Chú Sửu: Sprite người đàn ông trung niên mặc áo đại cán xám, đeo kính gọng đồi mồi, dáng điệu hách dịch.

### 1.4. Prompt tiếng Anh sinh hình ảnh pixel (Pixel Art Scene Generation)
```text
pixel art background, 320x240 resolution, interior of a modest 1982 subsidized apartment in Nam Dinh textile city, pale distressed green lime-washed walls, cement floor, Soviet desk fan and vintage cassette player, rustic wooden table with vintage heavy charcoal iron and white cotton fabric, iron bed with iconic red peacock blanket, window showing industrial factory smokestacks in cold winter mist, 16-bit retro style, detailed nostalgic atmosphere
```

---

## 2. Phân cảnh `c4-s2-tu-duong-ho-nguyen` (Gian nhà từ đường họ Nguyễn)

### 2.1. Mô tả mỹ thuật cho họa sĩ pixel
- **Mặt phải (Thế giới thực):**
  - **Khung cảnh:** Gian nhà gỗ cổ năm gian của dòng họ Nguyễn ngoại thành Nam Định. Mái ngói vảy cá bám rêu phong, trên xà nóc có khắc chữ Hán niên đại dựng nhà **"Ất Tỵ niên chế - 1845"**.
  - **Bố cục chính:**
    - Trung tâm: Bàn thờ tổ gỗ mít thếp bạc cổ kính, lư đồng hun xỉn màu khói bụi thời gian.
    - Trên sập gụ gỗ gụ bóng loáng: Chiếc tráp gỗ sơn son chạm rồng chầu mặt nguyệt, có ổ khóa 4 vòng số đồng thau.
  - **Bảng màu:** Nâu gỗ mít cổ (`#4E3629`), đỏ điều phai màu (`#782823`), xám tro của xà nhà (`#524E4D`).
- **Mặt trái (Cơ chế Lật Vải):**
  - Cảnh vật đổi sang màu chàm đen lạnh ngắt.
  - Dưới chân sập gụ ở mặt trái, những sợi chỉ đen định kiến quấn chặt lấy các trang gia phả bị xé giấu trong hốc mộng gỗ; các nét chữ Nôm ghi công đức người phụ nữ phát ra ánh sáng vàng rực rỡ.

### 2.2. Danh sách điểm chạm tương tác (Hitboxes)
- `hitbox-roof-beam`: Xà nóc nhà từ đường (vị trí gợi ý mã số năm 1845). Tọa độ: `x: 20%, y: 8%, w: 60%, h: 15%`.
- `hitbox-pedestal-chest`: Chiếc tráp gỗ sơn son trên sập gụ (vị trí nhập mã số 1845 mở khóa). Tọa độ: `x: 42%, y: 45%, w: 22%, h: 25%`.
- `hitbox-altar-incense`: Lư hương đồng trên bàn thờ tổ. Tọa độ: `x: 46%, y: 28%, w: 8%, h: 12%`.

### 2.3. Danh mục vật phẩm (Items)
- `cac_trang_gia_pha_goc_bi_xe`: Các trang giấy dó chữ Nôm ghi chép công đức cứu đói dòng họ năm 1945 của bà Mai.

### 2.4. Prompt tiếng Anh sinh hình ảnh pixel (Pixel Art Scene Generation)
- **Mặt phải:**
```text
pixel art background, 320x240 resolution, interior of an ancient northern Vietnamese ancestral lineage hall in 1982, antique wooden beam with engraved Chinese characters, dark wood platform bed with a red lacquer locked family tree chest, ancestral altar with incense burners, cold winter daylight filtering through wooden doors, nostalgic 16-bit retro aesthetic
```
- **Mặt trái:**
```text
pixel art background, 320x240 resolution, inverse spiritual fabric plane of an ancestral hall, cold dark indigo woven texture, glowing gray curse threads binding hidden torn ancient genealogical papers under the wooden platform, golden glowing historical text, high contrast pixel art
```

---

## 3. Phân cảnh `c4-s3-san-tu-duong-doi-dau` (Sân nhà từ đường họ Nguyễn)

### 3.1. Mô tả mỹ thuật cho họa sĩ pixel
- **Mặt phải (Thế giới thực):**
  - **Khung cảnh:** Sân gạch nung rộng lớn rợp bóng vườn nhãn cổ thụ trơ trụi lá mùa đông. Bậc thềm đá hoa cương dẫn lên gian từ đường chính.
  - **Không khí đối đầu:** Các bô lão trong họ áo dài the xám, thanh niên công nhân áo khoác dù xanh bộ đội đứng vòng cung; Chú Sửu đứng trên bậc thềm đá cầm bản hương ước lộng hành.
  - **Sự xuất hiện của Thực thể Ông Lệ:** Cơn lốc tro bụi bốc lên từ kẽ đá thềm từ đường, định hình thành một bóng đen khổng lồ chống gậy trúc, mắt rực lửa tro tàn, tiếng gầm gừ gia trưởng đè nặng không gian.

### 3.2. Danh sách điểm chạm tương tác (Hitboxes)
- `hitbox-ong-le-patriarch`: Thực thể bóng ma gia trưởng Ông Lệ (vị trí kéo trang gia phả và áo cưới vào để hóa giải). Tọa độ: `x: 36%, y: 25%, w: 26%, h: 55%`.
- `hitbox-uncle-suu`: Chú Sửu trên bậc thềm đá. Tọa độ: `x: 68%, y: 32%, w: 20%, h: 38%`.
- `hitbox-ancestral-stone-step`: Thềm đá từ đường nơi cô Phương bước lên đối chất. Tọa độ: `x: 18%, y: 55%, w: 22%, h: 30%`.

### 3.3. Nhân vật xuất hiện
- Cô Phương: Sprite áo dài cưới vải phin trắng thêu cành hoa đào, ngực áo cài kim thêu đồng, ánh mắt sáng ngời chính nghĩa.
- Thực thể Ông Lệ: Bóng ma xám tro rách rưới tan thành khói bụi trước lẽ phải.
- Chú Sửu: Sprite hoảng hốt buông rơi tập giấy, mặt tái mét.
- Dân họ và các bô lão: Sprite gật đầu đồng tình, vỗ tay ủng hộ người phụ nữ.

### 3.4. Prompt tiếng Anh sinh hình ảnh pixel (Pixel Art Scene Generation)
```text
pixel art background, 320x240 resolution, large brick courtyard outside an ancient Vietnamese clan temple in cold winter 1982, bare longan trees, crowd of village elders and youth in retro 1980s jackets and traditional coats, a terrifying smoky shadowy giant apparition made of ash and soot dissipating into the winter sky, dramatic cinematic historical resolution, 16-bit pixel aesthetic
```
