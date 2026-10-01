import os, glob, re, json

# 1. Audit all README files in assets/ (except assets/README.md)
all_readmes = sorted(glob.glob('assets/**/README.md', recursive=True))
print(f"Total README files to audit: {len(all_readmes)}")

violations = []
for rpath in all_readmes:
    if rpath == 'assets/README.md':
        continue
    with open(rpath, encoding='utf-8') as f:
        txt = f.read()
    
    # Check for forbidden patterns
    # Hex codes: #[0-9a-fA-F]{6}
    hexes = re.findall(r'#[0-9a-fA-F]{6}', txt)
    if hexes:
        violations.append((rpath, f"Hex codes found: {hexes}"))
        
    # px / dimensions like 64x96, 800x500
    pxs = re.findall(r'\b\d+\s*[x×]\s*\d+\b', txt)
    if pxs:
        violations.append((rpath, f"Pixel dimensions found: {pxs}"))
        
    # transparent background
    if re.search(r'transparent\s+background', txt, re.I):
        violations.append((rpath, "Phrase 'transparent background' found"))
        
    # 16-bit
    if re.search(r'16-bit', txt, re.I):
        violations.append((rpath, "Phrase '16-bit' found"))
        
    # model names
    if re.search(r'gemini', txt, re.I):
        violations.append((rpath, "Model name 'gemini' found"))
        
    # Lê Phổ attribution
    if re.search(r'lê\s+phổ', txt, re.I):
        violations.append((rpath, "Name 'Lê Phổ' found"))

if violations:
    print(f"Found {len(violations)} violations:")
    for v in violations:
        print(f"  {v[0]}: {v[1]}")
else:
    print("ZERO violations found across all subfolder READMEs!")

# 2. Extract all asset items from tables in READMEs
assets = []

def parse_readme_table(rpath, default_kind, owner_id):
    with open(rpath, encoding='utf-8') as f:
        lines = f.readlines()
    
    in_table = False
    for line in lines:
        line = line.strip()
        if not line.startswith('|'):
            continue
        if ':---' in line or 'Tên tệp' in line or 'Tên file' in line:
            in_table = True
            continue
        if in_table and line.startswith('|'):
            parts = [p.strip().strip('`') for p in line.split('|')[1:-1]]
            if len(parts) >= 3:
                filename = parts[0]
                if not filename.endswith('.png'):
                    continue
                kind = default_kind
                desc = parts[1]
                status = parts[2]
                if len(parts) >= 4:
                    if parts[1] in ['area-background', 'area-overlay', 'doc', 'vfx', 'cg', 'character-sprite', 'cat-sprite', 'portrait', 'paperdoll-layer', 'garment-layer', 'garment-thumb', 'accessory-layer', 'accessory-icon', 'item-icon', 'motif']:
                        kind = parts[1]
                        desc = parts[2]
                        status = parts[3]
                
                if '--thumb' in filename: kind = 'garment-thumb'
                elif '--icon' in filename: kind = 'accessory-icon'
                elif filename.startswith('portrait-'): kind = 'portrait'
                elif filename.startswith('vfx-'): kind = 'vfx'
                elif filename.startswith('doc-'): kind = 'doc'
                elif filename.startswith('cg-'): kind = 'cg'
                elif '--phai' in filename or '--trai' in filename: kind = 'area-background'
                elif '--' in filename and kind == 'area-background': kind = 'area-overlay'
                
                folder = os.path.dirname(rpath)
                asset_id = filename.replace('.png', '')
                out_path = f"{folder}/{filename}"
                
                assets.append({
                    "id": asset_id,
                    "kind": kind,
                    "owner": owner_id,
                    "readme_dir": folder,
                    "path": out_path,
                    "status": status if status else "⬜ chưa gen"
                })

# Parse Characters
for cr in sorted(glob.glob('assets/characters/*/README.md')):
    cid = os.path.basename(os.path.dirname(cr))
    parse_readme_table(cr, 'cat-sprite' if cid == 'cat-nep' else 'character-sprite', cid)

# Parse Paperdoll
parse_readme_table('assets/paperdoll/README.md', 'paperdoll-layer', 'paperdoll')

# Parse Garments
for gr in sorted(glob.glob('assets/garments/*/README.md')):
    gid = os.path.basename(os.path.dirname(gr))
    parse_readme_table(gr, 'garment-layer', gid)

# Parse Accessories
for ar in sorted(glob.glob('assets/accessories/*/README.md')):
    aid = os.path.basename(os.path.dirname(ar))
    parse_readme_table(ar, 'accessory-layer', aid)

# Parse Motifs
for mr in sorted(glob.glob('assets/motifs/*/README.md')):
    mid = os.path.basename(os.path.dirname(mr))
    parse_readme_table(mr, 'motif', mid)

# Parse Items
for ir in sorted(glob.glob('assets/items/*/README.md')):
    iid = os.path.basename(os.path.dirname(ir))
    parse_readme_table(ir, 'item-icon', iid)

# Parse Areas
for ar_readme in sorted(glob.glob('assets/areas/*/*/README.md')):
    area_id = os.path.basename(os.path.dirname(ar_readme))
    parse_readme_table(ar_readme, 'area-background', area_id)

print(f"Total extracted assets: {len(assets)}")

# 3. Write data/asset-manifest.json
manifest_data = [
    {
        "id": a["id"],
        "kind": a["kind"],
        "owner": a["owner"],
        "path": a["path"],
        "status": a["status"]
    }
    for a in assets
]

os.makedirs('data', exist_ok=True)
with open('data/asset-manifest.json', 'w', encoding='utf-8') as f:
    json.dump(manifest_data, f, ensure_ascii=False, indent=2)

# 4. Write assets/index.md
index_lines = [
    "# Mục Lục Toàn Bộ Tài Nguyên Đồ Họa Trò Chơi (assets/index.md)\n",
    "Tài liệu này là danh mục đối chiếu một-một toàn bộ các tệp tài nguyên đồ họa trong gameplay của **Tiệm May Nếp**, liên kết trực tiếp với dữ liệu `data/asset-manifest.json`.\n\n",
    "| ID | Loại | Thuộc Về | Thư Mục README | Tên File Xuất | Trạng Thái |\n",
    "| :--- | :--- | :--- | :--- | :--- | :---: |\n"
]

for a in assets:
    index_lines.append(f"| `{a['id']}` | `{a['kind']}` | `{a['owner']}` | `{a['readme_dir']}` | `{a['path']}` | {a['status']} |\n")

with open('assets/index.md', 'w', encoding='utf-8') as f:
    f.writelines(index_lines)

# 5. Report statistics
kind_counts = {}
for a in assets:
    k = a["kind"]
    kind_counts[k] = kind_counts.get(k, 0) + 1

print("\n=== THỐNG KÊ TỔNG SỐ DÒNG THEO LOẠI ASSET ===")
for k, count in sorted(kind_counts.items()):
    print(f"- `{k}`: {count} tệp")
print(f"\nTổng cộng: {len(assets)} tệp")
