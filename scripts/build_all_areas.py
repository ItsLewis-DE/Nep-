import os, glob, re, shutil

# Mapping of chapters and scenes
chapters_data = {
    "chapter-1": {
        "title": "Chương 1: Tiếng Thoi Trong Đêm (1888)",
        "scenes": {
            "c1-s1-buong-det-khoa-kin": {
                "name": "Gian Buồng Dệt Khóa Then",
                "desc": "Gian buồng dệt lụa tơ tằm cổ kính thời Nguyễn năm 1888. Ánh trăng luồn qua khe cửa sổ gỗ chấn song rọi lên khung cửi gỗ mun bóng nhẫy. Vách đất đắp rơm mộc mạc, góc phòng có chiếc chõng tre phủ chiếu rách. Khung cửa gỗ lim bị gài then khóa ngoài chắc chắn. Không vẽ nhân vật lên nền cảnh, để trống lối đi ở giữa từ chõng tre qua khung cửi tới cửa chính.",
                "en": "Atmospheric historic 1888 northern Vietnamese silk weaving workshop room, moonlight streaming through slatted wooden barred window casting long dramatic shadows, traditional large wooden foot-treadle loom made of polished dark ebony, rustic straw-reinforced mud walls, simple bamboo sleeping bed, sturdy wooden door locked with external bolt, wide clear walking pathway in center, no people on background",
                "characters": "- Cụ Cố Tổ Nguyễn Thị Cầm (trỏ `characters/cu-cam`): Thợ dệt trẻ đang bị giam lỏng, dáng ngồi kiệt sức bên khung cửi nhưng ánh mắt kiên nghị.\n- Nhà thiết kế An (trỏ `characters/an`): Xuất hiện kết nối tâm thức đồng hành giải đố.\n- Mèo Nếp (trỏ `characters/cat-nep`): Ngồi trên bệ cửa sổ, dùng móng chỉ vào then cài cửa.",
                "objects": "- Khung cửi gỗ mun (gộp `hitbox-loom`): Đặt ở phía bên trái gian phòng. Người chơi tương tác để gỡ lấy con thoi gỗ mun nhọn hoắt trỏ `items/con_thoi_go_mun`.\n- Chiếc chõng tre và thắt lưng chàm (gộp `hitbox-belt`): Đặt ở góc sau bên phải. Nhặt dải thắt lưng lụa chàm trỏ `items/that_lung_lua_cham`.\n- Khung cửa chính bị khóa then ngoài (gộp `hitbox-front-door`): Nằm ở chính giữa vách trước. Dùng dụng cụ móc then cửa chế tạo được để giật then, kích hoạt overlay cửa mở.\n- Cửa sổ chấn song gỗ (gộp `hitbox-back-window`): Nằm ở vách sau bên phải, nơi ánh trăng và mèo Nếp xuất hiện.\n- Bát cháo hoa nguội lạnh (gộp `hitbox-cold-porridge`): Đặt trên chiếc chõng tre, minh chứng cho sự giam cầm hà khắc.",
                "overlays": [
                    ("c1-s1--then-cua-mo.png", "Cửa chính sau khi giật then mở hé, ánh sáng lọt vào từ bên ngoài"),
                    ("c1-s1--khung-cui-mat-thoi.png", "Khung cửi sau khi đã lấy con thoi gỗ mun")
                ],
                "docs": [],
                "vfx": [
                    ("vfx-c1-s1-soi-chi-den.png", "Các sợi chỉ đen oán niệm của Ông Lệ siết chặt quanh chân khung cửi")
                ]
            },
            "c1-s2-ban-tho-nha-tho-ho": {
                "name": "Gian Nhà Thờ Họ Bùi",
                "desc": "Gian thờ tự thâm nghiêm của dòng tộc họ Bùi dưới thời phong kiến. Bàn thờ sơn son thếp vàng nghi ngút khói trầm, bức hoành phi chữ Nho 'Dực Bảo Trung Hưng' treo trang trọng bên trên. Ánh đèn dầu le lói chiếu lên sập gụ và lư đồng bám xỉ xanh. Không vẽ người trên nền cảnh, chừa lối đi từ cửa bước vào chiếu cúng.",
                "en": "Solemn historic northern Vietnamese ancestral shrine hall in 1888, red lacquer and gold leaf altar, brass incense burners emitting thin incense smoke curls, ancestral wooden plaques, wooden divan couch, flickering oil lamp light, solemn eerie atmosphere, clear path in center, no people on background",
                "characters": "- Bà Lớn (trỏ `characters/ba-lon`): Vợ cả trưởng tộc, nét mặt nghiêm nghị cay nghiệt cầm tràng hạt.\n- Trưởng tộc Bùi Văn Thân (trỏ `characters/truong-toc-bui`): Đứng bên sập gụ với vẻ hung hãn.\n- Nhà thiết kế An (trỏ `characters/an`): Lẻn vào tìm kiếm bằng chứng.",
                "objects": "- Bàn thờ gia tộc và lư hương đồng (gộp `hitbox-incense-burner`): Đặt chính giữa gian thờ. Tương tác phát hiện ngăn bí mật giấu lá thư tay trỏ `items/buc_thu_tay_chong_cu_Cam`.\n- Tấm biển tiết hạnh khả phong (gộp `hitbox-honor-plaque`): Treo bên vách trái, tương tác để bóc trần sự thật sau khi giải đố.\n- Chiếc tráp gỗ trắc khảm ốc: Đặt trên sập gụ bên phải, chứa tờ văn tự cầm cố đất làng trỏ `items/to_van_tu_cam_co_dat`.",
                "overlays": [
                    ("c1-s2--ngan-bi-mat-ban-tho.png", "Hộc gỗ bí mật dưới chân bàn thờ bật mở hé lộ kỷ vật"),
                    ("c1-s2--trap-go-mo.png", "Chiếc tráp gỗ trắc bật nắp sau khi mở khóa")
                ],
                "docs": [
                    ("doc-c1-s2-thu-tay-chong-cu-cam.png", "Bức thư tay mực Nho người chồng gửi lại, không có chữ, UI phủ chữ"),
                    ("doc-c1-s2-van-tu-cam-co-dat.png", "Tờ văn tự cầm cố đất làng của Trưởng tộc, không có chữ, UI phủ chữ")
                ],
                "vfx": [
                    ("vfx-c1-s2-khoi-tram-am-u.png", "Làn khói trầm uốn lượn biến hình thành bóng đen Ông Lệ trườn trên xà nhà")
                ]
            },
            "c1-s3-cong-dinh-doi-dau": {
                "name": "Cổng Đình Làng Vạn Phúc",
                "desc": "Quang cảnh sân đình cổ kính dưới tán cây đa cổ thụ trăm tuổi trong buổi chiều tà năm 1888. Cổng tam quan mái ngói mũi hài rêu phong, bậc thềm đá xanh dẫn ra con đường đất liên thôn. Lá bàng đỏ rụng đầy sân đình trong cơn gió lạnh. Không vẽ nhân vật lên nền cảnh, để trống khoảng sân rộng làm nơi đối chất.",
                "en": "Historic Vietnamese village communal temple stone gate in late afternoon 1888, mossy curved ceramic tiled roofs, ancient massive banyan tree with dangling aerial roots, worn blue stone steps leading to rustic dirt path, autumn wind scattering dried leaves, wide open courtyard, no people on background",
                "characters": "- Cụ Cầm (trỏ `characters/cu-cam`): Đứng hiên ngang trước cổng đình, mặc áo ngũ thân kiên định.\n- Trưởng tộc Bùi Văn Thân (trỏ `characters/truong-toc-bui`): Đứng bên bậc đá đình làng đối chất.\n- Dân làng Vạn Phúc: Đứng vây quanh chứng kiến sự thật.",
                "objects": "- Bậc thềm đá đình làng (gộp `hitbox-stone-step`): Nằm ở bên trái sân đình, nơi các bô lão và trưởng tộc ngồi nghị sự.\n- Cổng đình làng mở rộng (gộp `hitbox-village-gate-exit`): Nằm ở phía bên phải, lối thoát dẫn ra thế giới tự do.",
                "overlays": [
                    ("c1-s3--cong-dinh-pha-le.png", "Cổng đình làng mở toang ánh hoàng yến soi rọi lối đi")
                ],
                "docs": [],
                "vfx": [
                    ("vfx-c1-s3-ong-le-tan-bien.png", "Bóng đen Ông Lệ gầm rú tan biến khi sự thật danh dự được bóc trần")
                ],
                "cg": [
                    ("cg-c1-cu-cam-tu-do.png", "Cảnh cao trào Cụ Cầm cất bước rời khỏi cổng đình Vạn Phúc hướng về ánh bình minh tự do")
                ]
            }
        }
    },
    "chapter-2": {
        "title": "Chương 2: Tà Áo Tân Thời (1935)",
        "scenes": {
            "c2-s1-gac-lung-ve-tranh": {
                "name": "Gác Lửng Vẽ Tranh Của Cụ Loan",
                "desc": "Căn gác lửng tràn ngập ánh sáng nghệ thuật tại phố Hàng Đào năm 1935. Cửa sổ vòm kính kiểu Pháp nhìn ra rặng xà cừ cổ thụ. Bàn vẽ bằng gỗ sồi ngổn ngang các bản thảo phác họa áo dài Lemur, bút lông, cọ vẽ và lọ mực nho. Các giá vẽ phủ toan dầu xếp quanh phòng. Không vẽ người trên nền, chừa lối đi từ cầu thang tới bàn vẽ.",
                "en": "1935 French Indochina artist mezzanine studio in Hanoi old quarter, arched French windows with soft daylight overlooking street, large wooden drafting desk with drafting tools and Ao Dai sketches, easels and oil canvases, wooden floor, spacious central path, no people on background",
                "characters": "- Cụ Bà Trần Thị Loan (trỏ `characters/cu-loan`): Họa sĩ trẻ yêu kiều, dáng ngồi phác thảo áo tân thời.\n- An (trỏ `characters/an`): Quan sát và hỗ trợ ghép các mảnh bản vẽ.\n- Mèo Nếp (trỏ `characters/cat-nep`): Nằm sưởi nắng bên bậu cửa kính.",
                "objects": "- Bàn vẽ nghệ thuật (gộp `hitbox-drawing-desk`): Đặt ở trung tâm gian phòng, nơi người chơi thu thập 4 mảnh bản vẽ trỏ `items/manh_ban_ve_ao_dai_1` đến `4`.\n- Cửa sổ kiểu Pháp (gộp `hitbox-french-window`): Nằm ở vách sau, đón ánh sáng tự nhiên.\n- Giá treo tranh mẫu: Đặt bên vách trái, hiển thị tranh sơn dầu áo dài Lemur.",
                "overlays": [
                    ("c2-s1--ban-ve-ghep-hoan-chinh.png", "Mặt bàn vẽ sau khi ghép đủ 4 mảnh bản vẽ áo dài tân thời hoàn chỉnh")
                ],
                "docs": [
                    ("doc-c2-s1-ban-ve-ao-dai-lemur.png", "Bản thiết kế áo dài Lemur 1934 hoàn chỉnh, không có chữ, UI phủ chữ")
                ],
                "vfx": [
                    ("vfx-c2-s1-nang-qua-kinh.png", "Vạt nắng vàng mỡ gà chiếu rọi bụi màu bay lơ lửng")
                ]
            },
            "c2-s2-kho-vai-hang-dao": {
                "name": "Kho Vải Hàng Đào Của Cả Nghị",
                "desc": "Gian kho chứa vải gấm tối tăm và nồng mùi băng phiến của gia đình tư sản Cả Nghị năm 1935. Những chồng vải lụa tơ tằm, gấm vóc xếp cao ngất ngưởng trên các giá gỗ lim. Chiếc đồng hồ đứng kiểu Pháp cao hơn 2m gõ nhịp tích tắc u ám ở góc phòng. Chiếc két sắt bằng thép đúc sừng sững bên cạnh bàn sổ sách. Không vẽ người lên nền cảnh.",
                "en": "Dark oppressive textile warehouse in 1935 Hanoi, towering shelves stacked with bolts of silk and brocade fabrics, imposing 2-meter tall antique French grandfather clock in corner, heavy iron safe beside oak office desk, dramatic chiaroscuro lighting, wide central walkway, no people on background",
                "characters": "- Cả Nghị (trỏ `characters/ca-nghi`): Nhà buôn giàu có, trang phục áo ngũ thân gấm tây bóng bẩy.\n- An (trỏ `characters/an`): Lẻn vào mở két sắt tìm biên lai trả nợ.",
                "objects": "- Chiếc đồng hồ đứng kiểu Pháp (gộp `hitbox-grandfather-clock`): Đặt ở góc trái, tương tác tháo quả lắc tìm chìa khóa két trỏ `items/chia_khoa_ket_sat_bang_thau`.\n- Chiếc két sắt sắt đúc (gộp `hitbox-iron-safe`): Đặt ở phía sau bên phải, mở khóa thu thập biên lai trả nợ gốc trỏ `items/bien_lai_tra_no_goc_1935` và bản giao kèo trỏ `items/ban_giao_keo_ep_hon`.\n- Chồng vải lụa Hàng Đào: Xếp dọc hai bên tường.",
                "overlays": [
                    ("c2-s2--dong-ho-thao-qua-lac.png", "Cửa kính đồng hồ mở toang, quả lắc đã bị tháo chốt"),
                    ("c2-s2--ket-sat-bat-mo.png", "Cửa két sắt bằng thau mở toang hé lộ các ngăn tài liệu")
                ],
                "docs": [
                    ("doc-c2-s2-bien-lai-tra-no-1935.png", "Tờ biên lai trả nợ gốc năm 1935, không có chữ, UI phủ chữ"),
                    ("doc-c2-s2-ban-giao-keo-ep-hon.png", "Bản giao kèo ép duyên gán nợ, không có chữ, UI phủ chữ")
                ],
                "vfx": [
                    ("vfx-c2-s2-bong-den-ong-le.png", "Bóng đen Ông Lệ trườn quanh các cuộn vải gấm")
                ]
            },
            "c2-s3-phong-trien-lam-doi-dau": {
                "name": "Phòng Triển Lãm Mỹ Thuật Đông Dương",
                "desc": "Đại sảnh triển lãm mỹ thuật sang trọng thập niên 1930 với sàn lát đá cẩm thạch trắng đen đan xen. Các thức cột trụ Doric phong cách thuộc địa, trên tường treo các tác phẩm hội họa đương đại. Chính giữa sảnh là bục danh dự trưng bày bộ sưu tập áo dài tân thời. Không vẽ người trên nền cảnh, chừa khoảng sàn rộng cho cuộc tranh biện.",
                "en": "Grand 1930s French Indochina art exhibition gallery hall, checkerboard marble tiled floor, neo-classical colonial pillars, framed fine art oil paintings, ceremonial exhibition podium in center, bright ambient chandelier lighting, grand open space, no people on background",
                "characters": "- Cụ Loan (trỏ `characters/cu-loan`): Diện áo dài tân thời màu vàng mỡ gà tự tin thuyết trình.\n- Cả Nghị (trỏ `characters/ca-nghi`): Bị bóc trần sự thật bẽ bàng trước công luận.\n- Phóng viên và công chúng Hà thành (gộp `hitbox-reporters-crowd`).",
                "objects": "- Bục trưng bày triển lãm (gộp `hitbox-exhibition-podium`): Nằm ở trung tâm sảnh, nơi trình diện bản thiết kế và biên lai trả nợ.\n- Khung tranh đối chiếu áo dài: Treo trên tường trung tâm.",
                "overlays": [
                    ("c2-s3--khung-tranh-vinh-danh.png", "Bức tranh áo dài tân thời được giương cao rực rỡ")
                ],
                "docs": [],
                "vfx": [
                    ("vfx-c2-s3-anh-den-chup-hinh.png", "Ánh chớp đèn flash máy ảnh của ký giả nổ sáng rực")
                ],
                "cg": [
                    ("cg-c2-ao-dai-tan-thoi-toa-sang.png", "Cảnh Cụ Loan kiêu hãnh sải bước trong bộ áo dài tân thời rực rỡ giữa tràng pháo tay của công chúng")
                ]
            }
        }
    },
    "chapter-3": {
        "title": "Chương 3: Cung Đàn Lạc Nhịp (1962)",
        "scenes": {
            "c3-s1-tiem-may-da-kao": {
                "name": "Tiệm May Đa Kao Sài Gòn",
                "desc": "Căn nhà phố sầm uất tại góc đường Đa Kao, Sài Gòn năm 1962. Cửa kính lớn nhìn ra đường phố xe cộ nhộn nhịp, biển hiệu chữ vẽ tay phong cách retro. Bên trong đặt bàn máy khâu đạp chân kiểu mới, giá treo áo dài cổ thuyền và áo tay raglan rực rỡ sắc màu (xanh ngọc, hồng sen). Chiếc máy hát đĩa than cổ điển đặt trên kệ gỗ. Không vẽ người lên nền, chừa lối đi lại rộng rãi.",
                "en": "Vibrant 1962 Saigon tailoring boutique in Da Kao district, large streetfront glass window, mid-century retro aesthetic, Singer sewing machine with pedal, racks of colorful boat-neck and raglan Ao Dai gowns in turquoise and pink silk, vintage vinyl turntable gramophone, clear walkway, no people on background",
                "characters": "- Bà Ngoại Lê Thị Mai (trỏ `characters/ba-mai`): Thợ may tài hoa trẻ tuổi, mặc áo dài cổ thuyền thanh lịch.\n- Vinh (trỏ `characters/vinh`): Nhạc sĩ trẻ, người yêu của bà Mai, ôm đàn ghita.\n- An (trỏ `characters/an`): Tìm kiếm manh mối hóa giải bùa chú.",
                "objects": "- Bàn máy khâu tiệm may (gộp `hitbox-sewing-machine-base`): Đặt ở bên trái, cạy viên gạch lỏng chân máy tìm thấy lá bùa trỏ `items/bua_chu_tru_yeu_2`.\n- Chậu mai chiếu thủy (gộp `hitbox-bonsai-pot`): Đặt trước cửa tiệm, tìm thấy lọ bùa giấy vàng trỏ `items/bua_chu_tru_yeu_1`.\n- Chiếc máy hát đĩa than (gộp `hitbox-gramophone`): Đặt trên kệ góc phải, phát bản tình ca Sài Gòn xưa.\n- Gác xép chứa vải (gộp `hitbox-fabric-attic`): Cầu thang nhỏ dẫn lên kho lụa tơ tằm.",
                "overlays": [
                    ("c3-s1--gach-chan-may-cay.png", "Viên gạch bông chân bàn máy khâu bị cạy hé lộ hộc giấu"),
                    ("c3-s1--chau-mai-dao-xoi.png", "Gốc chậu mai chiếu thủy đã đào xới lấy lọ bùa")
                ],
                "docs": [],
                "vfx": [
                    ("vfx-c3-s1-khoi-den-tan-bien.png", "Làn khói đen phong thủy hắc ám tan biến khi đào được bùa yểm")
                ]
            },
            "c3-s2-phong-phong-thuy": {
                "name": "Phòng Bói Toán Của Thầy Ba Càn",
                "desc": "Căn phòng u ám mờ ảo đầy vẻ mê tín dị đoan của thầy phù thủy Ba Càn năm 1962. Tấm gương bát quái lớn treo chính giữa tường, khói nhang trầm đặc quánh cay sè mắt. Trên bàn trải khăn đỏ bày la bàn phong thủy, chuông đồng, sọ khỉ và các xấp giấy sớ tử vi màu vàng. Chiếc rương gỗ khóa bát quái đặt ở góc tối. Không vẽ người trên nền cảnh.",
                "en": "Dark eerie occult feng shui fortune teller chamber in 1962, large wooden Bagua mirror on wall, dense smoky haze of incense, red felt table covered with feng shui compass, brass bell, yellow paper horoscope sheets, mystic atmosphere, clear walkway, no people on background",
                "characters": "- Thầy Ba Càn (trỏ `characters/thay-ba-can`): Thầy bói gian trá, mắt lấm lét, mặc áo đạo sĩ thêu quẻ.\n- An (trỏ `characters/an`): Đột nhập tìm chứng cứ mưu đồ lừa đảo.",
                "objects": "- Bàn bói toán phong thủy: Đặt ở trung tâm, nơi thu thập biên nhận tiền bói toán trỏ `items/bien_nhan_tien_thay_boi` và thư thỏa thuận trỏ `items/thu_tay_thoa_thuan_boi_toan`.\n- Chiếc rương khóa bát quái (gộp `hitbox-bagua-chest`): Đặt ở góc trái, giải đố ngũ hành để mở khóa lấy sổ tử vi gốc trỏ `items/so_tu_vi_nguyen_ban_1962`.\n- Gương bát quái (gộp `hitbox-bagua-mirror`): Treo trên vách tường chính diện.",
                "overlays": [
                    ("c3-s2--ruong-bat-quai-mo.png", "Rương gỗ mở toang hé lộ sổ tử vi nguyên bản"),
                    ("c3-s2--guong-bat-quai-vo.png", "Gương bát quái rạn nứt sau khi hóa giải tà khí")
                ],
                "docs": [
                    ("doc-c3-s2-so-tu-vi-goc.png", "Cuốn sổ lá số tử vi nguyên bản 1962, không có chữ, UI phủ chữ"),
                    ("doc-c3-s2-thu-thoa-thuan-boi.png", "Thư tay thỏa thuận bói toán vu khống, không có chữ, UI phủ chữ")
                ],
                "vfx": [
                    ("vfx-c3-s2-hoa-giai-ta-khi.png", "Tia sáng vàng kim tuyến bừng nở phá tan các sợi chỉ đen ám quẻ")
                ]
            },
            "c3-s3-dinh-thu-doi-dau": {
                "name": "Dinh Thự Hội Đồng Gia Tộc",
                "desc": "Phòng khách biệt thự sang trọng kiểu Pháp - Sài Gòn những năm 1960. Bộ bàn ghế salon gỗ cẩm lai khảm xà cừ đồ sộ, rèm lụa nhung đỏ buông rủ bên khung cửa sổ nhìn ra vườn cây nhiệt đới. Quạt trần cánh gỗ quay nhè nhẹ trên trần cao. Không vẽ người trên nền cảnh, chừa khoảng sàn rộng giữa bộ salon làm nơi đối chất.",
                "en": "Luxurious 1960s French-colonial Saigon villa living salon, opulent rosewood furniture inlaid with mother-of-pearl, heavy red velvet drapes, antique ceiling fan turning slowly, checkered floor tiles, grand space for confrontation, no people on background",
                "characters": "- Bà Mai (trỏ `characters/ba-mai`): Đứng đĩnh đạc trong chiếc áo dài cổ thuyền xanh ngọc bích.\n- Vinh (trỏ `characters/vinh`): Sát cánh bên bà Mai vạch trần âm mưu của mẹ và thầy bói (gộp `hitbox-vinh-support`).\n- Thầy Ba Càn (trỏ `characters/thay-ba-can`): Cúi đầu run sợ khi bị phơi bày chứng cứ.",
                "objects": "- Bàn salon cẩm lai (gộp `hitbox-salon-table`): Đặt ở trung tâm phòng khách, nơi trình diện sổ tử vi gốc và các lá bùa giả.\n- Bức hoành phi gia tộc: Treo trên tường danh dự.",
                "overlays": [
                    ("c3-s3--ban-salon-trinh-chung-cu.png", "Mặt bàn salon bày la liệt các chứng cứ bói toán lừa đảo")
                ],
                "docs": [],
                "vfx": [
                    ("vfx-c3-s3-anh-sang-chan-ly.png", "Ánh sáng chiếu rọi giải tỏa hiểu lầm oan ức cho bà Mai")
                ],
                "cg": [
                    ("cg-c3-tinh-yeu-ao-dai-co-thuyen.png", "Bà Mai và Vinh tay trong tay mỉm cười kiêu hãnh trước cửa tiệm may Đa Kao ngập tràn hoa tươi")
                ]
            }
        }
    },
    "chapter-4": {
        "title": "Chương 4: Đường Kim Mũi Chỉ (1982)",
        "scenes": {
            "c4-s1-can-ho-tap-the": {
                "name": "Căn Hộ Khu Tập Thể Dệt Nam Định",
                "desc": "Căn phòng nhỏ đơn sơ tại khu tập thể công nhân dệt Nam Định năm 1982 thời bao cấp. Tường vôi ve quét màu vàng nhạt đã bong tróc từng mảng. Chiếc đài cát-sét cũ chạy băng dây đặt trên nóc tủ gỗ mộc mạc, chiếc máy may con bướm bên khung cửa sổ nhìn ra sân phơi. Cuộn chỉ tơ đào và xấp vải phin trắng gấp gọn trên bàn làm việc. Không vẽ người lên nền cảnh.",
                "en": "Subdued 1982 Vietnamese subsidized-era textile workers collective apartment, peeling pale yellow lime walls, vintage cassette tape recorder on simple wooden shelf, mechanical butterfly sewing machine by window, folded white plain-cotton phin fabric, spool of peach silk thread, clear pathway, no people on background",
                "characters": "- Mẹ Nguyễn Mai Phương (trỏ `characters/me-phuong`): Nữ công nhân dệt trẻ tuổi, dịu dàng, đang hoàn thiện áo cưới.\n- An (trỏ `characters/an`): Giúp mẹ thêu cành hoa đào và tìm kiếm trang gia phả bị xé.",
                "objects": "- Chiếc đài cát-sét (gộp `hitbox-cassette-player`): Đặt trên tủ gỗ, tháo lấy cục nam châm loa đài trỏ `items/nam_cham_loa_dai`.\n- Xấp vải phin và kim thêu (gộp `hitbox-phin-fabric`): Đặt trên bàn máy may, thu thập kim thêu thép trỏ `items/kim_theu_thep` và chỉ tơ đào trỏ `items/cuon_chi_to_dao`.\n- Bàn thêu áo cưới: Nơi may chiếc áo dài cưới vải phin trỏ `items/chiec_ao_dai_cuoi_vai_phin`.",
                "overlays": [
                    ("c4-s1--ao-cuoi-theu-xong.png", "Chiếc áo dài cưới trên bàn đã thêu xong cành hoa đào đỏ thắm"),
                    ("c4-s1--loa-dai-thao-nam-cham.png", "Chiếc đài cát-sét đã tháo vỏ loa lộ lõi kim loại")
                ],
                "docs": [],
                "vfx": [
                    ("vfx-c4-s1-chi-vang-hoi-sinh.png", "Đường kim mũi chỉ phát ra ánh sáng vàng ấm áp khi thêu hoa")
                ]
            },
            "c4-s2-tu-duong-ho-nguyen": {
                "name": "Từ Đường Dòng Họ Nguyễn Ở Nam Định",
                "desc": "Gian từ đường cổ kính của họ Nguyễn tại vùng quê Nam Định năm 1982. Mái ngói rêu phong, hệ cột kèo gỗ lim sẫm màu vững chãi. Bàn thờ tổ trang nghiêm với các bài vị sơn son. Trên các xà nhà cao có giấu các hòm gỗ đựng tài liệu gia tộc. Chiếc rương gỗ chân quỳ đặt phía sau sập gỗ. Không vẽ người trên nền cảnh.",
                "en": "Ancient ancestral shrine house in Nam Dinh countryside 1882, mossy tiled roof, heavy dark seasoned timber beams and pillars, solemn ancestral altar with red memorial tablets, high roof rafters concealing old storage boxes, rustic wooden trunk, clear walking path in center, no people on background",
                "characters": "- Chú Sửu (trỏ `characters/chu-suu`): Người chú gia trưởng, lén lút cất giấu gia phả.\n- An (trỏ `characters/an`): Dùng nam châm và dụng cụ leo lên xà nhà tìm chứng cứ.",
                "objects": "- Xà nhà gỗ lim trên cao (gộp `hitbox-roof-beam`): Dùng nam châm hút chốt sắt lấy các trang gia phả bị xé trỏ `items/cac_trang_gia_pha_goc_bi_xe`.\n- Chiếc rương chân quỳ (gộp `hitbox-pedestal-chest`): Đặt dưới sập thờ, chứa sổ sách họ tộc cũ.",
                "overlays": [
                    ("c4-s2--xa-nha-lay-gia-pha.png", "Hộc xà nhà gỗ mở hé lộ vị trí giấu xấp giấy dó"),
                    ("c4-s2--ruong-chan-quy-mo.png", "Rương chân quỳ bật mở")
                ],
                "docs": [
                    ("doc-c4-s2-trang-gia-pha-xe.png", "Những trang gia phả chữ Nôm gốc ghi nhận công đức phụ nữ, không có chữ, UI phủ chữ")
                ],
                "vfx": [
                    ("vfx-c4-s2-bui-thoi-gian.png", "Bụi mù cổ xưa rơi xuống khi chạm vào hộc xà nhà")
                ]
            },
            "c4-s3-san-tu-duong-doi-dau": {
                "name": "Sân Từ Đường Đối Chất Dòng Họ",
                "desc": "Khoảng sân gạch đỏ trước nhà từ đường trong buổi họp họ đông đủ năm 1982. Cây bưởi ra hoa thơm ngát bên giếng đá rêu phong. Các bậc thềm đá dẫn lên gian thờ chính, nơi các bậc cao niên và chú bác trong họ đang ngồi chứng kiến. Không vẽ người lên nền cảnh, để trống trung tâm sân cho cuộc đối thoại.",
                "en": "Courtyard of Vietnamese countryside ancestral shrine hall in 1982, red brick pavers, blooming pomelo tree by ancient stone well, stone steps leading up to hall, wide clear courtyard for family gathering confrontation, no people on background",
                "characters": "- Cô Phương (trỏ `characters/me-phuong`): Diện chiếc áo dài cưới vải phin thêu hoa đào trang nhã, mắt rực sáng niềm tự hào.\n- Chú Sửu (trỏ `characters/chu-suu`): Bối rối buông rơi tập giấy biên bản (gộp `hitbox-uncle-suu`).\n- Các vị trưởng bối họ Nguyễn: Ngồi trên thềm đá (gộp `hitbox-ancestral-stone-step`).",
                "objects": "- Bậc thềm đá từ đường (gộp `hitbox-ancestral-stone-step`): Nơi các bô lão ngồi phân định.\n- Chiếc giếng cổ rêu phong: Đặt ở góc sân bên phải.",
                "overlays": [
                    ("c4-s3--bac-them-trao-gia-pha.png", "Bậc thềm đá sau khi các trang gia phả được xếp ngay ngắn vào gia phả dòng họ")
                ],
                "docs": [],
                "vfx": [
                    ("vfx-c4-s3-hoa-dao-roi.png", "Những cánh hoa đào bay lượn chúc phúc cho lễ cưới của cô Phương")
                ],
                "cg": [
                    ("cg-c4-dam-cuoi-ao-dai-phin.png", "Cảnh cô Phương rạng rỡ trong lễ cưới thời bao cấp bên cạnh chiếc xe đạp Thống Nhất và gia đình hòa thuận")
                ]
            }
        }
    },
    "chapter-5": {
        "title": "Chương 5: Nếp Áo Hồi Sinh (2026)",
        "scenes": {
            "c5-s1-tiem-may-bao-mang": {
                "name": "Tiệm May Nếp Trong Cơn Bão Mạng 2026",
                "desc": "Không gian Tiệm May Nếp năm 2026 kết hợp hài hòa giữa kiến trúc gỗ cổ phố Hàng Đào và các thiết bị số hóa công nghệ cao. Bàn làm việc trang bị máy quét 3D, màn hình máy tính hiển thị các luồng livestream và bình luận bão mạng. Giá treo các mẫu áo dài di sản phục dựng chuẩn mực. Không vẽ người lên nền cảnh.",
                "en": "Modern 2026 Hanoi heritage tailor workshop with high-tech digital restoration equipment, 3D fabric scanners, dual computer monitors glowing with livestream viral comments, antique wooden workbenches juxtaposed with modern technology, clear central path, no people on background",
                "characters": "- An (trỏ `characters/an`): Tập trung làm việc thâu đêm với sự trợ giúp của Mèo Nếp.\n- Mèo Nếp (trỏ `characters/cat-nep`): Ngồi bên bàn phím hỗ trợ số hóa.\n- Hoàng Lâm (trỏ `characters/hoang-lam`): Nhà thiết kế đối thủ, xuất hiện qua màn hình livestream.",
                "objects": "- Bàn máy quét số hóa (gộp `hitbox-digital-workshop-scanner`): Đặt ở trung tâm, quét mẫu áo và lập hồ sơ giám định trỏ `items/ho_so_giam_dinh_y_phuc_2026`.\n- Màn hình livestream (gộp `hitbox-livestream-screen`): Treo bên vách phải, hiển thị các bình luận đa chiều của cộng đồng mạng.",
                "overlays": [
                    ("c5-s1--may-quet-hoan-tat.png", "Màn hình máy quét hiển thị kết quả phân tích 3 sai phạm cấu trúc áo nhái")
                ],
                "docs": [
                    ("doc-c5-s1-ho-so-giam-dinh-2026.png", "Hồ sơ giám định di sản y phục 2026 với 3 luận điểm khoa học, không có chữ, UI phủ chữ")
                ],
                "vfx": [
                    ("vfx-c5-s1-tia-quet-laser.png", "Lưới tia laser xanh quét qua tà áo ngũ thân")
                ]
            },
            "c5-s2-tran-dia-chi-vang": {
                "name": "Trận Địa Chỉ Vàng Trong Tâm Thức",
                "desc": "Không gian siêu thực trong cõi dệt tâm thức của chiếc rương cổ năm thế hệ. Đài sen trung tâm phát ra ánh sáng vàng rực rỡ, xung quanh là mạng lưới hàng triệu sợi chỉ vàng đan cài như ma trận không gian thời gian. Bốn hướng Đông Tây Nam Bắc hội tụ linh hồn y phục của các thế hệ tổ tiên (Cụ Cầm, Cụ Loan, Bà Mai, Cô Phương). Không vẽ nhân vật lên nền cảnh, để trống đài sen trung tâm.",
                "en": "Surreal metaphysical golden loom realm inside ancient heirloom chest, glowing central lotus pedestal, intricate celestial web of radiant golden silk threads crisscrossing spacetime, ethereal spiritual ambience, glowing fabric weave, wide open center platform, no people on background",
                "characters": "- An (trỏ `characters/an`): Đứng ở trung tâm đài sen (gộp `hitbox-an-center`), giương cao chiếc thước thợ may 1888.\n- Linh hồn 4 thế hệ phụ nữ (Cụ Cầm, Cụ Loan, Bà Mai, Cô Phương): Tụ hội tại 4 hướng (gộp `hitbox-ancestor-north`, `south`, `east`, `west`).\n- Thực thể bóng đen Ông Lệ (trỏ `characters/ong-le`): Cuộn xoáy như cơn lốc chỉ đen bị vây hãm.",
                "objects": "- Đài sen trung tâm: Nơi An kích hoạt sức mạnh chiếc thước gỗ gia bảo.\n- Ma trận chỉ vàng liên hoàn (gộp `hitbox-ancestor-matrix`): Kết nối 5 thế hệ phá vỡ định kiến cổ hủ.",
                "overlays": [
                    ("c5-s2--tran-dia-kich-hoat.png", "Ma trận chỉ vàng bừng sáng rực rỡ khóa chặt bóng đen")
                ],
                "docs": [],
                "vfx": [
                    ("vfx-c5-s2-song-chi-vang-no.png", "Cột sóng năng lượng chỉ vàng bùng nổ cuốn phăng tàn tích định kiến"),
                    ("vfx-c5-s2-ong-le-tan-bien.png", "Bóng đen Ông Lệ tan rã hoàn toàn thành những đốm sáng lấp lánh")
                ]
            },
            "c5-s3-doi-chat-hoi-sinh": {
                "name": "Sàn Diễn Tuần Lễ Thời Trang Di Sản 2026",
                "desc": "Sàn diễn thời trang catwalk hoành tráng tại sân khấu văn hóa lớn Hà Nội năm 2026. Sàn runway bóng loáng phản chiếu ánh đèn sân khấu rực rỡ, màn hình LED khổng lồ phía sau chiếu hình ảnh tư liệu 5 thế hệ áo dài truyền thống Việt Nam. Hàng ghế khán giả và báo giới chật kín hai bên. Không vẽ người mẫu lên nền cảnh.",
                "en": "Spectacular 2026 heritage fashion week runway stage in Hanoi, glossy reflective catwalk floor, dramatic stage spotlights, massive background LED display screen broadcasting historic Vietnamese Ao Dai archives, grand fashion show venue, clear runway for walking, no people on background",
                "characters": "- An (trỏ `characters/an`): Tự tin sải bước catwalk trong bộ Việt phục Remix 2026 (gộp `hitbox-catwalk-an`).\n- Hoàng Lâm (trỏ `characters/hoang-lam`): Cúi đầu thừa nhận sai sót và xin lỗi công chúng (gộp `hitbox-lam-confession`).\n- Mèo Nếp (trỏ `characters/cat-nep`): Đeo nơ đỏ đĩnh đạc ngồi trên bục danh dự.",
                "objects": "- Sàn catwalk trung tâm: Lối đi rực rỡ của buổi trình diễn.\n- Màn hình LED tư liệu (gộp `hitbox-led-screen`): Chiếu đối chiếu chi tiết giữa áo ngũ thân nguyên bản và mẫu áo đạo nhái.",
                "overlays": [
                    ("c5-s3--man-hinh-led-chien-thang.png", "Màn hình LED hiển thị hình ảnh 5 thế hệ phụ nữ sum vầy trong tà áo dài")
                ],
                "docs": [],
                "vfx": [
                    ("vfx-c5-s3-phao-hoa-giay.png", "Pháo hoa giấy và cánh bướm lụa bay rợp trời chúc mừng nếp áo hồi sinh")
                ],
                "cg": [
                    ("cg-c5-dai-doan-vien-nam-the-he.png", "Bức tranh kết thúc trọn vẹn: Năm thế hệ phụ nữ sum vầy trong tà áo dài qua các thời kỳ, An ôm mèo Nếp mỉm cười rạng rỡ giữa Tiệm May Nếp ngập tràn ánh nắng ban mai")
                ]
            }
        }
    }
}

for ch_id, ch_data in chapters_data.items():
    ch_dir = os.path.join('assets/areas', ch_id)
    os.makedirs(ch_dir, exist_ok=True)
    
    # Process scenes
    scene_items = []
    for sc_id, sc_data in ch_data['scenes'].items():
        sc_dir = os.path.join(ch_dir, sc_id)
        os.makedirs(sc_dir, exist_ok=True)
        
        # Clean any hitbox subdirectories inside this scene
        for root, dirs, files in os.walk(sc_dir, topdown=False):
            for d in dirs:
                if 'hitbox-' in d or 'manh-ve-' in d:
                    shutil.rmtree(os.path.join(root, d))
        
        # Build file table
        files_table = []
        files_table.append((f"{sc_id}--phai.png", "area-background", f"Nền chính {sc_data['name']} (mặt phải thế giới thực), không có người, chừa lối đi rộng rãi", "⬜ chưa gen"))
        
        for ov_file, ov_desc in sc_data.get('overlays', []):
            files_table.append((ov_file, "area-overlay", ov_desc, "⬜ chưa gen"))
            
        files_table.append((f"{sc_id}--trai.png", "area-background", f"Phân cảnh mặt trái Lật Vải cõi dệt tâm thức của {sc_data['name']}", "⬜ hoãn sau 10/10"))
        
        for doc_file, doc_desc in sc_data.get('docs', []):
            files_table.append((doc_file, "doc", f"{doc_desc} (loại doc, không có chữ, UI phủ chữ)", "⬜ chưa gen"))
            
        for vfx_file, vfx_desc in sc_data.get('vfx', []):
            files_table.append((vfx_file, "vfx", f"{vfx_desc} (loại vfx)", "⬜ chưa gen"))
            
        for cg_file, cg_desc in sc_data.get('cg', []):
            files_table.append((cg_file, "cg", f"{cg_desc} (loại cg)", "⬜ chưa gen"))
            
        table_rows = "\n".join([f"| `{f[0]}` | `{f[1]}` | {f[2]} | {f[3]} |" for f in files_table])
        
        content = f"""# {sc_data['name']} ({sc_id})

- **Loại:** area-background
- **Dùng ở đâu:** Phân cảnh của {ch_data['title']}
- **Mô tả:** {sc_data['desc']}
- **Mô tả chủ thể (EN):** {sc_data['en']}.
- **Ghi chú văn hóa:** Bối cảnh phản ánh đời sống văn hóa, biến cố lịch sử và số phận của người phụ nữ Việt Nam qua từng thời kỳ.

## Ai và cái gì có trong khu vực

- **Nhân vật và NPC xuất hiện:**
{sc_data['characters']}

- **Đồ vật và điểm tương tác:**
{sc_data['objects']}

## Danh sách tệp cần có

| Tên tệp | Loại asset | Mô tả bằng lời | Trạng thái |
| :--- | :--- | :--- | :---: |
{table_rows}
"""
        with open(os.path.join(sc_dir, 'README.md'), 'w', encoding='utf-8') as f:
            f.write(content)
        scene_items.append((sc_id, sc_data['name']))
        print(f"Created README for {sc_id}")
        
    # Chapter index README
    idx_content = f"""# Danh Mục Khu Vực {ch_data['title']} ({ch_id})

- **Loại:** area-background
- **Dùng ở đâu:** Toàn bộ các phân cảnh của {ch_data['title']}
- **Mô tả:** Thư mục quản lý toàn bộ các phân cảnh khu vực, lớp phủ trạng thái, tài liệu cốt truyện, hoạt cảnh VFX và tranh cao trào CG của {ch_data['title']}.

## Danh sách các phân cảnh

| Mã phân cảnh | Tên phân cảnh | Thư mục chi tiết |
| :--- | :--- | :--- |
"""
    for sc_id, sc_name in scene_items:
        idx_content += f"| `{sc_id}` | {sc_name} | `assets/areas/{ch_id}/{sc_id}/` |\n"
        
    with open(os.path.join(ch_dir, 'README.md'), 'w', encoding='utf-8') as f:
        f.write(idx_content)

print("All chapters 1 to 5 area READMEs generated successfully!")
