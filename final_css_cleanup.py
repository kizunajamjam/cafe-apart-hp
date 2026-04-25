import os
import re

css_files = ['style.css', 'style_botanical.css', 'style_elegant.css', 'style_ocean.css', 'style_vintage.css']

# Final, clean CSS block
new_block = """
/* =========================================
   Intelligent Menu Layout Logic
   ========================================= */
.menu-item {
    display: flex !important;
    flex-direction: column !important;
    height: 100% !important;
    justify-content: flex-start !important;
    align-items: stretch !important;
}

.menu-info {
    flex-grow: 0 !important;
    flex-shrink: 0 !important;
    margin-top: auto !important; /* Pushes text to the bottom */
    background-color: var(--white) !important;
    position: relative;
    z-index: 5;
}

.img-wrapper {
    flex-shrink: 0 !important;
    z-index: 5;
}

/* Fallback Logo as a pseudo-element at the top */
.menu-item.show-logo::before {
    content: '';
    flex-grow: 1;
    background-image: url('assets/images/logo-minimalist.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 70%;
    opacity: 0.4;
    margin: 30px 40px 10px 40px;
    transition: opacity 0.3s ease;
    z-index: 1;
}

.menu-item.show-logo:hover::before {
    opacity: 0.7;
}
"""

for filename in css_files:
    if not os.path.exists(filename):
        continue
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove all previous iterations of our custom blocks to avoid duplication
    content = re.sub(r'/\* Fallback Logo \*/.*?\n\.menu-item:hover \.fallback-img {.*?}', '', content, flags=re.DOTALL)
    content = re.sub(r'/\* Intelligent Fallback Logo \*/.*?\n\.menu-item\.show-logo:hover::after {.*?}', '', content, flags=re.DOTALL)
    content = re.sub(r'/\* Intelligent Fallback Logo \*/.*?\n\.menu-item\.show-logo:hover::before {.*?}', '', content, flags=re.DOTALL)
    # Generic cleanup for any remaining pseudo-element rules I might have left
    content = re.sub(r'.menu-item.show-logo::(before|after) \{.*?\}', '', content, flags=re.DOTALL)
    content = re.sub(r'.menu-item:not\(:has\(\.img-wrapper\)\)::after \{.*?\}', '', content, flags=re.DOTALL)
    
    # Append the final block
    content += new_block
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Final CSS Cleanup and Update Complete.")
