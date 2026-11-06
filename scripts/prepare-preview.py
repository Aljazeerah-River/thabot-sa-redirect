from pathlib import Path
import shutil
root = Path(__file__).resolve().parent.parent
out = root / '.preview' / 'dist'
out.mkdir(parents=True, exist_ok=True)
for name in ('index.html', 'privacy.html', 'robots.txt', 'sitemap.xml', 'assets', 'css', 'js', 'en'):
    src = root / name
    if src.is_dir():
        shutil.copytree(src, out / name, dirs_exist_ok=True)
    else:
        shutil.copy2(src, out / name)
print('Static preview prepared.')
