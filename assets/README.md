# Quy Chuẩn Quản Lý Kho Tài Nguyên Pixel Art (assets/README.md)

Tài liệu này là **NƠI DUY NHẤT** trong toàn bộ kho lưu trữ thông số kỹ thuật, kích thước điểm ảnh (pixel), bảng mã màu hex, tỷ lệ khung hình, quy chuẩn prompt và quy trình sản xuất đồ họa pixel art cho trò chơi **Tiệm May Nếp**.

Tất cả các tài liệu `README.md` con của từng asset trong kho chỉ được mô tả nội dung bằng lời văn và tên màu quy ước, tuyệt đối không được ghi lại các thông số kỹ thuật đã được chuẩn hóa tại đây.

---

## 1. Mục Đích & Cây Thư Mục Kho Asset Game

Kho tài nguyên này chuyên biệt phục vụ các thành phần đồ họa, hoạt ảnh và âm thanh trong gameplay (nhân vật, paperdoll, áo dài, phụ kiện, hoạ tiết, vật phẩm, khu vực, overlay, tài liệu cốt truyện, VFX, CG, âm thanh). Các thành phần khung giao diện, nút bấm, HUD và màn hình ứng dụng thuộc quyền quản lý của team UI.

Cấu trúc phân mục chuẩn hóa:

- `characters/`: Sprite nhân vật người chơi và các nhân vật phụ/NPC qua các thời kỳ (đứng, bước đi, tương tác, biểu cảm).
- `paperdoll/`: Khung cơ thể chuẩn (body base), bóng chân, quần lót và các lớp đế cho hệ thống búp bê giấy.
- `garments/`: Các lớp áo dài mặc được (ghép trên khung paperdoll) và ảnh đại diện thu nhỏ (thumbnail) trong Tủ đồ.
- `accessories/`: Các lớp phụ kiện mặc được trên nhân vật và biểu tượng phụ kiện (icon) trong Tủ đồ / Cửa hàng.
- `motifs/`: Hoa văn dệt truyền thống vẽ theo ô lặp liền viền (seamless tile) dùng phủ chất liệu vải.
- `items/`: Biểu tượng vật phẩm túi đồ, manh mối điều tra và đồ vật tương tác cốt truyện.
- `areas/<chapter>/`: Nền bối cảnh khu vực, các lớp phủ trạng thái (overlay), tài liệu phóng to (doc), tranh minh họa cao trào (CG) và hiệu ứng thị giác (VFX) phân theo từng chương (`prologue`, `chapter-1` đến `chapter-5`).
- `audio/`: Danh mục tệp âm thanh gồm nhạc nền (BGM), tiếng động môi trường (Ambience) và hiệu ứng tương tác (SFX).
- `screens/`: của team UI, kho này không quản lý.
- `design/`: của team UI, kho này không quản lý.

---

## 2. Cách Ghép Prompt Tạo Ảnh

Mọi prompt gửi tới mô hình tạo ảnh được lắp ráp theo đúng công thức 3 thành phần tuần tự:

$$\text{Prompt hoàn chỉnh} = [\text{Cụm kỹ thuật theo loại}] + [\text{Mô tả chủ thể (EN) trong README asset}] + [\text{Negative chung}]$$

- **[Cụm kỹ thuật theo loại]:** Trích xuất từ Mục 4 và Mục 5 tương ứng với loại tài nguyên cần vẽ.
- **[Mô tả chủ thể (EN)]:** Trích xuất nguyên văn từ mục tương ứng trong `README.md` của asset đó (chỉ mô tả nhân vật, trang phục, bố cục, chất liệu, màu sắc bằng tên tiếng Anh, cảm xúc).
- **[Negative chung]:** Khối từ khóa loại trừ bắt buộc quy định tại Mục 8.

---

## 3. Mô Hình & Cài Đặt Sinh Ảnh

- **Mô hình chỉ định:** Sử dụng mô hình **`gemini-3.1-flash-image`** trong Google AI Studio.
- **Cấm sử dụng:** Tuyệt đối không sử dụng mô hình cũ `gemini-2.5-flash-image` do không đảm bảo độ sắc nét của khối pixel vuông và dễ sinh hạt mờ khử răng cưa.
- **Tỷ lệ khung hình (Aspect Ratio):** Luôn chọn trực tiếp trong mục cài đặt (Settings / Aspect Ratio) của giao diện Google AI Studio (ví dụ: 1:1, 4:3, 16:9, 3:4, 9:16) tương ứng với từng loại asset; không mô tả tỷ lệ khung bằng lời trong prompt.
- **Nguyên tắc thử nghiệm:** Mỗi lượt chỉnh sửa prompt chỉ thay đổi đúng một chi tiết hoặc một từ khóa duy nhất để kiểm soát chất lượng tạo hình.
- **Ảnh tham chiếu (Reference Image):**
  - Luôn đính kèm ảnh tham chiếu phong cách mỹ thuật chung của dự án để AI giữ đúng chất pixel hoài niệm Việt Nam.
  - Đối với các lớp trang phục (`garment-layer`) và phụ kiện (`accessory-layer`) của hệ thống Paperdoll: **BẮT BUỘC** đính kèm hình ảnh khối cơ thể mẫu (`body base`) để mô hình căn khớp chính xác tỷ lệ vai, eo, cổ và tay áo.

---

## 4. Cụm Kỹ Thuật Chuẩn Hóa (Technical Prefix)

Khi ghép prompt, sử dụng đoạn văn bản kỹ thuật gốc sau:

```text
pixel art, <size> pixel grid, every pixel a crisp square block, limited palette, hard edges, no anti-aliasing
```

*(Thay thế `<size>` bằng kích thước lưới điểm ảnh quy định tại Mục 5, ví dụ: `64x96`, `32x32`, `128x128`, `800x500`)*.

### Quy tắc bổ sung:
- **Kỹ thuật chấm hạt (`dithering`):** Chỉ thêm đoạn `, dithering` vào sau cụm kỹ thuật đối với loại **nền khu vực (`area-background`, `area-overlay`)** và **tài liệu (`doc`)** để tạo chiều sâu nếp gấp vải và bề mặt giấy dó cổ. Không dùng cho sprite nhân vật và biểu tượng nhỏ.
- **Tách phông nền trong suốt (Chroma Key):** Đối với các asset cần tách phông trong suốt, thêm vào cuối cụm kỹ thuật:
  ```text
  flat solid #FF00FF background with no shadow
  ```
- **Ngoại lệ màu nền:** Nếu asset có chứa tông màu hồng sen, cánh sen hoặc đỏ tím (trùng dải màu magenta `#FF00FF`), chuyển sang dùng màu xanh lá thuần:
  ```text
  flat solid #00FF00 background with no shadow
  ```

---

## 5. Bảng Chuẩn Hóa Loại Asset (Asset Specifications)

Các thông số dưới đây tuân thủ nghiêm ngặt Quyết định số 20, 21, 22 tại `docs/01-overview/decisions.md`:

| Loại Asset | Kích thước chuẩn (px) | Tỷ lệ khung khi gen | Cách cắt chuẩn hóa nếu AI không có tỷ lệ | Số màu tối đa | Số khung hình | Cần tách nền |
| :--- | :---: | :---: | :--- | :---: | :---: | :---: |
| `area-background` | 800 × 500 | 16:9 | Gen ở 16:9 (hoặc tỷ lệ gần nhất), crop trung tâm theo tỷ lệ 8:5 về đúng 800 × 500 px (nearest-neighbor) | 32 màu | 1 tĩnh | Không |
| `area-overlay` | 800 × 500 | 16:9 | Cắt góc tương ứng với tọa độ nền 800 × 500 px, giữ đúng vị trí trên canvas chuẩn | 16 màu | 1–4 khung | Có |
| `cg` | 800 × 500 | 16:9 | Gen ở 16:9, crop bố cục 8:5 về 800 × 500 px | 32 màu | 1 tĩnh | Không |
| `doc` | 400 × 250 | 16:9 | Crop trung tâm hoặc căn theo lề tài liệu về 400 × 250 px | 16 màu | 1 tĩnh | Có |
| `character-sprite` | 64 × 96 | 2:3 (hoặc 1:1 sheet) | Căn giữa nhân vật trên khung 64 × 96 px mỗi frame | 16 màu | 1 (idle) hoặc 3–6 (bước đi) | Có |
| `cat-sprite` | 32 × 32 | 1:1 | Căn giữa khung 32 × 32 px mỗi frame | 12 màu | 2–4 khung | Có |
| `portrait` | 128 × 128 | 1:1 | Căn giữa mặt và ngực áo, bản cho thẻ manh mối thu nhỏ còn 64 × 64 px | 16 màu | 1–2 khung | Có |
| `paperdoll-layer` | 64 × 96 | 2:3 | Căn đúng vị trí khối người trên canvas chuẩn 64 × 96 px, không cắt xén viền trong suốt | 8–12 màu | 1 tĩnh | Có |
| `garment-layer` | 64 × 96 | 2:3 | Vẽ thang xám, căn chuẩn khung 64 × 96 px khớp thân người, xuất đủ canvas | 4 cấp xám | 1 tĩnh | Có |
| `garment-thumb` | 96 × 96 | 1:1 | Căn giữa tà áo thu nhỏ hiển thị trọn vẹn trong khung 96 × 96 px | 16 màu | 1 tĩnh | Có |
| `accessory-layer` | 64 × 96 | 2:3 | Đặt đúng tọa độ đeo/cầm trên canvas 64 × 96 px, xuất đủ canvas không trim | 8–12 màu | 1 tĩnh | Có |
| `accessory-icon` | 48 × 48 | 1:1 | Căn giữa vật thể trong khung 48 × 48 px | 8–12 màu | 1 tĩnh | Có |
| `item-icon` | 48 × 48 | 1:1 | Căn giữa vật thể trong khung 48 × 48 px | 8–12 màu | 1 tĩnh | Có |
| `motif` | 32 × 32 | 1:1 | Vẽ họa tiết lặp vô tận (seamless repeat) trên lưới 32 × 32 px | 4–8 màu | 1 tĩnh | Có |
| `vfx` | Tùy biến (32×32 / 64×96 / 800×500) | 1:1 hoặc 16:9 | Cắt theo từng ô hoạt cảnh (frame cell) trên dải sprite sheet | 8–16 màu | 3–8 khung | Có |
| `screen-background-landscape` | 800 × 500 | 16:9 | Gen ở 16:9, crop bố cục 8:5 về 800 × 500 px (thuộc team UI) | 32 màu | 1 tĩnh | Không |
| `screen-background-portrait` | 270 × 480 | 9:16 | Giữ nguyên kích thước dọc hiện có (thuộc team UI) | 32 màu | 1 tĩnh | Không |
| `ui-frame-9slice` | Tùy biến | Tùy biến | Khung modal/thẻ 9-slice: 4 góc cố định, 4 cạnh co giãn/lặp, 1 tâm (thuộc team UI) | 16 màu | 1 tĩnh | Có |
| `ui-bar-3slice` | Tùy biến | Tùy biến | Thanh HUD/thanh màu/dải chọn 3-slice: 2 đầu cố định, 1 thân co giãn (thuộc team UI) | 16 màu | 1 tĩnh | Có |

*Ghi chú:* Các loại asset giao diện gồm `screen-background-landscape`, `screen-background-portrait`, `ui-frame-9slice`, `ui-bar-3slice` và `icon UI` (24 × 24 px) thuộc team UI phụ trách (kho asset game không quản lý trực tiếp file ảnh nhưng tuân thủ đặc tả này).

---

## 6. Quy Chuẩn Paperdoll & Hoán Đổi Màu (Palette Swapping)

### 6.1. Thứ tự 8 lớp đồ họa (Layer Stacking Order)
Hệ thống hiển thị nhân vật búp bê giấy trên khung lưới chuẩn **64 × 96 pixel**, xếp chồng từ dưới lên trên theo đúng thứ tự:

1. `layer-0-shadow`: Bóng chân nhân vật in trên mặt đất.
2. `layer-1-body`: Khối cơ thể, dáng đứng, tông màu da cơ bản.
3. `layer-2-pants`: Quần lụa dài hai ống (trắng hoặc đen, rủ chạm mu bàn chân).
4. `layer-3-inner`: Lớp áo lót trong (áo yếm đối với áo tứ thân; áo lót trắng cổ viền đối với ngũ thân và áo tấc).
5. `layer-4-garment-back`: Tà áo sau rủ dài sau lưng.
6. `layer-5-garment-front`: Tà áo trước, thân áo chính, cổ đứng/cổ sen, hàng khuy cài và đường xẻ tà bên sườn.
7. `layer-6-head`: Khuôn mặt, tóc và phục sức đội đầu (khăn vấn, khăn đóng, nón lá, nón quai thao).
8. `layer-7-accessories`: Phụ kiện trang sức đeo thêm hoặc cầm tay (kiềng bạc, chuỗi ngọc, quạt lụa, thước thợ may, guốc mộc).

### 6.2. Quy tắc xuất đủ canvas (No Trim)
Tất cả các tệp hình ảnh của `garment-layer` và `accessory-layer` **BẮT BUỘC** phải được lưu trữ trên canvas kích thước đầy đủ đúng **64 × 96 pixel**. Tuyệt đối không xén bớt (trim/crop) phần trong suốt thừa. Khi UI vẽ lên màn hình tại tọa độ gốc `(0, 0)`, mọi lớp áo và phụ kiện sẽ khớp tuyệt đối từng điểm ảnh với cơ thể nhân vật.

### 6.3. Bảng mã Key hoán đổi màu thời gian thực (Palette Swapping Keys)
Trang phục gốc trong kho được lưu dưới định dạng PNG Thang độ xám (Grayscale). Động cơ render trên HTML5 Canvas sẽ quét dữ liệu điểm ảnh và thay thế 8 mã màu chuẩn này sang màu sắc người dùng lựa chọn:

- **4 Key màu thân áo chính (Garment Base):**
  1. `Highlight` (Vùng sáng phản quang vải): `#E0E0E0`
  2. `Base Tone` (Màu thân vải chủ đạo): `#9E9E9E`
  3. `Shadow Tone` (Vùng tối nếp gấp vải): `#616161`
  4. `Outline` (Đường viền nét vẽ viền áo): `#212121`

- **4 Key màu chi tiết phụ (Accent / Trims & Buttons):**
  5. `Accent Highlight` (Điểm sáng khuy cài, viền cườm, hoa văn nhỏ): `#FFFFFF`
  6. `Accent Base` (Màu cúc vải, viền cổ, đường nẹp trong): `#D0C8B8`
  7. `Accent Shadow` (Bóng đổ chân cúc, viền tối chi tiết): `#8C8275`
  8. `Accent Outline` (Viền sắc cạnh của chi tiết phụ): `#3A342C`

---

## 7. Bảng Màu Chuẩn Hóa Của Dự Án (Palette Mapping)

Tất cả các tệp `README.md` mô tả asset con chỉ được phép gọi tên màu bằng **TÊN TIẾNG VIỆT** quy định dưới đây; mã Hex chỉ lưu trữ tại bảng này:

| Tên Màu Tiếng Việt | Mã Màu Hex | Tính Chất & Phạm Vi Sử Dụng |
| :--- | :---: | :--- |
| **củ nâu** (nâu củ nâu) | `#6B4423` | Nhuộm củ nâu Bắc Bộ mộc mạc, dùng cho áo tứ thân, ngũ thân lao động |
| **chàm** (chàm thẫm) | `#1E2A38` | Sắc xanh đen lá chàm ủ vôi, dùng cho vạt áo, cõi Lật Vải và trang phục góa bụa |
| **chàm sáng** | `#2D3E50` | Vùng sáng phản quang của lụa nhuộm chàm |
| **đỏ son** | `#B83A24` | Đỏ cánh kiến tươi tắn, dùng cho nơ mèo Nếp, hoa văn lễ hội, vạt áo cưới |
| **đỏ điều** | `#8B261E` | Đỏ sẫm cổ kính, rèm bàn thờ dòng họ, lót rương gỗ gia bảo |
| **hoàng yến** | `#CFA449` | Sắc vàng óng tơ tằm, ánh nắng thu chiếu rọi, chỉ thêu kim tuyến |
| **vàng mỡ gà** | `#E8D399` | Vàng nhạt thanh nhã của áo dài tân thời thập niên 1930 |
| **men lam** | `#2D6A5D` | Sắc xanh gốm men lam cổ truyền, ngọc bích, viền tà quyền quý |
| **xanh ngọc bích** | `#2E8B7A` | Xanh ngọc áo dài cổ thuyền thập niên 1960 của bà Mai |
| **lam khói** | `#4E6B7A` | Sắc lam xám mờ ảo của sương sớm và khói trầm |
| **giấy dó** (trắng ngà) | `#F5EFEB` | Màu sợi tơ tằm thô và giấy dó thủ công, nền áo phin bao cấp |
| **đen mun** | `#1C1614` | Gỗ mun bóng, guốc mộc, tóc đen nhánh, bóng đêm tĩnh mịch |
| **gỗ lim tối** | `#2E1C12` | Gỗ cột đình, thân rương cổ, sập gụ từ đường |
| **gỗ sẫm** | `#3D261A` | Bàn cắt may tiệm vải, cầu thang gỗ lim |
| **đồng thau cổ** | `#B58A42` | Ổ khóa ba chấu, thước thợ may, khuy kim loại cổ |
| **vàng kim tuyến** | `#F2C94C` | Đường nét chữ Nôm phát sáng trong cõi dệt tâm thức |
| **kem sáng** | `#FDEACE` | Nền thẻ sáng, điểm phản quang viền |
| **kem đào** | `#FDE5C8` | Tông nền bảng thẻ, bề mặt lụa ngà ấm áp |
| **đào nhạt** | `#F3C098` | Viền phản quang ánh gỗ |
| **hồng ngọc** | `#D37C74` | Viền phân cách nội dung |
| **hồng sen** | `#E75788` | Điểm nhấn hoa sen, sắc hồng hiện đại |
| **đỏ mận** | `#A53556` | Tông bóng nổi chân đế |
| **mận chín** | `#7B3248` | Màu chữ chú thích, vạt tơ dệt chín |
| **mận đậm** | `#411D3A` | Viền ngoài đậm nét của cấu trúc khung |
| **tím đêm** | `#251728` | Bóng tối sâu, chiều sâu của không gian ma mị |
| **mực đen** | `#1E1523` | Nét mực nho, chữ in đậm sắc cạnh |
| **vàng đồng** | `#E09B5A` | Viền kim loại dát vàng, chỉ vàng óng |
| **hồng hoàng hôn** | `#FB9A99` | Ánh trời chiều rọi qua ô cửa sổ kính |

---

## 8. Khối Từ Khóa Loại Trừ (Negative) & Quy Tắc Nội Dung

### 8.1. Negative chung bắt buộc ghép vào prompt
Mọi yêu cầu sinh ảnh bắt buộc đính kèm đoạn từ khóa loại trừ sau:

```text
photorealistic, realistic, hyperrealistic, 3D render, CGI, unreal engine, smooth gradients, anti-aliased, blurry, soft focus, bokeh, drop shadow, modern text, english text, chinese characters, kanji, hanzi, letters, signature, watermark, logo, western clothing, chinese qipao, korean hanbok, japanese kimono
```

### 8.2. Bốn quy tắc nội dung bất khả xâm phạm
1. **Tuyệt đối không để AI vẽ chữ vào ảnh:**
   - Không sinh chữ Hán, chữ Nôm, chữ Quốc ngữ, thư pháp, chữ ký, ấn triện hay biển hiệu có chữ.
   - Toàn bộ nội dung văn bản trên các bức thư, văn tự, bài vị, gia phả, hoành phi và chứng cứ sẽ do giao diện (UI Text Engine) phủ văn bản lên trên ảnh nền/vật phẩm khi hiển thị cho người chơi đọc.
2. **Tuyệt đối không vẽ và không gắn tên họa sĩ Lê Phổ:**
   - Tuân thủ Quyết định mục 13 (`decisions.md`): Không gán công cải tiến trang phục cho họa sĩ Lê Phổ do thiếu căn cứ xác thực. Mẫu áo sau thời kỳ Lemur được gọi chuẩn mực là: *"áo dài tân thời cổ đứng, không vai bồng (cuối thập niên 1930)"*.
3. **Không sao chép nguyên mẫu áo dài của Cát Tường:**
   - Thiết kế áo tân thời giai đoạn 1934 chỉ lấy cảm hứng văn hóa lịch sử từ phong trào canh tân y phục (cổ lá sen, chiết eo nhẹ, tay bồng thanh nhã), không chép y nguyên tác quyền bản thảo của Nguyễn Cát Tường.
4. **Không để lẫn trang phục ngoại lai vào áo dài và Việt phục:**
   - Không để xuất hiện sườn xám Trung Hoa (cổ áo khuy chéo xẻ đùi cao hở hang), Hanbok Triều Tiên (váy phồng quây ngực ngắn) hay Kimono Nhật Bản (đai lưng obi to bản). Áo ngũ thân và áo dài Việt Nam luôn mặc kèm quần lụa dài chấm mu bàn chân, xẻ tà từ eo, khuy cài kín đáo bên hữu theo đúng luân lý ngũ thường.

---

## 9. Quy Trình 9 Bước Sản Xuất & Tinh Chỉnh Asset

Mọi hình ảnh trước khi tích hợp vào app đều phải trải qua quy trình 9 bước tiêu chuẩn:

```
[1. Gen AI] ──> [2. Dò lưới] ──> [3. Ép palette] ──> [4. Xóa nền] ──> [5. Canvas chuẩn] ──> [6. Sửa tay] ──> [7. QA Kỹ thuật] ──> [8. Duyệt văn hóa] ──> [9. Xuất PNG]
```

- **Bước 1: Gen (Tạo ảnh nháp):** Dùng prompt ghép chuẩn gửi mô hình `gemini-3.1-flash-image` trong Google AI Studio, chọn tỷ lệ khung hình và lưu ảnh nháp vào thư mục `_raw/` cạnh README asset.
- **Bước 2: Dò lưới (Grid Snapping):** Đưa ảnh vào phần mềm chuyên dụng (Aseprite / Photoshop), căn chỉnh tỷ lệ pixel scale để từng hạt pixel ăn khớp hoàn hảo vào lưới lưới vuông (Pixel Grid).
- **Bước 3: Ép Palette (Color Quantization):** Giới hạn số lượng màu về đúng số lượng quy định (tối đa 4, 12, 16 hoặc 32 màu tùy loại asset), chuyển đổi sang bảng màu chuẩn của dự án.
- **Bước 4: Xóa nền (Chroma Key):** Khử hoàn toàn màu phông nền `#FF00FF` hoặc `#00FF00` thành kênh Alpha trong suốt 100%, không để lại viền lem hạt màu phông.
- **Bước 5: Đưa về Canvas chuẩn (Canvas Sizing):** Đặt hình vào kích thước khung hình chuẩn theo bảng kỹ thuật (ví dụ: 64 × 96, 48 × 48, 800 × 500 px), căn đúng trọng tâm hoặc vị trí offset, không cắt tỉa (no trim).
- **Bước 6: Sửa tay (Pixel Cleanup):** Họa sĩ dùng bút 1px chỉnh sửa thủ công: tỉa sắc nét đường viền (crisp outline), loại bỏ pixel thừa lạc lõng (stray pixels), chỉnh lại nếp vải và khuôn mặt.
- **Bước 7: QA Kỹ thuật:** Kiểm tra kích thước chính xác, kiểm tra độ sâu màu, xác nhận không có hiệu ứng anti-aliasing làm mờ viền.
- **Bước 8: Duyệt văn hóa (Cultural Review):** Đối chiếu hồ sơ nhân vật và tư liệu lịch sử: kiểm tra hàng khuy 5 hạt bên hữu, độ đứng của cổ lập lĩnh, chiều dài vạt áo, bảo đảm tính xác thực di sản.
- **Bước 9: Xuất PNG chuẩn:** Xuất tệp PNG nén lossless không mất dữ liệu, đặt tên chuẩn và đưa vào vị trí phân phối.

> **QUY TẮC BẮT BUỘC:** Bước 1 thực hiện bằng AI. Toàn bộ các **Bước 2 đến Bước 9 BẮT BUỘC thực hiện bằng công cụ đồ họa chuyên dụng và sự trau chuốt của con người**, tuyệt đối không dùng AI để tự động sửa chữa vì sẽ làm mất cấu trúc pixel grid.

---

## 10. Quy Chuẩn Đặt Tên & Quản Lý Trạng Thái

### 10.1. Cú pháp đặt tên tệp
- Toàn bộ dùng chữ thường, không dấu tiếng Việt, nối nhau bằng dấu gạch ngang (`kebab-case`), định dạng tệp luôn là `.png`.
- **Nền khu vực:** `<area-id>--phai.png` (mặt phải thế giới thực).
- **Mặt trái khu vực:** `<area-id>--trai.png` (cõi dệt lật vải; trạng thái ghi chú: *"hoãn sau 10/10"*).
- **Lớp phủ trạng thái:** `<area-id>--<trang-thai>.png` (ví dụ: `c0-s2--chest-open.png`, `c1-s1--door-unlatched.png`).
- **Nhân vật:**
  - Tư thế bối cảnh: `scene-<bien-the>-<pose>.png` (ví dụ: `scene-catwalk.png`, `scene-loom.png`; nếu chỉ có một thời kỳ duy nhất thì lược bỏ `<bien-the>-`).
  - Chân dung biểu cảm: `portrait-<bien-the>-<bieu-cam>.png` (ví dụ: `portrait-smile.png`, `portrait-determined.png`).
- **Trang phục & Phụ kiện:**
  - Lớp paperdoll mặc trên người: `<id>.png` (ví dụ: `ao-tu-than.png`, `khan-van-den.png`).
  - Ảnh đại diện hiển thị: `<id>--thumb.png` (cho áo trong tủ đồ) hoặc `<id>--icon.png` (cho phụ kiện/vật phẩm).
- **Thư mục ảnh nháp:** Mỗi asset có một thư mục `_raw/` nằm cạnh file `README.md` để lưu trữ các lần tạo ảnh của AI (`<ten>-v1.png`, `<ten>-v2.png`).

### 10.2. Bốn trạng thái tiến độ chuẩn
Mọi tệp trong bảng danh mục của README asset đều mang một trong bốn trạng thái sau:
- ⬜ **chưa gen:** Mới có tài liệu mô tả, chưa tiến hành chạy AI.
- 🟨 **nháp AI:** Đã sinh ảnh thô từ Google AI Studio, đang lưu trong `_raw/`.
- 🟩 **đã làm sạch:** Đã hoàn thành các bước dò lưới, xóa phông, sửa tay 1px và đạt chuẩn QA kỹ thuật.
- ✅ **đã vào app:** Đã được kiểm tra văn hóa, tối ưu dung lượng và tích hợp thành công vào mã nguồn chạy của trò chơi.

---

## 11. Mẫu Chuẩn Cho README Của Từng Asset Con

Mọi tệp `README.md` của từng asset con trong toàn kho phải tuân thủ chính xác cấu trúc mẫu dưới đây:

```markdown
# <tên tiếng Việt của asset> (<id>)

- **Loại:** <chọn chính xác một loại trong Bảng loại asset tại assets/README.md>
- **Dùng ở đâu:** <ghi rõ phân cảnh cốt truyện, màn hình ứng dụng hoặc tính năng sử dụng>
- **Mô tả:** <Mô tả chi tiết bằng lời văn: nhân vật/sự vật là ai/cái gì, hình dáng, cử chỉ, nếp áo, chất liệu lụa/gỗ/đồng, cảm xúc, chuyển động. Màu sắc chỉ được gọi bằng TÊN TIẾNG VIỆT trong Bảng màu của assets/README.md (ví dụ: màu đỏ son, màu chàm, màu vàng mỡ gà). Kích thước chỉ gọi bằng LOẠI asset, tuyệt đối không ghi số px, không ghi dấu x, không ghi mã hex, không ghi tọa độ hay tỷ lệ số>.
- **Mô tả chủ thể (EN):** <Đoạn văn tiếng Anh đặc tả đối tượng: subject, pose, clothing details, traditional craftsmanship, fabric texture, colors by english common name, lighting mood. Không chứa các thông số kỹ thuật px hay mã hex>.
- **Ghi chú văn hóa (nếu có):** <Ý nghĩa lịch sử, phong tục cổ truyền, quy tắc ngũ thường, nguồn gốc trang phục>.
- **Tên cũ (nếu có):** <Đường dẫn hoặc tên gọi cũ trong các tài liệu trước đây để tiện truy vết>.

## Danh sách tệp cần có

| Tên tệp | Mô tả bằng lời | Trạng thái |
| :--- | :--- | :---: |
| `<ten-tep-chuan>.png` | <Mô tả trạng thái hoặc góc nhìn bằng lời văn> | ⬜ chưa gen |
```

---

*Tài liệu này có hiệu lực áp dụng thống nhất cho toàn bộ quy trình sản xuất và chuẩn hóa tài nguyên của dự án Tiệm May Nếp.*
