import os

# Read the clean index.html
with open('index.html', 'r', encoding='utf-8') as f:
    template = f.read()

themes = {
    'botanical.html': 'style_botanical.css',
    'vintage.html': 'style_vintage.css',
    'ocean.html': 'style_ocean.css',
    'elegant.html': 'style_elegant.css'
}

for filename, css_file in themes.items():
    # Replace the stylesheet link
    content = template.replace('<link rel="stylesheet" href="style.css">', f'<link rel="stylesheet" href="{css_file}">')
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Theme files regenerated successfully.")
