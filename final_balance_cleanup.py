import os
import re

css_files = ['style.css', 'style_botanical.css', 'style_elegant.css', 'style_ocean.css', 'style_vintage.css']

# Final, balanced Grid-based layout
new_block = """
/* =========================================
   Intelligent Menu Layout Logic (Final)
   ========================================= */
.menu-item {
    display: grid !important;
    grid-template-rows: 1fr auto !important;
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
    margin-top: 0 !important; /* Managed by grid now */
}

/* Fallback Logo with horizontal stabilization (nudged 54% to correct asymmetrical source image) */
.menu-item.show-logo::before {
    content: '' !important;
    grid-row: 1 !important;
    background-image: url('assets/images/logo-minimalist.jpg') !important;
    background-repeat: no-repeat !important;
    background-position: 54% center !important; /* Nudged slightly right to balance the cup position */
    background-size: 75% !important; /* Slightly larger as requested earlier */
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
    
    # Aggressive cleanup of ALL previous iterations
    content = re.sub(r'/\* Fallback Logo \*/.*?\n\.menu-item:hover \.fallback-img \{.*?\}', '', content, flags=re.DOTALL)
    content = re.sub(r'/\* Intelligent Fallback Logo \*/.*?\n\.menu-item\.show-logo:hover::(after|before) \{.*?\}', '', content, flags=re.DOTALL)
    content = re.sub(r'/\* Intelligent Menu Layout Logic .*?\*\/.*?\n\.menu-item\.show-logo:hover::before \{.*?\}', '', content, flags=re.DOTALL)
    content = re.sub(r'\.menu-item\.show-logo::(before|after) \{.*?\}', '', content, flags=re.DOTALL)
    content = re.sub(r'\.menu-item:not\(:has\(\.img-wrapper\)\)::after \{.*?\}', '', content, flags=re.DOTALL)
    
    # Remove any existing grid logic block if it was already there (to avoid doubling up on the last run)
    content = re.sub(r'/\* =========================================\n   Intelligent Menu Layout Logic \(Final\)\n   ========================================= \*/.*?\n\.menu-item\.show-logo:hover::before \{.*?\}', '', content, flags=re.DOTALL)
    
    # Append the final block
    content += new_block
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Final Horizontal Balancing Complete.")
