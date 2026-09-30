File: docs/06-design/design-system.md

# Hệ Thống Thiết Kế Tiệm May Nếp (Design System)

Tài liệu này xác lập toàn bộ quy chuẩn về bảng màu, kiểu chữ, tỷ lệ đồ họa pixel art, kỹ thuật phóng to không vỡ nét và quy tắc thẩm mỹ khi vẽ mặt trái của khung cảnh trong cơ chế Lật vải (Fabric Flip).

## 1. Bảng màu chủ đạo (Color Palette)

Bảng màu của Tiệm May Nếp được lấy cảm hứng trực tiếp từ chất liệu thủ công và màu sắc tự nhiên trong đời sống truyền thống của người Kinh:

### 1.1. Màu nền và giao diện cơ sở
- Màu Giấy Dó (Dó Paper Base): `#F5EFEB`. Tông màu ngà ấm áp, có độ xốp nhẹ như mặt giấy dó thủ công, dùng làm màu nền cho toàn bộ ứng dụng, tạo cảm giác mộc mạc, gần gũi và giảm mỏi mắt trên màn hình điện thoại.
- Màu Gỗ Mộc (Wood Dark): `#3D261A`. Màu gỗ lim, gỗ gụ lâu năm, dùng cho các đường viền khung, thanh tiêu đề gáy sách và chân tường tiệm may.
- Màu Sợi Thô (Unbleached Hemp): `#D9CEB2`. Tông màu của sợi đay, sợi gai dệt vải thô, dùng cho các nút bấm phụ và thanh trượt.

### 1.2. Màu sắc điểm nhấn văn hóa
- Màu Đỏ Son (Vermilion Red): `#B83A24`. Lấy cảm hứng từ mực chu sa, câu đối Tết và cánh kiến đỏ. Dùng cho các điểm nhấn quan trọng, nút hành động chính (Call-to-Action), nhãn thông báo hỷ sự và vạt áo nổi bật.
- Màu Xanh Ngọc Bích (Jade Green): `#2D6A5D`. Tông màu ngọc bích trầm, gợi nhớ men gốm hoa lam và ngọc quý xưa. Dùng cho huy hiệu hoàn thành, thẻ bảo tàng đã đọc và các điểm nhấn may mắn.
- Màu Vàng Hoàng Thổ (Ochre Yellow): `#CFA449`. Màu đất sét nung và ánh vàng trên tơ tằm thô. Dùng cho biểu tượng đồng xu thưởng, viền khóa rương cũ và điểm xếp hạng màu sắc.
- Màu Chàm Đen (Indigo Black): `#1E2A38`. Chiết xuất từ lá chàm ngâm ủ, mang sắc xanh đen sẫm sâu thẳm. Dùng làm màu tóc nhân vật, nếp gấp bóng tối và phông nền cho các cảnh đêm hoặc mặt trái tấm vải.

## 2. Quy chuẩn kiểu chữ (Typography)

Nhóm mình đặt ra nguyên tắc khắt khe về hiển thị chữ để bảo đảm tính thẩm mỹ và dễ đọc trên thiết bị di động:

### 2.1. Phông chữ nội dung đọc (Body & UI text)
- Phông chữ bắt buộc: Sử dụng `Be Vietnam Pro` hoặc hệ phông sans-serif chuẩn của hệ thống (`system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`).
- Lý do: Chữ nội dung bắt buộc phải hiển thị đầy đủ 100% các ký tự có dấu thanh tiếng Việt (ngã, hỏi, nặng, huyền, sắc, ơ, ư, đ), dấu mũ và dấu móc không bị lệch hay nhảy phông.
- Cấm tuyệt đối: Không dùng phông chữ pixel (bitmap / pixel font) cho các đoạn văn bản dài, thẻ thông tin bảo tàng hay hộp thoại cốt truyện. Phông pixel tiếng Việt thường bị vỡ dấu, méo chữ hoặc khó đọc trên màn hình điện thoại có mật độ điểm ảnh cao (Retina display).

### 2.2. Phông chữ tiêu đề và điểm nhấn số (Headings & Counters)
- Tiêu đề màn hình và số lượng xu: Có thể dùng phông mang phong cách retro nhẹ hoặc phông có chân mang hơi hướng văn học cổ điển (như `Playfair Display` hoặc `Merriweather`) cho các tiêu đề lớn của tiệm may để tạo vẻ hoài niệm.
- Cỡ chữ tối thiểu trên điện thoại: Văn bản nội dung không được nhỏ hơn 14px; tiêu đề phân khu từ 18px đến 22px; khoảng cách dòng (line-height) duy trì từ 1.5 đến 1.6 để bảo đảm mắt người đọc không bị mỏi.

## 3. Kích thước Pixel gốc và tỷ lệ đồ họa

Toàn bộ tài nguyên đồ họa pixel art trong app được vẽ theo độ phân giải gốc cố định (Native Pixel Resolution), sau đó phóng to tỷ lệ nguyên (Integer Scaling) để hiển thị sắc nét trên mọi loại màn hình.

| Thành phần đồ họa | Kích thước gốc (Native Width × Height) | Mục đích sử dụng | Tỷ lệ hiển thị trên mobile |
| :--- | :--- | :--- | :--- |
| Khung cảnh sảnh tiệm (Hub) | 320 × 480 pixel | Toàn cảnh tiệm may và bốn góc tương tác | Chiếm trọn khung nhìn (fit to viewport) |
| Cảnh game rương cũ (Journey) | 320 × 240 pixel | Khung hình chữ nhật màn chơi point-and-click | Tỷ lệ 4:3 nằm ở nửa trên màn hình |
| Nhân vật người chơi (Protagonist) | 64 × 96 pixel | Khung nhân vật đứng thẳng trên bục thử đồ | Phóng to 3x hoặc 4x (192×288 hoặc 256×384 px) |
| Mèo mướp Nếp (Assistant) | 32 × 32 pixel | Sprite mèo nằm ngủ, vẫy đuôi hoặc cầm bảng | Phóng to 3x (96×96 px) |
| Biểu tượng vật phẩm & phụ kiện | 24 × 24 hoặc 32 × 32 pixel | Ô lưới túi đồ, biểu tượng nút bấm phụ | Phóng to 2x (48×48 hoặc 64×64 px) |

## 4. Kỹ thuật phóng to không làm mờ ảnh (Pixel Crisp Rendering)

Khi phóng to hình ảnh pixel trên trình duyệt hiện đại, cơ chế khử răng cưa mặc định (Bilinear Interpolation) sẽ làm các cạnh pixel bị nhòe mờ. Để giữ các đường pixel luôn sắc cạnh và vuông vức như đồ họa cổ điển, nhóm mình áp dụng bắt buộc các quy tắc kỹ thuật sau:

### 4.1. Quy chuẩn CSS toàn cục
Áp dụng thuộc tính dựng hình điểm ảnh cho toàn bộ thẻ `<img>`, `<canvas>` và hình nền pixel trong `src/index.css`:
```css
.pixel-art {
  image-rendering: pixelated; /* Chuẩn hiện đại trên Chrome, Edge, Safari */
  image-rendering: -moz-crisp-edges; /* Tương thích Firefox cũ */
  image-rendering: crisp-edges;
}
```

### 4.2. Quy chuẩn thẻ Canvas
Khi vẽ các lớp sprite hoặc hoán đổi bảng màu bằng Javascript:
```javascript
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false; // Tắt tính năng làm mịn làm mờ điểm ảnh
```

## 5. Quy tắc mỹ thuật khi vẽ mặt trái của cảnh (Cơ chế Lật Vải)

Cơ chế "Lật vải" (Fabric Flip) là điểm nhấn nghệ thuật độc đáo của phần game Cái rương cũ. Khi người chơi bấm nút lật vải, không gian chuyển từ thế giới thực tế sang mặt trái của tấm vải ký ức. Để tạo sự tương phản mạnh mẽ mà không mang màu sắc kinh dị ma mị, nhóm mình tuân theo các quy tắc vẽ sau:

1. Chuyển đổi bảng màu sang chất liệu dệt thô:
   - Mặt phải (Thế giới thực): Dùng bảng màu ấm áp của gỗ mộc, nắng chiều, giấy dó và màu lụa tươi tắn.
   - Mặt trái (Ký ức ẩn giấu): Chuyển toàn bộ sang tông màu sợi dệt thô mộc gồm màu xám tro của củi tàn (`#4A4A4A`), màu chàm lạnh ngả xanh đen (`#1A2530`) và màu sợi đay ố vàng (`#8C826A`).

2. Hiển thị các đường chỉ ràng buộc (Tangle Threads):
   - Ở mặt trái, các mối quan hệ xã hội cũ và lề thói định kiến được trực quan hóa thành những sợi chỉ thêu màu xám chằng chịt, nối từ các góc khuất vào đồ vật hoặc nhân vật.
   - Nơi nào có manh mối hoặc sự thật cần tháo gỡ, sợi chỉ sẽ phát sáng ánh chỉ tơ vàng (`#F2C94C`) hoặc đỏ son (`#EB5757`).

3. Vết cắt và chữ viết ẩn:
   - Các dòng thư bị che giấu hoặc những bản hương ước khắt khe sẽ lộ ra dưới dạng những đường dệt nổi hoặc vết kim thêu thủng trên nền vải chàm.
   - Đồ họa giữ phong cách trang nhã của nghệ thuật tranh khắc gỗ dân gian, tuyệt đối không vẽ máu me, không rùng rợn và không gây sợ hãi cho lứa tuổi học sinh, sinh viên.
