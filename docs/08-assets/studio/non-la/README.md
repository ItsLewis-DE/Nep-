# Tài Nguyên Studio: Nón lá bài thơ (`non-la`)

- **Mã định danh:** `non-la`
- **Tên tiếng Việt:** Nón lá bài thơ
- **Phân loại:** ACCESSORY
- **Kích thước vẽ:** 64 × 96 pixel (khung chuẩn nhân vật Studio)
- **Lớp vẽ chỉ định (Layer):** `layer-6-head / layer-7-accessories`
- **Định dạng tệp gốc:** PNG Grayscale thang độ xám (Alpha channel)

## 1. Bảng 4 sắc xám chuẩn cho Palette Swapping
Sprite được thiết kế theo đúng 4 sắc độ xám để thuật toán Canvas hoán đổi màu thời gian thực:
1. **Vùng sáng phản quang (Highlight):** `#E0E0E0` (RGB: 224, 224, 224)
2. **Màu thân trang phục (Base Tone):** `#9E9E9E` (RGB: 158, 158, 158)
3. **Vùng tối nếp gấp vải (Shadow Tone):** `#616161` (RGB: 97, 97, 97)
4. **Đường viền nét vẽ (Outline):** `#212121` (RGB: 33, 33, 33)

## 2. Mô tả thiết kế cho họa sĩ pixel
Chiếc nón lá hình chóp nhọn đan từ lá nón thanh mảnh, chằm chỉ cước tinh xảo, soi lên ánh sáng thấy bài thơ và hoa văn ẩn. Nét vẽ bám sát khung cơ thể 64×96, dùng dithering chuyển sắc giữa Base và Shadow tạo độ rủ của lụa tơ tằm, viền pixel sắc cạnh, tuyệt đối không khử răng cưa.

## 3. Prompt tiếng Anh tạo ảnh chuẩn hóa
```text
16-bit pixel art style, crisp clean pixel outlines, strictly no anti-aliasing, limited retro color palette, authentic historical Vietnamese cultural aesthetic, high contrast, pixel-perfect sprite, sharp pixel grid, no blur, no smooth gradients, retro game asset: grayscale pixel art accessory sprite for 64x96 character canvas, classic conical leaf hat (nón lá), delicate bamboo rim stitching and smooth conical shape, rendered in exact 4 shades of gray (#E0E0E0 highlight, #9E9E9E base, #616161 shadow, #212121 outline) for palette swapping, transparent background
```

## 4. Tệp nộp và đường dẫn ứng dụng
- **Tên file cần nộp:** `non-la.png`
- **Đường dẫn app sử dụng:** `public/assets/studio/non-la.png`
- **Trạng thái:** Chưa có
