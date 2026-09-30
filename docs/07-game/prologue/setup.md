File: docs/07-game/prologue/setup.md

# Thiết Lập Kỹ Thuật Và Mỹ Thuật: Màn Mở Đầu (Prologue)

Tài liệu này xác định thông số kỹ thuật, mô tả mỹ thuật pixel art cho từng phân cảnh, danh sách tọa độ điểm chạm (hitboxes) theo tỷ lệ phần trăm, danh mục nhân vật và prompt tiếng Anh chuẩn hóa để tạo hình ảnh nền cho Màn Mở Đầu.

---

## 1. Phân cảnh `c0-s1-tiem-may-chieu` (Sảnh chính Tiệm May Nếp)

### 1.1. Mô tả mỹ thuật cho họa sĩ pixel
- **Mặt phải (Thế giới thực):**
  - Góc nhìn chính diện nhìn vào sảnh tiệm may cổ kính ở tầng một.
  - Ánh nắng chiều xiên góc 45 độ qua cửa kính phố cổ rọi lên sàn gạch hoa cũ.
  - Ở giữa phòng là chiếc bàn cắt vải lớn bằng gỗ sẫm màu, trên bàn có cuộn vải lụa trắng trơn mở dở, phấn may và kéo cắt vải.
  - Phía bên phải là cầu thang gỗ lim dẫn lên gác xép, bậc thang gỗ mòn nhẵn thời gian.
  - Phía bên trái là tấm gương soi viền gỗ lớn phản chiếu bóng nhân vật.
  - Bảng màu: Nền ấm áp tông giấy dó (`#F5EFEB`), màu gỗ sẫm (`#3D261A`), ánh nắng vàng hoàng thổ (`#CFA449`).
- **Mặt trái (Lật vải):** Chưa kích hoạt ở cảnh này (người chơi chỉ kích hoạt cơ chế ở cảnh gác xép).

### 1.2. Danh sách điểm chạm tương tác (Hitboxes)
- `hitbox-cat`: Chú mèo Nếp ở chân cầu thang. Tọa độ: `x: 72%, y: 68%, w: 14%, h: 18%`.
- `hitbox-stairs`: Lối cầu thang gỗ lim lên gác xép. Tọa độ: `x: 75%, y: 20%, w: 22%, h: 55%`.
- `hitbox-table`: Bàn cắt vải giữa phòng (xem gợi ý phấn may). Tọa độ: `x: 28%, y: 55%, w: 40%, h: 32%`.
- `hitbox-mirror`: Gương lớn bên trái (soi diện mạo nhân vật). Tọa độ: `x: 6%, y: 30%, w: 18%, h: 52%`.

### 1.3. Nhân vật xuất hiện
- An: Sprite nhân vật đứng thẳng (64×96 px), mặc áo dài trắng trơn học sinh thanh lịch.
- Mèo Nếp: Sprite mèo mướp vàng (32×32 px), hoạt ảnh ngủ rồi đứng dậy đi vòng tròn.

### 1.4. Prompt tiếng Anh sinh hình ảnh pixel (Pixel Art Scene Generation)
```text
pixel art background, 320x240 resolution, interior of a cozy vintage Vietnamese tailor shop in 2026 autumn afternoon, warm sunlight streaming through wooden french window, antique cutting wooden table with silk fabric and sewing tools, retro tiled floor, wooden staircase leading up to attic on the right side, nostalgic Hanoi old quarter atmosphere, 16-bit color palette, clean outlines, no blur
```

---

## 2. Phân cảnh `c0-s2-gac-xep-chiec-ruong` (Căn gác xép và chiếc rương cũ)

### 2.1. Mô tả mỹ thuật cho họa sĩ pixel
- **Mặt phải (Thế giới thực):**
  - Căn gác xép mái dốc áp mái ngói đất nung, ánh sáng chiếu lọt qua khe ngói mắt rồng tạo những dải bụi vàng lơ lửng.
  - Ở trung tâm là chiếc rương gỗ lim bọc đồng viền chạm khắc hoa cúc sắc sảo, trên nắp rương phủ một tấm vải bố thô xơ ố vàng.
  - Phía vách gỗ bên trái có một móc treo bằng đồng, treo một chiếc chìa khóa đồng cổ có tua rua chỉ đỏ đã sờn.
  - Góc phải là chiếc ghế đẩu nhỏ, chồng sách báo cũ thập niên 1980 và khung thêu tròn dang dở.
  - Bảng màu: Tông màu gỗ lim tối (`#2E1C12`), ánh sáng vàng ấm (`#E5B869`), vải bố thô (`#B8A686`).
- **Mặt trái (Kích hoạt cơ chế Lật vải):**
  - Toàn bộ khung cảnh đổi sang tông màu sợi dệt thô mộc xám chàm (`#1E2A38` và `#4A4A4A`).
  - Nắp chiếc rương bọc đồng hiện lên những đường chỉ thêu kim tuyến phát sáng màu vàng rực (`#F2C94C`), phác họa lời dặn dò của người bà.
  - Ở góc phòng phía sau rương, một cái bóng đen mờ đục rách rưới (bóng mờ Ông Lệ) hiện thoáng qua rồi tan biến.

### 2.2. Danh sách điểm chạm tương tác (Hitboxes)
- `hitbox-chest-cloth`: Tấm vải bố phủ trên nắp rương. Tọa độ: `x: 34%, y: 48%, w: 32%, h: 26%`.
- `hitbox-chest-lock`: Ổ khóa đồng chạm ba hoa cúc trên nắp rương. Tọa độ: `x: 46%, y: 56%, w: 10%, h: 12%`.
- `hitbox-wall-key`: Chùm chìa khóa treo trên móc vách gỗ bên trái. Tọa độ: `x: 12%, y: 35%, w: 8%, h: 14%`.
- `hitbox-sewing-hoop`: Khung thêu tròn để dở góc phải (đọc ghi chú kỷ niệm). Tọa độ: `x: 82%, y: 62%, w: 12%, h: 15%`.

### 2.3. Nhân vật xuất hiện
- An: Sprite nhân vật đứng quan sát bên cạnh rương.
- Mèo Nếp: Sprite mèo ngồi trên nắp rương, cào nhẹ vào vải bố.
- Bóng mờ Ông Lệ: Xuất hiện ngắn 1.5 giây ở mặt trái lật vải.

### 2.4. Danh mục vật phẩm (Items)
- `chia_khoa_dong_cu`: Chìa khóa đồng có tua chỉ đỏ sờn (vật phẩm dùng một lần để mở rương).
- `thuoc_go_tho_may_1888`: Thước gỗ chia khắc chữ Nho (thu thập vĩnh viễn vào Tủ đồ).

### 2.5. Prompt tiếng Anh sinh hình ảnh pixel (Pixel Art Scene Generation)
- **Mặt phải (Normal View):**
```text
pixel art background, 320x240 resolution, interior of an ancient dusty Vietnamese attic attic room, sunlight beams filtering through old clay roof tiles, antique heavy wooden chest with brass corners centered on wooden floor, covered with dusty burlap cloth, brass key hanging on wooden wall hook on the left, embroidery hoop on wooden stool, 16-bit pixel aesthetic, warm nostalgic lighting
```
- **Mặt trái (Fabric Flip View):**
```text
pixel art background, 320x240 resolution, inverse negative woven fabric realm of an old Vietnamese attic, dark indigo and charcoal burlap texture, glowing gold embroidery thread lines forming cursive Vietnamese letters on the chest lid, faint shadowy silhouette in the corner, mystical and antique atmosphere, high contrast, clean pixel art
```
