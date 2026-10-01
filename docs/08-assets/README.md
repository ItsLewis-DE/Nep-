# Không Gian Làm Việc Đồ Họa & Tạo Ảnh Pixel Art (08-assets)

Thư mục này là trung tâm làm việc dành riêng cho đội ngũ thiết kế đồ họa và tạo ảnh (Prompt Engineers / Pixel Artists) của dự án **Tiệm May Nếp**.

Mỗi hình ảnh, nền cảnh, vật phẩm, điểm chạm tương tác, sprite nhân vật và thành phần giao diện đều có một thư mục riêng biệt. Trong mỗi thư mục con luôn có sẵn:
1. Bản đặc tả chi tiết về kích thước, bảng màu, ý nghĩa văn hóa.
2. Prompt tiếng Anh chuẩn hóa để dán vào mô hình tạo ảnh (Gemini / Pixel Engine).
3. Nơi lưu trữ trực tiếp ảnh tạo thành công (tệp nháp `-v1.png`, `-v2.png` và tệp chính thức `.png`).

---

## 1. Quy chuẩn kỹ thuật Pixel Art (Pixel Guidelines)

Dựa trên tài liệu hệ thống thiết kế `docs/06-design/design-system.md`, mọi hình ảnh tạo ra phải tuân thủ nghiêm ngặt các tham số sau:

### 1.1. Kích thước chuẩn theo từng nhóm đối tượng
| Phân loại đối tượng | Kích thước gốc (Pixel) | Tỷ lệ khung hình | Định dạng tệp |
| :--- | :--- | :--- | :--- |
| **Nền cảnh câu đố (Scene Background)** | 320 × 240 px | 4:3 (chuẩn màn hình CRT cổ điển) | PNG không trong suốt |
| **Nền màn hình ứng dụng (Screen UI Background)** | 320 × 480 px | 2:3 (chuẩn màn hình dọc di động) | PNG |
| **Sprite nhân vật chính / NPC người lớn** | 64 × 96 px | 2:3 | PNG trong suốt (Alpha) |
| **Sprite Mèo Nếp (Linh thú)** | 32 × 32 px | 1:1 | PNG trong suốt (Alpha) |
| **Sprite Boss Thực thể Ông Lệ** | 96 × 128 px | 3:4 (áp đảo kích thước người) | PNG trong suốt (Alpha) |
| **Khung hình chân dung hội thoại (Avatar Portrait)** | 48 × 48 px | 1:1 | PNG trong suốt |
| **Trang phục áo dài (Phòng phối đồ Studio)** | 64 × 96 px | 2:3 (khớp khung nhân vật) | PNG thang xám (Grayscale) |
| **Phụ kiện đội đầu, giày guốc, quạt** | 32 × 32 px | 1:1 | PNG trong suốt |
| **Vật phẩm túi đồ (Inventory Items)** | 24 × 24 px | 1:1 | PNG trong suốt |
| **Hoa văn dệt (Patterns Overlay)** | 32 × 32 px | 1:1 (lặp vô tận / seamless tile) | PNG trong suốt |
| **Biểu tượng giao diện (UI Icons)** | 16 × 16 px hoặc 24 × 24 px | 1:1 | PNG trong suốt |

### 1.2. Giới hạn bảng màu (Color Palette Limits)
- **Chuẩn đồ họa:** 16-bit retro pixel art.
- **Số màu tối đa cho nền cảnh:** Tối đa 32 màu trên mỗi khung cảnh.
- **Số màu tối đa cho sprite nhân vật:** Tối đa 16 màu trên mỗi sprite.
- **Số màu tối đa cho vật phẩm / icon:** Tối đa 8 đến 12 màu.
- **Bảng màu chủ đạo:** Tông màu truyền thống Việt Nam:
  - Đỏ son (`#C43D32`), Đỏ điều (`#8B261E`).
  - Vàng hoàng yến (`#E8A838`), Vàng mỡ gà (`#E8D399`).
  - Lam khói (`#4E6B7A`), Xanh ngọc bích (`#2E8B7A`), Chàm thẫm (`#1E2A38`).
  - Nâu củ nâu (`#5C3D2E`), Đen nhánh mun (`#1C1614`), Trắng ngà tơ mộc (`#F4EEDF`).

### 1.3. Nguyên tắc dựng hình và khử răng cưa
- **TUYỆT ĐỐI KHÔNG KHỬ RĂNG CƯA (No Anti-aliasing):** Các cạnh của sprite và chi tiết phải sắc nhọn (pixel-crisp), không có pixel mờ chuyển tiếp nửa trong suốt làm nhòe hình.
- **Đường viền nét vẽ (Outlines):** Dùng đường viền màu sẫm cùng họ màu (`selective outlining`), không lạm dụng viền đen tuyền bao quanh toàn bộ chi tiết.
- **Độ dốc màu (Gradients):** Không dùng chuyển màu mượt mà (smooth gradient) kiểu đồ họa vector hiện đại. Sử dụng kỹ thuật chấm hạt pixel (`dithering`) thủ công để tạo bóng mờ và độ sâu chất liệu dệt.
- **Hiệu ứng chuyển động (VFX & Animations):** Vẽ theo từng khung hình thủ công (`frame-by-frame sprite sheets`). Không sử dụng hiệu ứng hạt shader hay ánh sáng mờ nhòe máy tính.

---

## 2. Khối Style Chung (Master Style Prefix)

### 2.1. Đoạn văn bản bắt buộc dán trước mọi Prompt
Khi tạo ảnh qua Gemini hoặc công cụ tạo ảnh pixel, người thực hiện **PHẢI** dán nguyên văn đoạn tiền tố này vào đầu câu prompt:

```text
16-bit pixel art style, crisp clean pixel outlines, strictly no anti-aliasing, limited retro color palette, authentic historical Vietnamese cultural aesthetic, high contrast, pixel-perfect sprite, sharp pixel grid, no blur, no smooth gradients, retro game asset:
```

### 2.2. Danh sách từ khóa CẤM sử dụng (Negative / Banned Keywords)
Tuyệt đối không đưa các từ khóa sau vào prompt vì sẽ làm mất chất pixel retro:
- `photorealistic`, `realistic`, `hyperrealistic`, `ultra-detailed photography`
- `3D render`, `CGI`, `unreal engine`, `octane render`
- `cinematic lighting`, `volumetric light`, `raytracing`
- `bokeh`, `depth of field`, `blurred background`
- `blur`, `motion blur`, `soft focus`, `gaussian blur`
- `bloom`, `glow effect`, `lens flare`
- `smooth gradients`, `anti-aliased`, `vector illustration`
- `oil painting`, `watercolor`, `concept art painting`

---

## 3. Quy ước đặt tên thư mục và tệp ảnh

1. **Tên thư mục món đồ:** Dùng chữ thường, nối bằng dấu gạch ngang (`kebab-case`), không dấu tiếng Việt.
   - Ví dụ: `bg-mat-phai`, `bg-mat-trai`, `con-thoi-go-mun`, `chia-khoa-dong-ba-chau`.
2. **Tên tệp ảnh chính thức (Bản chốt nộp):**
   - Đặt đúng mã định danh món đồ: `<item-id>.png`.
   - Ví dụ: `con-thoi-go-mun.png`, `c1-s1-buong-det.png`.
3. **Tên tệp ảnh nháp thử nghiệm (Bản chưa chốt):**
   - Đặt theo số thứ tự thử nghiệm: `<item-id>-v1.png`, `<item-id>-v2.png`, `<item-id>-v3.png`.
4. **Vị trí tệp:**
   - Ảnh gốc thiết kế lưu trực tiếp trong thư mục con tương ứng tại `docs/08-assets/...`.
   - Ảnh sử dụng trong mã nguồn ứng dụng sẽ được sao chép vào `public/assets/...` theo đúng đường dẫn được ghi chú trong README của từng món.

---

## 4. Hướng dẫn quy trình tạo ảnh (Step-by-Step Workflow)

Người tạo ảnh thực hiện theo 5 bước sau:

1. **Bước 1 - Mở tài liệu món cần vẽ:**
   - Truy cập vào thư mục của cảnh và mở tệp `README.md` của món đó (ví dụ: `docs/08-assets/chapter-1/c1-s1-buong-det-khoa-kin/con-thoi-go-mun/README.md`).
2. **Bước 2 - Lấy prompt và ghép khối style:**
   - Sao chép **Khối Style Chung** ở Mục 2.1.
   - Ghép tiếp với đoạn **Prompt tiếng Anh** đặc tả món đồ trong README của món.
3. **Bước 3 - Tiến hành tạo ảnh:**
   - Dán toàn bộ chuỗi câu lệnh vào Gemini / công cụ sinh ảnh chuyên dụng.
   - Tạo từ 2 đến 4 biến thể để lựa chọn.
4. **Bước 4 - Chọn lọc và hoàn thiện:**
   - Chọn biến thể bám sát nhất tiêu chuẩn pixel 16-bit và không bị lỗi anti-aliasing.
   - Đổi tên tệp thành `<item-id>.png` và lưu trực tiếp vào thư mục của món.
5. **Bước 5 - Cập nhật tiến độ:**
   - Mở lại `README.md` của món, chuyển trạng thái từ `Chưa có` thành `Đã hoàn thành`.
   - Cập nhật dấu tích `[x]` vào bảng tiến độ tổng trong `README.md` của Cảnh và của Chương.

---

## 5. Bảng tổng hợp số lượng Cảnh và Món cần vẽ toàn dự án

Dưới đây là bảng thống kê toàn bộ các tài nguyên hình ảnh cần sản xuất trong `docs/08-assets/`:

| Phân khu / Chương | Số cảnh | Số nền (Mặt phải / Trái) | Số vật phẩm & Điểm chạm | Tổng số món cần vẽ |
| :--- | :---: | :---: | :---: | :---: |
| **Màn Mở Đầu (Prologue - 2026)** | 2 | 3 (1 thường, 1 lật vải) | 10 | **13 món** |
| **Chương 1 (Vạn Phúc 1888)** | 3 | 5 (2 cảnh có lật vải) | 10 | **15 món** |
| **Chương 2 (Hà Nội 1935)** | 3 | 5 (2 cảnh có lật vải) | 10 | **15 món** |
| **Chương 3 (Sài Gòn 1962)** | 3 | 5 (2 cảnh có lật vải) | 9 | **14 món** |
| **Chương 4 (Nam Định 1982)** | 3 | 5 (2 cảnh có lật vải) | 9 | **14 món** |
| **Chương 5 (Hà Nội 2026)** | 3 | 4 (1 cảnh siêu thực hợp nhất) | 11 | **15 món** |
| **Nhân vật & Sprite (Characters)** | - | - | 10 nhân vật (60+ biểu cảm & tư thế) | **60+ sprite** |
| **Phòng phối đồ Studio (Trang phục & Phụ kiện)** | - | - | 10 áo dài, 8 phụ kiện, 5 hoa văn | **23 món** |
| **Giao diện người dùng (UI / HUD)** | - | 5 nền phân khu | 15 khung viền, thanh HUD, nút bấm | **20 món** |
| **TỔNG CỘNG TOÀN DỰ ÁN** | **17 cảnh** | **27 nền** | **124+ tài nguyên riêng biệt** | **~189 tài nguyên** |

---

Tài liệu này là quy chuẩn kỹ thuật bắt buộc xuyên suốt cho tất cả các đợt sản xuất tài nguyên đồ họa tiếp theo.
