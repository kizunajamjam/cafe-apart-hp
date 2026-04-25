import os
import re

css_files = ['style.css', 'style_botanical.css', 'style_elegant.css', 'style_ocean.css', 'style_vintage.css']

# Final Fix addressing the Specificity issue for .hide class
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

/* Ensure filtering works by making .hide stronger than the .menu-item's display:grid !important */
.menu-item.hide {
    display: none !important;
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

/* Fallback Logo with perfect center */
.menu-item.show-logo::before {
    content: '' !important;
    grid-row: 1 !important;
    grid-column: 1 !important;
    background-image: url('assets/images/logo-minimalist.jpg') !important;
    background-repeat: no-repeat !important;
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
    
    # Cleanup previous Final blocks
    content = re.sub(r'/\* =========================================\n   Intelligent Menu Layout Logic \(Final.*?\n\.menu-item\.show-logo:hover::before \{.*?\}', '', content, flags=re.DOTALL)
    
    # Append the fixed block
    content += new_block
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Category Filter Fix Complete.")
