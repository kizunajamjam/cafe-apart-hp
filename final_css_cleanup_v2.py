import os
import re

css_files = ['style.css', 'style_botanical.css', 'style_elegant.css', 'style_ocean.css', 'style_vintage.css']

# Final, clean CSS block using GRID for perfect alignment
new_block = """
/* =========================================
   Intelligent Menu Layout Logic (Final)
   ========================================= */
.menu-item {
    display: grid !important;
    grid-template-rows: 1fr auto !important; /* Visual area grows, Info area stays at bottom */
    height: 100% !important;
    overflow: hidden !important;
    background-color: var(--white) !important;
}

.img-wrapper {
    grid-row: 1 !important;
    height: 100% !important;
    width: 100% !important;
    overflow: hidden !important;
}

.img-wrapper img {
    height: 100% !important;
    width: 100% !important;
    object-fit: cover !important;
}

.menu-info {
    grid-row: 2 !important;
    background-color: var(--white) !important;
    padding: 24px 20px !important;
    text-align: center !important;
    z-index: 5;
    position: relative;
}

/* Fallback Logo centered in the top grid row */
.menu-item.show-logo::before {
    content: '' !important;
    grid-row: 1 !important;
    background-image: url('assets/images/logo-minimalist.jpg') !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
    background-size: 70% !important;
    opacity: 0.5 !important;
    transition: opacity 0.3s ease !important;
    width: 100% !important;
    height: 100% !important;
    display: block !important;
    z-index: 1;
}

.menu-item.show-logo:hover::before {
    opacity: 0.8 !important;
}
"""

for filename in css_files:
    if not os.path.exists(filename):
        continue
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove previous iterations
    content = re.sub(r'/\* Fallback Logo \*/.*?\n\.menu-item:hover \.fallback-img {.*?}', '', content, flags=re.DOTALL)
    content = re.sub(r'/\* Intelligent Fallback Logo \*/.*?\n\.menu-item\.show-logo:hover::after {.*?}', '', content, flags=re.DOTALL)
    content = re.sub(r'/\* Intelligent Fallback Logo \*/.*?\n\.menu-item\.show-logo:hover::before {.*?}', '', content, flags=re.DOTALL)
    content = re.sub(r'/\* Intelligent Menu Layout Logic .*?\*\/.*?\n\.menu-item\.show-logo:hover::before {.*?}', '', content, flags=re.DOTALL)
    
    # Append the final block
    content += new_block
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Final Grid Cleanup Complete.")
