import os
import re

html_files = ['index.html', 'index_botanical.html', 'index_elegant.html', 'index_ocean.html', 'index_vintage.html']
css_files = ['style.css', 'style_botanical.css', 'style_elegant.css', 'style_ocean.css', 'style_vintage.css']

# 1. Update HTML files to link to menu-core.css
core_link = '<link rel="stylesheet" href="menu-core.css">'

for html_file in html_files:
    if not os.path.exists(html_file):
        continue
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if core_link not in content:
        # Insert after the main stylesheet
        # Find any theme stylesheet link
        m = re.search(r'<link rel="stylesheet" href="style.*?\.css">', content)
        if m:
            content = content.replace(m.group(0), m.group(0) + f'\n    {core_link}')
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {html_file}")

# 2. Clean up CSS files (remove our injected logic which is now in core)
for css_file in css_files:
    if not os.path.exists(css_file):
        continue
    with open(css_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove the Intelligent Layout blocks
    cleaned_content = re.sub(r'/\* =========================================\n   Intelligent Menu Layout Logic \(Final.*?\n\.menu-item\.show-logo:hover::before \{.*?\}', '', content, flags=re.DOTALL)
    
    # Also remove any older versions if they used different comments
    cleaned_content = re.sub(r'/\* Fallback Logo with perfect center.*?\n\.menu-item\.show-logo:hover::before \{.*?\}', '', cleaned_content, flags=re.DOTALL)

    if cleaned_content != content:
        with open(css_file, 'w', encoding='utf-8') as f:
            f.write(cleaned_content)
        print(f"Cleaned up {css_file}")

print("Centralization and Cleanup Complete.")
