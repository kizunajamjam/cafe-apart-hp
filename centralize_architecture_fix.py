import os
import re

html_files = ['index.html', 'botanical.html', 'elegant.html', 'ocean.html', 'vintage.html']
core_link = '<link rel="stylesheet" href="menu-core.css">'

for html_file in html_files:
    if not os.path.exists(html_file):
        continue
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if core_link not in content:
        # Find the main style link using regex to handle different filenames
        m = re.search(r'<link rel="stylesheet" href="style.*?\.css">', content)
        if m:
            content = content.replace(m.group(0), m.group(0) + f'\n    {core_link}')
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {html_file}")

print("Architecture unification check complete.")
