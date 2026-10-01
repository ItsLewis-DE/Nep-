# Danh Mục Tài Liệu Và Cấu Trúc Tài Nguyên Dự Án Tiệm May Nếp

Tài liệu này tổng hợp toàn bộ cây thư mục tài liệu kỹ thuật (`docs/`) và cây thư mục tài nguyên hình ảnh (`public/assets/`) của dự án Tiệm May Nếp, phục vụ bài dự thi Audition AI Arena Vietnam 2026. Mỗi tệp được định nghĩa kèm một dòng mô tả ngắn về vai trò và nội dung.

## 1. Cây thư mục tài liệu (`docs/`)

- `docs/README.md`: Dàn ý tổng thể toàn bộ tài liệu kỹ thuật và cấu trúc thư mục tài nguyên dự án.
- `docs/01-overview/README.md`: Mục lục và giới thiệu các tài liệu trong thư mục tổng quan.
- `docs/01-overview/decisions.md`: Các quyết định kiến trúc, giao diện, bảng màu, luồng onboarding và chỉ định model AI đã chốt (nguồn chân lý tối cao).
- `docs/01-overview/summary.md`: Bản tóm tắt dự án Tiệm May Nếp nộp ban giám khảo cuộc thi.
- `docs/02-plan/README.md`: Mục lục và tóm lược các tài liệu kế hoạch thực hiện.
- `docs/02-plan/requirements.md`: Bóc tách chi tiết yêu cầu đề bài, tiêu chí chấm điểm và ràng buộc thể lệ cuộc thi.
- `docs/02-plan/roadmap.md`: Lộ trình chi tiết từng ngày từ 30/09 đến 10/10/2026 và phương án cắt giảm dự phòng.
- `docs/03-features/README.md`: Mục lục và tóm lược các tài liệu đặc tả tính năng sản phẩm.
- `docs/03-features/feature-list.md`: Bảng tổng hợp toàn bộ 20 tính năng (F01-F20) kèm mức độ ưu tiên cho bản nộp 10/10.
- `docs/03-features/onboarding.md`: Đặc tả luồng khởi tạo diện mạo nhân vật tích hợp ngay tại sảnh sân nhà, tự chọn giới tính, không cần đăng nhập.
- `docs/03-features/hub.md`: Đặc tả sảnh sân nhà hoàng hôn pixel art, 4 biển gỗ điều hướng bốn phân khu và tương tác với mèo Nếp.
- `docs/03-features/studio.md`: Đặc tả Phòng phối đồ (Studio), thử đồ, bộ lọc sự kiện, chấm điểm màu và lookbook.
- `docs/03-features/closet-and-workshop.md`: Đặc tả Tủ đồ, Cửa hàng phụ kiện bằng Sen Ngọc và Xưởng may số hóa dùng Gemini.
- `docs/03-features/museum.md`: Đặc tả Bảo tàng tư liệu, đọc thẻ văn hóa có nguồn và tìm kiếm tư liệu.
- `docs/03-features/journey.md`: Đặc tả trò chơi giải đố Cốt truyện (chiếc rương cũ trên gác xép), cơ chế Lật vải (Fabric Flip) và đối đầu Ông Lệ.
- `docs/04-culture/README.md`: Mục lục và tóm lược kho tư liệu văn hóa y phục người Kinh.
- `docs/04-culture/garment-taxonomy.md`: Bảng phân loại chi tiết 4 phom dáng y phục người Kinh kèm chứng cứ lịch sử.
- `docs/04-culture/color-and-etiquette.md`: Quy chuẩn bảng màu truyền thống cho vải áo, quy tắc ứng xử lễ nghi và 5 luật cốt lõi trong Phòng phối đồ.
- `docs/04-culture/differentiation-guide.md`: Tiêu chí đối chiếu hình thái phân biệt áo dài với sườn xám và hanbok.
- `docs/04-culture/culture-cards.md`: 12 thẻ văn hóa y phục và lễ nghi người Kinh cho Bảo tàng (tứ thân, ngũ thân tay chẽn, áo tấc, Lemur, hôn phục, tang phục, Nhật bình, giao lĩnh, yếm, raglan, bà ba, khăn chầu áo ngự) kèm hoàn cảnh sử dụng và nguồn đối chiếu.
- `docs/04-culture/research.md`: Khảo cứu lịch sử 5 thời kỳ áo dài, 7 hủ tục xã hội cũ và phân biệt tín ngưỡng với mê tín trục lợi.
- `docs/04-culture/bibliography.md`: Thư mục tài liệu tham khảo chính sử, công trình khảo cứu và mức độ kiểm chứng.
- `docs/05-tech/README.md`: Mục lục và tóm lược các tài liệu kỹ thuật hệ thống.
- `docs/05-tech/architecture.md`: Kiến trúc kỹ thuật, bảo vệ khóa API phía server, Palette Swapping và 4 điểm tích hợp Gemini.
- `docs/06-design/README.md`: Mục lục và tóm lược hệ thống thiết kế và luồng người dùng.
- `docs/06-design/design-system.md`: Hệ thống thiết kế pixel art, bảng màu giao diện đo từ target, bảng màu truyền thống cho vải áo, khung pixel 3 lớp, phông chữ và quy tắc Lật vải.
- `docs/06-design/user-flows.md`: Sơ đồ luồng thao tác người dùng bằng Mermaid từ sảnh sân nhà đến Lookbook và luồng chơi game Cốt truyện.
- `docs/07-game/README.md`: Mục lục tài liệu thiết kế trò chơi Cốt truyện (chiếc rương cũ).
- `docs/07-game/story-bible.md`: Cẩm nang cốt truyện 5 chương, 5 thế hệ phụ nữ, thực thể Ông Lệ và cây gia phả gia tộc.
- `docs/07-game/characters/README.md`: Danh mục hồ sơ 12 nhân vật có lời thoại trong game.
- `docs/08-assets/`: Thư mục lưu trữ toàn bộ mô tả thiết kế, thông số kỹ thuật và prompt tạo hình ảnh cho từng phân cảnh, nhân vật và điểm chạm trong game.

## 2. Cây thư mục tài nguyên (`public/assets/`)

### 2.1. Màn hình ứng dụng (`public/assets/screens/`)

#### Sảnh sân nhà hoàng hôn (`public/assets/screens/main-shop/`)
- `public/assets/screens/main-shop/background.png`: Khung cảnh nền sảnh sân nhà pixel art với 4 biển gỗ điều hướng.
- `public/assets/screens/main-shop/ui-hud.png`: Cụm HUD góc trên bên phải hiển thị số Sen Ngọc, nút âm thanh và avatar.

#### Phòng phối đồ Studio (`public/assets/screens/studio/`)
- `public/assets/screens/studio/workbench-ui.png`: Khung giao diện phòng phối đồ kèm bục đứng của nhân vật.
- `public/assets/screens/studio/color-palette-bar.png`: Bảng chọn màu sắc vải dệt truyền thống.
- `public/assets/screens/studio/lookbook-modal.png`: Khung hiển thị bộ ảnh chụp studio do AI tạo ra.

#### Tủ đồ và Xưởng may (`public/assets/screens/wardrobe/` và `public/assets/screens/workshop/`)
- `public/assets/screens/wardrobe/closet-shelf.png`: Giao diện ngăn kéo tủ đồ hiển thị danh sách áo dài đang sở hữu.
- `public/assets/screens/wardrobe/sen-ngoc-shop.png`: Cửa hàng mua sắm các loại phụ kiện truyền thống bằng Sen Ngọc thưởng.
- `public/assets/screens/workshop/sewing-machine.png`: Giao diện bàn máy may với khu vực kéo thả ảnh áo chụp ngoài đời.
- `public/assets/screens/workshop/analysis-scan-ui.png`: Hiệu ứng quét đường kim mũi chỉ khi hệ thống phân tích ảnh áo thật.

#### Bảo tàng tư liệu (`public/assets/screens/museum/`)
- `public/assets/screens/museum/bookshelf-view.png`: Giao diện kệ sách gỗ xếp các cuốn sổ tay văn hoá theo từng thời kỳ.
- `public/assets/screens/museum/card-modal.png`: Khung mở rộng đọc chi tiết thẻ lịch sử kèm mục ghi rõ nguồn tài liệu.

### 2.2. Nhân vật (`public/assets/characters/`)

#### Tuyến nhân vật chính và đồng hành
- `public/assets/characters/protagonist/`: Sprite An (nhân vật chính) đứng cơ bản (`base-idle.png`), avatar nam/nữ và các lớp thân người, quần trắng.
- `public/assets/characters/cat-nep/`: Sprite chú mèo Nếp (`cat-idle.png`, `cat-suggest.png`, `cat-walk.png`, `cat-alert.png`).
- `public/assets/characters/grandmother/`: Chân dung người bà thời trẻ (`portrait-young.png`) và biểu tượng thư tay (`letter-avatar.png`).
- `public/assets/characters/ong-le/`: Thực thể bóng đen Ông Lệ (`silhouette.png`, `whisper-effect.png`, `dissolve-anim.png`).

#### Tuyến nhân vật qua các thời kỳ lịch sử
- `public/assets/characters/cu-cam/`: Sprite Cụ Cố Tổ Nguyễn Thị Cầm năm 1888 (`cam-idle.png`, `cam-loom-work.png`).
- `public/assets/characters/cu-loan/`: Sprite Cụ Bà Trần Thị Loan năm 1935 (`loan-idle.png`, `loan-sketching.png`).
- `public/assets/characters/ba-mai/`: Sprite Bà Ngoại Lê Thị Mai năm 1962 (`mai-idle.png`, `mai-measuring.png`).
- `public/assets/characters/me-phuong/`: Sprite Mẹ Nguyễn Mai Phương năm 1982 (`phuong-idle.png`, `phuong-wedding.png`).

### 2.3. Cảnh trò chơi (`public/assets/scenes/`)

- `public/assets/scenes/prologue/`: Màn Mở Đầu 2026 - sảnh tiệm chiều (`c0-s1`), gác xép mặt phải & mặt trái lật vải (`c0-s2`).
- `public/assets/scenes/chapter-1/`: Chương 1 (1888) - buồng dệt khóa then (`c1-s1`), nhà thờ họ (`c1-s2`), cổng đình làng (`c1-s3`).
- `public/assets/scenes/chapter-2/`: Chương 2 (1935) - gác lửng vẽ tranh (`c2-s1`), kho vải Hàng Đào (`c2-s2`), phòng triển lãm (`c2-s3`).
- `public/assets/scenes/chapter-3/`: Chương 3 (1962) - tiệm may Đa Kao (`c3-s1`), phòng phong thủy (`c3-s2`), dinh thự Hội đồng (`c3-s3`).
- `public/assets/scenes/chapter-4/`: Chương 4 (1982) - căn hộ tập thể dệt (`c4-s1`), từ đường họ Nguyễn (`c4-s2`), sân từ đường (`c4-s3`).
- `public/assets/scenes/chapter-5/`: Chương 5 (2026) - sảnh tiệm bão mạng (`c5-s1`), trận địa chỉ vàng (`c5-s2`), sàn diễn thời trang (`c5-s3`).

### 2.4. Nhóm vật phẩm (`public/assets/items/`)

#### Trang phục áo dài (`public/assets/items/garments/`)
- `public/assets/items/garments/tu-than-nau-song.png`: Áo tứ thân chất liệu vải thô nhuộm củ nâu cho bối cảnh lao động.
- `public/assets/items/garments/tu-than-hoi-he.png`: Áo tứ thân nhiều lớp kết hợp yếm thắm dùng trong dịp trẩy hội.
- `public/assets/items/garments/ngu-than-tay-chen-nam.png`: Áo ngũ thân nam tay chẽn may phom đứng tôn vinh nét đĩnh đạc.
- `public/assets/items/garments/ngu-than-tay-chen-nu.png`: Áo ngũ thân nữ tay chẽn may ôm vừa vặn kín đáo.
- `public/assets/items/garments/ngu-than-tay-thung-le.png`: Áo tấc tay thụng thụng rộng dùng trong đại lễ và nghi thức cúng bái.
- `public/assets/items/garments/tan-thoi-lemur.png`: Áo dài tân thời dáng Le Mur với cổ lá sen và vai bồng năm 1934 (báo Phong Hóa số 90).
- `public/assets/items/garments/tan-thoi-hien-dai.png`: Áo dài tân thời học sinh vải lụa trắng trơn hai tà truyền thống.

#### Phụ kiện (`public/assets/items/accessories/`)
- `public/assets/items/accessories/khan-van-den.png`: Khăn vấn tóc bằng vải nhung đen quấn tròn đầu.
- `public/assets/items/accessories/khan-dong-vang.png`: Khăn đóng gấm vàng tạo nếp đều đặn trang nghiêm.
- `public/assets/items/accessories/non-ba-tam.png`: Nón ba tầm quai thao rộng vành chao nghiêng.
- `public/assets/items/accessories/guoc-moc-quai-nhung.png`: Đôi guốc mộc tiện bằng gỗ mỡ quai vải nhung đen.
- `public/assets/items/accessories/quat-giay-tram.png`: Chiếc quạt giấy trầm nan tre gập mở nhã nhặn.
- `public/assets/items/accessories/chuoi-ngoc-trai.png`: Vòng ngọc trai đeo cổ tạo điểm nhấn thanh lịch cho áo tân thời.

#### Hoạ tiết (`public/assets/items/patterns/`)
- `public/assets/items/patterns/hoa-sen-theu-tay.png`: Mẫu hoa sen cách điệu thêu chỉ tơ chìm trên tà áo.
- `public/assets/items/patterns/van-may-song-nuoc.png`: Hoa văn sóng nước và mây tản dệt bằng tơ tằm truyền thống.
- `public/assets/items/patterns/chu-tho-cach-dieu.png`: Họa tiết chữ thọ hình tròn viền cánh hoa in sắc sảo.
- `public/assets/items/patterns/canh-truc-in-chim.png`: Họa tiết cành trúc mảnh mai in nền tạo độ sâu cho mặt vải.

#### Vật phẩm trò chơi (`public/assets/items/game-items/`)
- `public/assets/items/game-items/chia-khoa-dong.png`: Chìa khóa đồng chạm khắc hoa văn mở khóa ngăn rương cũ.
- `public/assets/items/game-items/cuon-nhat-ky-rach.png`: Trang nhật ký ố vàng ghi lại tâm tư người bà khi phải theo lệ xưa.
- `public/assets/items/game-items/thuoc-go-chia-khac.png`: Thước thợ may bằng gỗ chia vạch cổ dùng đo đạc manh mối.
- `public/assets/items/game-items/keo-dong-cat-vai.png`: Cây kéo đồng rèn tay dùng cắt đứt các sợi chỉ ràng buộc.
- `public/assets/items/game-items/kim-theu-vang.png`: Cây kim thêu bằng đồng lưu giữ ký ức người thợ may cũ.
