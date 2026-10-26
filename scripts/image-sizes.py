"""Make phone-sized copies of every pool photo.

Run from the repo root after adding photos:  python3 scripts/image-sizes.py
Writes public/images/pools/w640/<name>.jpg and w1080/<name>.jpg for any photo
wider than that size. The build step (scripts/image-manifest.mjs) then tells
the image loader which copies exist, so a photo without copies still loads.
"""
import os, glob, re
from PIL import Image, ImageOps
SRC = 'public/images/pools'
# Only photos the site references, so retired images don't get copies
code = ''
for pat in ('lib/*.ts', 'app/**/*.ts*', 'components/**/*.ts*'):
    for g in glob.glob(pat, recursive=True):
        code += open(g, encoding='utf-8').read()
USED = set(re.findall(r'/images/pools/([A-Za-z0-9._-]+)', code))
for w in (640, 1080):
    os.makedirs(f'{SRC}/w{w}', exist_ok=True)
made = 0
for f in sorted(glob.glob(f'{SRC}/*')):
    if not f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')) or os.path.basename(f) not in USED:
        continue
    name = os.path.splitext(os.path.basename(f))[0] + '.jpg'
    try:
        im = ImageOps.exif_transpose(Image.open(f)).convert('RGB')
    except Exception:
        continue
    for w in (640, 1080):
        out = f'{SRC}/w{w}/{name}'
        if im.width <= w or (os.path.exists(out) and os.path.getmtime(out) >= os.path.getmtime(f)):
            continue
        r = im.copy(); r.thumbnail((w, w * 3), Image.LANCZOS)
        r.save(out, 'JPEG', quality=78, optimize=True, progressive=True)
        made += 1
print('made', made)
