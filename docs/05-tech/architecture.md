File: docs/05-tech/architecture.md

# Kiến Trúc Kỹ Thuật Ứng Dụng Tiệm May Nếp

Tài liệu này xác định kiến trúc tổng thể, luồng xử lý dữ liệu và thiết kế kỹ thuật cho ứng dụng Tiệm May Nếp trên nền tảng Google AI Studio. Kiến trúc được thiết kế tối ưu cho trải nghiệm web di động, có lớp máy chủ proxy nội bộ (Node.js/Express) để bảo vệ tuyệt đối khóa bí mật `GEMINI_API_KEY`, không bao giờ để lộ ra trình duyệt người dùng.

## 1. Sơ đồ luồng dữ liệu tổng thể (Mermaid)

```mermaid
flowchart TD
    subgraph Client [Trình duyệt di động - React SPA]
        UI[Giao diện Pixel Art Canvas & DOM]
        State[Quản lý trạng thái & LocalStorage]
        PaletteEngine[Bộ chuyển đổi bảng màu Canvas 64x96]
        RuleEngine[Bộ kiểm tra văn hóa & quy tắc phối màu]
    end

    subgraph Server [Máy chủ ứng dụng - Express Backend Proxy]
        API_Route[/api/gemini/* Proxy Router]
        KeyStore[Bảo mật GEMINI_API_KEY từ Biến môi trường]
        Validator[Bộ kiểm tra dữ liệu đầu vào & Giới hạn tần suất]
    end

    subgraph GoogleAI [Google Gemini API]
        GeminiFlash[gemini-2.5-flash / Phân tích hình ảnh & văn bản]
        GeminiImage[imagen-3.0-generate-002 / Tạo ảnh Lookbook chân thực]
    end

    UI --> State
    State --> PaletteEngine
    State --> RuleEngine
    RuleEngine --> UI

    UI -->|Gửi yêu cầu kèm ảnh Base64 / tham số| API_Route
    API_Route --> Validator
    Validator --> KeyStore
    KeyStore -->|Kèm API Key an toàn phía server| GoogleAI
    GoogleAI -->|Trả về JSON có cấu trúc hoặc URL ảnh| API_Route
    API_Route -->|Dữ liệu JSON sạch| UI

    State <--->|Lưu trữ tủ đồ, xu, tiến trình không cần đăng nhập| LocalStorage[(LocalStorage thiết bị)]
```

## 2. Bốn điểm tích hợp Gemini trong ứng dụng

Nhóm mình chỉ sử dụng Gemini cho các tác vụ xử lý thị giác và tạo hình ảnh chân thực. Toàn bộ kiến thức lịch sử, nội dung thẻ văn hóa và kịch bản thoại đều được nhóm mình biên soạn cố định trong mã nguồn máy khách để bảo đảm độ chính xác 100%.

### 2.1. Đọc ảnh selfie để tạo nhân vật ban đầu
- Mục tiêu: Bóc tách nhanh đặc điểm bề ngoài từ ảnh selfie người dùng tải lên, phục vụ việc chọn các lớp sprite pixel tương ứng.
- Mô hình sử dụng: `gemini-2.5-flash`.
- Dữ liệu gửi đi (Payload): Hình ảnh selfie đã được nén giảm độ phân giải xuống dưới 512x512 pixel ở định dạng Base64, kèm prompt yêu cầu phân tích hình thể và trả về JSON chuẩn hóa.
- Cấu trúc JSON nhận về (Schema):
```json
{
  "gender_presentation": "male | female | neutral",
  "hair_length": "short | medium | long",
  "hair_color_tone": "black | dark_brown | light_brown",
  "has_glasses": true,
  "confidence_score": 0.95
}
```
- Xử lý khi AI lỗi hoặc từ chối ảnh:
  - Nếu ảnh chụp không rõ khuôn mặt, ảnh quá mờ hoặc người dùng tải ảnh đồ vật, hệ thống hiển thị thông báo: "Tiệm chưa nhìn rõ khuôn mặt trong ảnh, bạn hãy tự chọn kiểu tóc và kính mắt bên dưới nhé!".
  - Khi gặp lỗi mạng, quá thời gian (timeout 5 giây) hoặc API từ chối: Tự động gán nhân vật mặc định (nữ, tóc ngang vai đen, mặc áo dài trắng) và đưa người dùng vào ngay giao diện điều chỉnh thủ công trong 2 giây.

### 2.2. Gợi ý ba bộ đồ theo sự kiện và thời tiết (Mèo Nếp)
- Mục tiêu: Chú mèo mướp Nếp đóng vai trò trợ lý, đề xuất 3 cách phối đồ phù hợp với bối cảnh sự kiện đã chọn và điều kiện thời tiết thực tế hoặc ngẫu nhiên.
- Mô hình sử dụng: `gemini-2.5-flash`.
- Dữ liệu gửi đi (Payload): Chuỗi định danh sự kiện (`event_id`), mùa hoặc thời tiết hiện tại (`weather_condition`), và danh mục mã các món đồ đang có sẵn trong catalog của tiệm.
- Cấu trúc JSON nhận về (Schema):
```json
{
  "suggestions": [
    {
      "outfit_name": "Tên bộ đồ (tối đa 25 ký tự)",
      "garment_id": "ngu_than_tay_chen_01",
      "primary_color_code": "#8B2500",
      "accessory_ids": ["khan_van_den", "guoc_moc"],
      "cat_comment": "Lời dặn ngắn của mèo Nếp (tối đa 40 từ)"
    }
  ]
}
```
- Xử lý khi AI lỗi hoặc từ chối:
  - Hệ thống tích hợp sẵn một danh mục dự phòng gồm 15 bộ phối chuẩn mực viết bằng mã nguồn tĩnh trong tệp `default-suggestions.ts`.
  - Nếu API lỗi hoặc phản hồi chậm quá 3 giây, mèo Nếp sẽ lập tức lấy 3 bộ tương ứng từ danh mục tĩnh này ra hiển thị, kèm câu thoại: "Nếp đã chọn sẵn 3 bộ truyền thống chuẩn mực nhất cho dịp này rồi đây mướp!".

### 2.3. Đọc ảnh áo ngoài đời trong Xưởng may
- Mục tiêu: Phân tích hình thái một chiếc áo thật do người dùng chụp ngoài đời. Nếu là áo dài thì số hóa thành áo pixel đưa vào tủ đồ; nếu là sườn xám hoặc hanbok thì kích hoạt bảng giải thích khác biệt.
- Mô hình sử dụng: `gemini-2.5-flash`.
- Dữ liệu gửi đi (Payload): Ảnh chụp chiếc áo thực tế ngoài đời, kèm chỉ dẫn nhận diện đặc điểm cấu trúc (số tà, đường xẻ eo, cổ áo, cách mặc cùng quần dài hay váy xòe).
- Cấu trúc JSON nhận về (Schema):
```json
{
  "is_vietnamese_traditional": true,
  "foreign_garment_type": "none | qipao_cheongsam | hanbok | other",
  "identified_silhouette": "tu_than | ngu_than_tay_chen | ngu_than_tay_thung | tan_thoi | unknown",
  "dominant_color_hex": "#A23B2A",
  "secondary_color_hex": "#F4E0B9",
  "collar_type": "high_mandarin | round | lotus",
  "pattern_type": "plain | floral | geometric | embroidered_crests",
  "differentiation_explanation": "Đoạn văn giải thích ngắn gọn lý do phân loại nếu phát hiện sườn xám hoặc hanbok"
}
```
- Xử lý khi AI lỗi hoặc từ chối:
  - Nếu người dùng tải ảnh không phải quần áo, hệ thống báo: "Thợ may chưa thấy dáng áo dài nào trong hình. Bạn hãy thử chụp lại một chiếc áo rõ nét hơn nhé!".
  - Nếu mất mạng hoặc API lỗi: Hệ thống mở ngay khung "May đo thủ công", cho phép người dùng tự bấm chọn 3 đặc điểm (Dáng áo, Màu sắc, Hoa văn) để hoàn thành chiếc áo pixel và vẫn nhận đủ 50 xu thưởng.

### 2.4. Tạo bốn bức ảnh Lookbook chân thực
- Mục tiêu: Xuất ra bộ 4 ảnh chụp chân thực người mẫu mặc chính xác bộ trang phục người dùng vừa phối, đặt trong không gian studio truyền thống Việt Nam.
- Mô hình sử dụng: `imagen-3.0-generate-002` (hoặc `gemini-2.5-flash` tạo sinh hình ảnh qua chế độ sinh ảnh của Google AI Studio).
- Dữ liệu gửi đi (Payload): Prompt mô tả chi tiết bằng tiếng Anh đặc tả bộ trang phục vừa phối: tên dáng áo, chi tiết đường viền, mã màu vải, chất liệu lụa tơ tằm, các phụ kiện đi kèm (khăn vấn, nón, quạt) và bối cảnh studio ánh sáng tự nhiên ấm áp, phong cách nhiếp ảnh chân dung tư liệu 35mm.
- Cấu trúc phản hồi: Trả về mảng 4 chuỗi Base64 hoặc đường dẫn hình ảnh đã được đóng dấu nhãn bản quyền "Ảnh do AI tạo".
- Xử lý khi AI lỗi hoặc từ chối:
  - Nếu nội dung bị bộ lọc an toàn (Safety Filter) từ chối hoặc máy chủ sinh ảnh quá tải quá 12 giây: App hủy tiến trình và hiển thị thông báo: "Studio đang bận dọn phòng chụp. Tiệm xuất bản phác thảo pixel độc quyền tặng bạn nhé!".
  - App lập tức dùng thẻ canvas nội bộ xuất ra một tấm ảnh tổng hợp Polaroid pixel art sắc nét gồm nhân vật, tên người phối và các món đồ đi kèm, hỗ trợ người dùng bấm nút tải ảnh về máy ngay lập tức.

## 3. Kiến trúc nhân vật Pixel Art ghép lớp và chuyển đổi bảng màu

Nhân vật trong app được xây dựng theo tiêu chuẩn khung lưới chuẩn **64 × 96 pixel**. Tỷ lệ này vừa đủ sắc nét để thể hiện nếp áo, tà xẻ và hoa văn truyền thống trên màn hình điện thoại dọc, vừa tối ưu hiệu năng vẽ trên thẻ HTML5 Canvas.

### 3.1. Cấu trúc xếp chồng các lớp (Sprite Layers)
Hình ảnh nhân vật hoàn chỉnh là sự tổng hợp từ 8 lớp đồ họa vẽ đè lên nhau từ dưới lên trên:
1. `layer-0-shadow`: Bóng chân nhân vật trên mặt đất.
2. `layer-1-body`: Khối cơ thể, dáng đứng, tông màu da cơ bản.
3. `layer-2-pants`: Quần lụa dài hai ống (màu trắng hoặc đen, rủ xuống chạm mu bàn chân).
4. `layer-3-inner`: Lớp áo lót trong (áo yếm đối với tứ thân, áo lót trắng đối với ngũ thân và áo tấc).
5. `layer-4-garment-back`: Tà áo sau rủ dài.
6. `layer-5-garment-front`: Tà áo trước, cổ áo, hàng khuy cài và đường xẻ tà bên sườn.
7. `layer-6-head`: Khuôn mặt, kiểu tóc và phụ kiện trên đầu (khăn vấn, khăn đóng hoặc nón quai thao).
8. `layer-7-accessories`: Phụ kiện cầm tay hoặc đeo thêm (quạt giấy, chuỗi hạt, guốc mộc).

### 3.2. Cơ chế thay đổi màu áo bằng Palette Swapping
Để tránh việc phải vẽ và tải hàng trăm tệp ảnh màu khác nhau, nhóm mình áp dụng kỹ thuật hoán đổi bảng màu (Palette Swapping) trực tiếp trên Canvas:
- Toàn bộ sprite áo gốc trong tài nguyên `assets/` được vẽ bằng thang độ xám (grayscale) gồm đúng 4 sắc độ chỉ số: Vùng sáng (Highlight), Màu thân (Base), Vùng tối nếp gấp (Shadow), và Đường viền (Outline).
- Khi người dùng chọn một màu sắc truyền thống (ví dụ: màu củ nâu, màu điều hoặc lam ngọc), hệ thống cung cấp một mảng 4 giá trị màu hex tương ứng.
- Hàm vẽ Canvas đọc dữ liệu điểm ảnh (`ImageData`), duyệt qua từng pixel và ánh xạ 4 mức xám sang 4 mã màu đích theo thời gian thực (xử lý dưới 16 mili-giây cho một khung hình 64x96).
- Kỹ thuật này giúp dung lượng tải ứng dụng cực nhẹ, đồng thời người dùng có thể đổi màu áo mượt mà không có độ trễ tải ảnh.

## 4. Mô tả các trường dữ liệu trong Catalog hệ thống

Toàn bộ dữ liệu catalog được tổ chức theo cấu trúc trường rõ ràng trong mã nguồn máy khách (`src/data/catalog.ts`), không đòi hỏi truy vấn cơ sở dữ liệu từ xa:

### 4.1. Catalog trang phục (`GarmentItem`)
- `id`: Chuỗi định danh duy nhất (ví dụ: `ngu-than-tay-chen-nam`).
- `name`: Tên tiếng Việt chính thức của trang phục (ví dụ: "Áo ngũ thân tay chẽn").
- `silhouette`: Nhóm phom dáng (`tu_than`, `ngu_than_tay_chen`, `ngu_than_tay_thung`, `tan_thoi`).
- `historical_period`: Thời kỳ lịch sử (`thoi_le`, `thoi_nguyen`, `thap_nien_1930`, `hien_dai`).
- `default_color_palette`: Bộ 4 mã màu mặc định của trang phục.
- `supported_events`: Mảng các mã sự kiện phù hợp (`tet`, `dam_cuoi`, `be_giang`, `le_chua`, `vieng_tang`, `dao_pho`).
- `cultural_summary`: Đoạn văn ngắn 2 câu giải thích nguồn gốc và cấu trúc của áo.
- `sprite_base_path`: Đường dẫn tới tệp sprite gốc dạng thang độ xám trong thư mục assets.

### 4.2. Catalog phụ kiện (`AccessoryItem`)
- `id`: Chuỗi định danh (ví dụ: `khan-van-den`).
- `name`: Tên phụ kiện (ví dụ: "Khăn vấn nhung đen").
- `category`: Phân loại (`headwear`, `footwear`, `handheld`, `jewelry`).
- `coin_price`: Giá mua bằng xu (0 nếu là phụ kiện mặc định ban đầu).
- `cultural_note`: Lời giải thích ngắn về cách đội hoặc cầm đúng phép tắc.
- `gender_compatibility`: Thích hợp cho nam, nữ hoặc cả hai (`male`, `female`, `unisex`).

### 4.3. Catalog sự kiện (`EventContext`)
- `id`: Chuỗi định danh sự kiện (`tet`, `dam_cuoi`, `be_giang`, `le_chua`, `vieng_tang`, `dao_pho`).
- `title`: Tên sự kiện hiển thị trên thẻ chọn.
- `recommended_silhouettes`: Mảng các phom dáng áo được khuyên dùng theo phép tắc cổ truyền.
- `prohibited_color_tones`: Mảng các tông màu cần tránh (kích hoạt cảnh báo nhắc nhở nếu người dùng chọn).
- `weather_presets`: Các trạng thái thời tiết đi kèm (nắng ấm, se lạnh, mưa xuân).

### 4.4. Catalog thẻ văn hóa Bảo tàng (`CultureCardItem`)
- `id`: Chuỗi định danh thẻ (ví dụ: `card-ngu-than-minh-mang`).
- `title`: Tiêu đề thẻ tư liệu.
- `time_period`: Niên đại lịch sử.
- `historical_fact`: Đoạn văn trình bày sự thật lịch sử có tài liệu chứng minh.
- `folklore_note`: Đoạn văn ghi chú các quan niệm truyền khẩu dân gian.
- `citations`: Mảng các nguồn sách sử đã đối chiếu kèm tên tác giả và năm xuất bản.
- `coin_reward`: Số xu thưởng khi đọc xong (mặc định 15 xu).

## 5. Chính sách quyền riêng tư và dán nhãn AI có trách nhiệm

Nhóm mình tuân thủ nghiêm ngặt nguyên tắc AI Có Trách Nhiệm (Responsible AI) theo thể lệ cuộc thi:

1. Bảo vệ tuyệt đối hình ảnh cá nhân:
   - Ảnh selfie của người dùng và ảnh áo thật tải lên Xưởng may chỉ được nạp tạm vào bộ nhớ RAM của trình duyệt dưới dạng tệp Blob/Base64 để gửi qua kết nối bảo mật HTTPS tới mô hình Gemini.
   - Ứng dụng không lưu trữ ảnh gốc của người dùng vào bất kỳ máy chủ, cơ sở dữ liệu hay bộ nhớ vĩnh viễn nào. Sau khi hoàn thành phân tích bóc tách thuộc tính thành chuỗi JSON, biến ảnh tạm sẽ được giải phóng ngay khỏi bộ nhớ.

2. Quyền kiểm soát và sự đồng thuận của người dùng:
   - Trước khi mở máy ảnh hoặc tải tệp, ứng dụng luôn hiển thị hộp thoại thông báo ngắn rõ ràng: "Tiệm chỉ dùng ảnh này một lần duy nhất để đọc nếp áo, không lưu lại hình ảnh của bạn".
   - Người dùng có toàn quyền từ chối tải ảnh và sử dụng các nhân vật mẫu hoặc chọn thông số áo bằng tay bất kỳ lúc nào.

3. Nhãn định danh nội dung do AI tạo ra (AI Watermarking & Disclosure):
   - Mọi bức ảnh được sinh ra từ tính năng Lookbook chân thực đều được tự động chèn dải nhãn chữ mờ ở góc dưới bên phải: `Ảnh do AI tạo - Tiệm May Nếp 2026`.
   - Trong giao diện Lookbook có dòng chú thích minh bạch: "Bộ ảnh được mô phỏng bằng công nghệ Google Gemini dựa trên phong cách phối đồ của bạn".
