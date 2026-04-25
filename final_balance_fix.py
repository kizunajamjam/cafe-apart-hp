import os
import re

css_files = ['style.css', 'style_botanical.css', 'style_elegant.css', 'style_ocean.css', 'style_vintage.css']

# Ultra-Final, Perfectly Balanced Centered Layout
new_block = """
/* =========================================
   Intelligent Menu Layout Logic (Final Fix)
   ========================================= */
.menu-item {
    display: grid !important;
    grid-template-rows: 1fr auto !important;
    grid-template-columns: 100% !important;
    height: 100% !important;
    overflow: hidden !important;
    background-color: var(--white) !important;
    justify-items: center !important;
    align-items: stretch !important;
}

.img-wrapper {
    grid-row: 1 !important;
    grid-column: 1 !important;
    height: 100% !important;
    width: 100% !important;
    overflow: hidden !important;
    margin: 0 !important;
}

.img-wrapper img {
    height: 100% !important;
    width: 100% !important;
    object-fit: cover !important;
}

.menu-info {
    grid-row: 2 !important;
    grid-column: 1 !important;
    width: 100% !important;
    background-color: var(--white) !important;
    padding: 24px 20px !important;
    text-align: center !important;
    z-index: 5;
    position: relative;
    box-sizing: border-box !important;
}

/* Fallback Logo with perfect center (Nudged to 51.5% for visual weight balance) */
.menu-item.show-logo::before {
    content: '' !important;
    grid-row: 1 !important;
    grid-column: 1 !important;
    background-image: url('assets/images/logo-minimalist.jpg') !important;
    background-repeat: no-repeat !important;
    /* 51.5% is the 'sweet spot' that balances the cup body with the trailing steam line */
    background-position: 51.5% center !important; 
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
    
    # Cleanup previous iterations
    content = re.sub(r'/\* =========================================\n   Intelligent Menu Layout Logic \(Final.*?\n\.menu-item\.show-logo:hover::before \{.*?\}', '', content, flags=re.DOTALL)
    
    # Append the ultra-final block
    content += new_block
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Final Balance Correction Complete.")
