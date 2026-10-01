import os, glob, re, shutil

# 1. Clean legacy folders in assets/characters
for legacy in ['grandmother', 'protagonist']:
    leg_path = os.path.join('assets/characters', legacy)
    if os.path.exists(leg_path):
        shutil.rmtree(leg_path)

# 2. Extract scene appearances from setup.md
setup_files = sorted(glob.glob('assets/docs/07-game/*/setup.md'))
scene_poses = {} # char_id -> list of {scene_id, pose, desc}

for sf in setup_files:
    ch = os.path.basename(os.path.dirname(sf))
    with open(sf, encoding='utf-8') as f:
        txt = f.read()
    
    # Split by scenes
    scenes = re.split(r'###\s+Phân cảnh\s+\d+:\s*', txt)
    for sc in scenes[1:]:
        sc_id_match = re.search(r'`(c\d-s\d[^`]*)`', sc)
        if not sc_id_match:
            continue
        sc_id = sc_id_match.group(1)
        
        # Find "Nhân vật xuất hiện"
        char_section_match = re.search(r'-\s+\*\*Nhân vật xuất hiện:\*\*(.*?)(?=\n-\s+\*\*|\Z)', sc, re.DOTALL)
        if not char_section_match:
            continue
        char_text = char_section_match.group(1)
        
        # Look for character mentions
        # Format usually: - An: ... or - Mèo Nếp: ... or - Cụ Cầm: ...
        lines = char_text.strip().splitlines()
        for l in lines:
            l = l.strip()
            if not l.startswith('-'):
                continue
            char_line = l.lstrip('-* ').strip()
            colon_idx = char_line.find(':')
            if colon_idx != -1:
                cname = char_line[:colon_idx].strip()
                cdesc = char_line[colon_idx+1:].strip()
            else:
                cname = char_line
                cdesc = ""
            
            # Map cname to id
            cid = None
            cn_lower = cname.lower()
            if 'an' in cn_lower: cid = 'an'
            elif 'mèo nếp' in cn_lower or 'nếp' in cn_lower: cid = 'cat-nep'
            elif 'ông lệ' in cn_lower: cid = 'ong-le'
            elif 'cầm' in cn_lower: cid = 'cu-cam'
            elif 'thân' in cn_lower or 'trưởng tộc' in cn_lower: cid = 'truong-toc-bui'
            elif 'bà lớn' in cn_lower: cid = 'ba-lon'
            elif 'loan' in cn_lower: cid = 'cu-loan'
            elif 'nghị' in cn_lower: cid = 'ca-nghi'
            elif 'mai' in cn_lower: cid = 'ba-mai'
            elif 'càn' in cn_lower: cid = 'thay-ba-can'
            elif 'vinh' in cn_lower: cid = 'vinh'
            elif 'phương' in cn_lower: cid = 'me-phuong'
            elif 'sửu' in cn_lower: cid = 'chu-suu'
            elif 'lâm' in cn_lower: cid = 'hoang-lam'
            
            if cid:
                if cid not in scene_poses: scene_poses[cid] = []
                scene_poses[cid].append({
                    'scene_id': sc_id,
                    'desc': cdesc
                })

print("Found scene poses for characters:", list(scene_poses.keys()))

# 3. Read profile.md for all 14 characters
char_dirs = sorted(os.listdir('assets/docs/07-game/characters'))
char_dirs = [c for c in char_dirs if os.path.isdir(os.path.join('assets/docs/07-game/characters', c))]

for cid in char_dirs:
    pfile = os.path.join('assets/docs/07-game/characters', cid, 'profile.md')
    if not os.path.exists(pfile):
        continue
    with open(pfile, encoding='utf-8') as f:
        ptxt = f.read()
    
    # Extract name, bio, costumes, expressions
    name_m = re.search(r'-\s+\*\*Họ và tên đầy đủ:\*\*\s*(.*)', ptxt)
    fullname = name_m.group(1).strip() if name_m else cid
    
    # Costume section
    costume_m = re.search(r'##\s+2\.\s+Trang phục theo thời kỳ(.*?)(?=##|\Z)', ptxt, re.DOTALL)
    costumes = costume_m.group(1).strip() if costume_m else "Trang phục truyền thống phù hợp bối cảnh lịch sử."
    
    # Expressions section
    expr_m = re.search(r'-\s+\*\*Các trạng thái biểu cảm cần vẽ:\*\*(.*?)(?=##|\Z)', ptxt, re.DOTALL)
    expr_text = expr_m.group(1).strip() if expr_m else ""
    expressions = []
    for eline in expr_text.splitlines():
        eline = eline.strip()
        m = re.match(r'\d+\.\s*`([^`]+)`:\s*(.*)', eline)
        if m:
            expressions.append((m.group(1), m.group(2)))
        elif eline.startswith('-') and '`' in eline:
            m = re.match(r'-\s*`([^`]+)`:\s*(.*)', eline)
            if m:
                expressions.append((m.group(1), m.group(2)))

    # If no expressions extracted, default
    if not expressions:
        expressions = [
            (f"{cid}_neutral", "Biểu cảm bình tĩnh, ánh mắt tự nhiên"),
            (f"{cid}_emotional", "Biểu cảm xúc động hoặc căng thẳng"),
            (f"{cid}_determined", "Biểu cảm cương nghị, đối chất")
        ]

    # Sprite kind
    sprite_kind = "cat-sprite" if cid == "cat-nep" else "character-sprite"

    # Build files table
    files_table = []
    
    # Poses from scenes
    poses = scene_poses.get(cid, [])
    pose_files = []
    if poses:
        for idx, p in enumerate(poses):
            file_id = f"scene-{p['scene_id']}"
            pdesc = p['desc'] if p['desc'] else "Xuất hiện tại phân cảnh"
            pose_files.append((f"{file_id}.png", sprite_kind, f"Tư thế {pdesc} (Dùng tại `{p['scene_id']}`)", "⬜ chưa gen"))
    else:
        pose_files.append((f"scene-idle.png", sprite_kind, "Dáng đứng cơ bản thở nhẹ nhàng, mắt nhìn tự nhiên", "⬜ chưa gen"))

    # Cat-nep hints
    if cid == "cat-nep":
        pose_files.append(("cat-suggest-clue.png", "cat-sprite", "Mèo vẫy đuôi, dùng chân trước chỉ về phía manh mối ẩn để gợi ý", "⬜ chưa gen"))
        pose_files.append(("cat-alert-danger.png", "cat-sprite", "Mèo xù lông, gầm gừ cảnh báo khi Ông Lệ hoặc nguy hiểm cận kề", "⬜ chưa gen"))
        pose_files.append(("cat-walk.png", "cat-sprite", "Dáng mèo bước đi thong thả lượn quanh chân người chơi", "⬜ chưa gen"))

    # Left-side flip stance
    pose_files.append((f"scene-mat-trai.png", sprite_kind, "Tư thế trong cõi dệt Lật Vải (hoãn sau 10/10)", "⬜ chưa gen"))

    # Expressions (portraits)
    portrait_files = []
    if cid != "cat-nep":
        for eid, edesc in expressions:
            clean_eid = eid.replace(f"{cid}_", "").replace(f"{cid}-", "")
            pid = f"portrait-{clean_eid}.png"
            portrait_files.append((pid, "portrait", f"Chân dung {edesc}", "⬜ chưa gen"))
        # Add script emotion if not already
        if not any('smile' in p[0] for p in portrait_files):
            portrait_files.append((f"portrait-smile.png", "portrait", "Chân dung mỉm cười nhẹ nhõm khi hóa giải khúc mắc (từ script)", "⬜ chưa gen"))

    all_files = pose_files + portrait_files

    # Build markdown table
    table_rows = "\n".join([f"| `{f[0]}` | {f[2]} | {f[3]} |" for f in all_files])

    # English prompt description
    prompt_m = re.search(r'##\s+4\.\s+Prompt tiếng Anh.*?\n```text\n(.*?)\n```', ptxt, re.DOTALL)
    en_desc = prompt_m.group(1).strip() if prompt_m else f"Authentic historical Vietnamese character sprite of {fullname}, traditional ethnic attire, expressive facial features"

    # Clean technical words from prompt if any
    en_desc = en_desc.replace("64x96 pixels", "").replace("pixel art character sprite sheet", "Vietnamese pixel art character")
    en_desc = en_desc.replace("isolated on transparent background", "").replace("16-bit retro aesthetic,", "").strip()

    content = f"""# {fullname} ({cid})

- **Loại:** {sprite_kind}
- **Dùng ở đâu:** Các phân cảnh cốt truyện, đối thoại và bảng manh mối
- **Mô tả:** Nhân vật trong mạch truyện Tiệm May Nếp. {costumes}
- **Mô tả chủ thể (EN):** {en_desc}.
- **Ghi chú tạo hình:** Khi tạo ảnh chân dung (portrait), bắt buộc sử dụng ảnh sprite đã chốt làm tham chiếu hình ảnh để giữ thống nhất đặc điểm khuôn mặt, kiểu tóc và màu sắc trang phục giữa các góc nhìn. Mọi nhân vật xuất hiện ở mặt trái tấm vải đều thuộc diện hoãn sau 10/10 theo quyết định dự án.

## Danh sách tệp cần có

| Tên tệp | Mô tả bằng lời | Trạng thái |
| :--- | :--- | :---: |
{table_rows}
"""
    char_out_dir = os.path.join('assets/characters', cid)
    os.makedirs(char_out_dir, exist_ok=True)
    with open(os.path.join(char_out_dir, 'README.md'), 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Created README for {cid} with {len(all_files)} files")

print("All 14 characters completed!")
